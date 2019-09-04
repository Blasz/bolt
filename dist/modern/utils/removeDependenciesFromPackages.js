'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _yarn = require('./yarn');

var yarn = _interopRequireWildcard(_yarn);

var _fs = require('./fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _errors = require('./errors');

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const UNINSTALL_SCRIPTS = ['preuninstall', 'uninstall', 'postuninstall'];

function filterDependenciesForPackage(pkg, dependencies) {
  let allDependencies = pkg.getAllDependencies();
  return dependencies.filter(depName => {
    return allDependencies.has(depName);
  });
}

async function removeDependenciesFromPackage(project, pkg, dependencies) {
  let matchedDependencies = filterDependenciesForPackage(pkg, dependencies);
  if (!matchedDependencies.length) {
    return false;
  }

  let isProjectPackage = pkg.isSamePackage(project.pkg);
  if (isProjectPackage) {
    await yarn.remove(matchedDependencies, pkg.dir);
    return true;
  }

  for (let depName of matchedDependencies) {
    let filePath = path.join(pkg.nodeModules, depName);
    let depTypes = pkg.getDependencyTypes(depName);

    // Delete directory
    await fs.rimraf(filePath);

    // Remove from package.json
    for (let depType of depTypes) {
      await pkg.setDependencyVersionRange(depName, depType, null);
    }
  }

  // TODO: Remove node_modules/.bin links

  return true;
}

exports.default = async function removeDependenciesFromPackages(
  project,
  packages,
  targetPackages,
  dependencies,
  spawnOpts
) {
  // Is the set of packages that we're modifying include the project package? ...
  let includesProjectPackage = false;

  // Which packages are we working with? ...
  let includedPackagesDirs = {};

  // ...let's find out...
  for (let pkg of targetPackages) {
    if (pkg.isSamePackage(project.pkg)) {
      includesProjectPackage = true;
    } else {
      includedPackagesDirs[pkg.dir] = true;
    }
  }

  // We're going to build up a list of the invalid specified dependencies to
  // remove
  let invalid = [];

  for (let depName of dependencies) {
    // Get all of the dependents for this dependency
    let dependents = targetPackages.filter(pkg => {
      return pkg.getAllDependencies().has(depName);
    });

    // If there are no dependents for this dependency, then we don't need
    // to do anything for it
    if (!dependents.length) {
      invalid.push(depName);
      logger.error(messages.dependencyNotInstalled(depName));
      continue;
    }

    // If we're not removing anything from the project then we don't need to do
    // anymore checks
    if (!includesProjectPackage) {
      continue;
    }

    // Build up the dependents by their directory so we can test faster
    let dependentsByDir = new _map2.default();
    for (let dependent of dependents) {
      dependentsByDir.set(dependent.dir, dependent);
    }

    // Check to see if any workspaces (other than our dependents) depend on
    // this dependency.
    let excludedDependentPackages = packages.filter(pkg => {
      return (
        !dependentsByDir.has(pkg.dir) && pkg.getAllDependencies().has(depName)
      );
    });

    // We can't remove dependencies from our project package that aren't also
    // being removed from all of the dependent workspaces.
    if (excludedDependentPackages.length) {
      invalid.push(depName);
      logger.error(
        messages.cannotRemoveDependencyDependendOnByWorkspaces(
          depName,
          excludedDependentPackages
        )
      );
      logger.info(messages.runWorkspacesRemoveDependency(depName));
      continue;
    }
  }

  // If there are any invalid dependencies specified, then error
  if (invalid.length) {
    throw new _errors.BoltError(messages.couldntRemoveDependencies(invalid));
  }

  // Get an array of workspaces that we're removing from.
  let includedPackages = packages.filter(pkg => {
    return includedPackagesDirs[pkg.dir];
  });

  // Run the uninstall scripts for each workspace
  await _promise2.default.all(
    UNINSTALL_SCRIPTS.map(async script => {
      await project.runPackageTasks(
        includedPackages,
        spawnOpts,
        async pkg => await yarn.runIfExists(pkg, script)
      );
    })
  );

  // Remove from the project package first, so that it runs the hooks correctly
  if (includesProjectPackage) {
    await removeDependenciesFromPackage(project, project.pkg, dependencies);
  }

  // Remove from every included workspace
  for (let pkg of includedPackages) {
    await removeDependenciesFromPackage(project, pkg, dependencies);
  }

  logger.success(messages.removedDependencies());
};
