'use strict';

exports.__esModule = true;

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _yarn = require('./yarn');

var yarn = _interopRequireWildcard(_yarn);

var _symlinkPackageDependencies = require('./symlinkPackageDependencies');

var _symlinkPackageDependencies2 = _interopRequireDefault(
  _symlinkPackageDependencies
);

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

exports.default = async function addDependenciesToPackage(
  project,
  pkg,
  dependencies,
  type = 'dependencies'
) {
  let packages = await project.getPackages();
  let projectDependencies = project.pkg.getAllDependencies();
  let pkgDependencies = pkg.getAllDependencies();
  let { graph: depGraph } = await project.getDependencyGraph(packages);

  let dependencyNames = dependencies.map(dep => dep.name);
  let externalDeps = dependencies.filter(dep => !depGraph.has(dep.name));
  let internalDeps = dependencies.filter(dep => depGraph.has(dep.name));

  let externalDepsToInstallForProject = externalDeps.filter(
    dep => !projectDependencies.has(dep.name)
  );
  if (externalDepsToInstallForProject.length !== 0) {
    await yarn.add(project.pkg, externalDepsToInstallForProject, type);
    // we reinitialise the project config because it will be modified externally by yarn
    project = await _Project2.default.init(project.pkg.dir);
  }
  if (pkg.isSamePackage(project.pkg)) {
    if (internalDeps.length > 0) {
      throw new _errors.BoltError(
        messages.cannotInstallWorkspaceInProject(internalDeps[0].name)
      );
    }
    return true;
  }

  let installedVersions = {};

  for (let dep of externalDeps) {
    let installed = project.pkg.getDependencyVersionRange(dep.name);
    // If we aren't specified a version, use the same one from the project
    let depVersion = dep.version || installed;
    if (depVersion !== installed) {
      throw new _errors.BoltError(
        messages.depMustMatchProject(
          pkg.config.getName(),
          dep.name,
          installed,
          depVersion
        )
      );
    }
    installedVersions[dep.name] = depVersion;
  }

  for (let dep of internalDeps) {
    let dependencyPkg = (depGraph.get(dep.name) || {}).pkg;
    let internalVersion = dependencyPkg.config.getVersion();
    // If no version is requested, default to caret at the current version
    let requestedVersion = dep.version || `^${internalVersion}`;
    if (!_semver2.default.satisfies(internalVersion, requestedVersion)) {
      throw new _errors.BoltError(
        messages.packageMustDependOnCurrentVersion(
          pkg.config.getName(),
          dep.name,
          internalVersion,
          requestedVersion
        )
      );
    }
    installedVersions[dep.name] = requestedVersion;
  }

  for (let [depName, depVersion] of (0, _entries2.default)(installedVersions)) {
    await pkg.setDependencyVersionRange(depName, type, String(depVersion));
  }

  await (0, _symlinkPackageDependencies2.default)(
    project,
    pkg,
    dependencyNames
  );
};
