'use strict';

exports.__esModule = true;

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _constants = require('../constants');

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

exports.default = async function validateProject(project) {
  let packages = await project.getPackages();
  let projectDependencies = project.pkg.getAllDependencies();
  let projectConfig = project.pkg.config;
  let { graph: depGraph } = await project.getDependencyGraph(packages);

  let projectIsValid = true;

  // If the project has an engines.bolt field we must respect it
  let boltConfigVersion = projectConfig.getBoltConfigVersion();
  if (boltConfigVersion) {
    if (
      !_semver2.default.satisfies(_constants.BOLT_VERSION, boltConfigVersion)
    ) {
      logger.error(
        messages.invalidBoltVersion(_constants.BOLT_VERSION, boltConfigVersion)
      );
      projectIsValid = false;
    }
  }

  // Workspaces always have a name and a version in their configs
  for (let pkg of packages) {
    try {
      pkg.getName();
    } catch (err) {
      logger.error(err.message);
      projectIsValid = false;
    }

    try {
      pkg.getVersion();
    } catch (err) {
      logger.error(err.message);
      projectIsValid = false;
    }
  }

  // Workspaces should never appear as dependencies in the Project config
  for (let pkg of packages) {
    let depName = pkg.getName();
    if (projectDependencies.has(depName)) {
      logger.error(messages.projectCannotDependOnWorkspace(depName));
      projectIsValid = false;
    }
  }

  /**
   *     <More Project checks here>
   */

  return projectIsValid;
};
