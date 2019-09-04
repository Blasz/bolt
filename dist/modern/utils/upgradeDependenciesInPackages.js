'use strict';

exports.__esModule = true;

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

var _updatePackageVersions = require('../functions/updatePackageVersions');

var _updatePackageVersions2 = _interopRequireDefault(_updatePackageVersions);

var _updateWorkspaceDependencies = require('../functions/updateWorkspaceDependencies');

var _updateWorkspaceDependencies2 = _interopRequireDefault(
  _updateWorkspaceDependencies
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

exports.default = async function upgradeDependenciesInPackage(
  project,
  pkg,
  dependencies,
  flags
) {
  let packages = await project.getPackages();
  let pkgDependencies = pkg.getAllDependencies();
  let { graph: depGraph } = await project.getDependencyGraph(packages);

  let externalDeps = dependencies.filter(dep => !depGraph.has(dep.name));
  let internalDeps = dependencies.filter(dep => depGraph.has(dep.name));
  let projectDependencies = project.pkg.getAllDependencies();

  if (project.pkg.isSamePackage(pkg)) {
    if (internalDeps.length > 0) {
      let internalDepNames = internalDeps.map(dep => dep.name);
      internalDeps.forEach(dep => {
        logger.error(
          messages.cannotUpgradeWorkspaceDependencyInProject(dep.name)
        );
      });
      throw new _errors.BoltError(messages.noNeedToSymlinkInternalDependency());
    }
  }

  await yarn.upgrade(project.pkg, externalDeps, flags);

  // we reinitialise the project config because it may be modified externally by yarn
  let newProject = await _Project2.default.init(project.pkg.dir);
  // get the new versions of everything from the project config
  let newProjectDependencies = newProject.pkg.getAllDependencies();
  let depsToUpgrade = {};

  newProjectDependencies.forEach((value, key) => {
    depsToUpgrade[key] = value;
  });

  return await (0, _updateWorkspaceDependencies2.default)(depsToUpgrade, {
    cwd: project.pkg.dir
  });
};
