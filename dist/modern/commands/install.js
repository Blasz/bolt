'use strict';

exports.__esModule = true;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

exports.toInstallOptions = toInstallOptions;
exports.install = install;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _processes = require('../utils/processes');

var processes = _interopRequireWildcard(_processes);

var _fs = require('../utils/fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _validateProject = require('../utils/validateProject');

var _validateProject2 = _interopRequireDefault(_validateProject);

var _symlinkPackageDependencies = require('../utils/symlinkPackageDependencies');

var _symlinkPackageDependencies2 = _interopRequireDefault(
  _symlinkPackageDependencies
);

var _symlinkPackagesBinariesToProject = require('../utils/symlinkPackagesBinariesToProject');

var _symlinkPackagesBinariesToProject2 = _interopRequireDefault(
  _symlinkPackagesBinariesToProject
);

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _pathIsInside = require('path-is-inside');

var _pathIsInside2 = _interopRequireDefault(_pathIsInside);

var _errors = require('../utils/errors');

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

function toInstallOptions(args, flags) {
  let lockfileMode = 'default';
  // in order of strictness:
  if (options.boolean(flags.frozenLockfile, 'frozen-lockfile')) {
    lockfileMode = 'frozen';
  } else if (options.boolean(flags.pureLockfile, 'pure-lockfile')) {
    lockfileMode = 'pure';
  }
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    lockfileMode
  };
}

async function install(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();

  logger.info(messages.validatingProject(), { emoji: '🔎', prefix: false });

  let projectIsValid = await (0, _validateProject2.default)(project);
  if (!projectIsValid) {
    throw new _errors.BoltError(messages.unableToInstall());
  }

  logger.info(messages.installingProjectDependencies(), {
    emoji: '📦',
    prefix: false
  });

  await yarn.install(project.pkg.dir, opts.lockfileMode);

  logger.info(messages.linkingWorkspaceDependencies(), {
    emoji: '🔗',
    prefix: false
  });

  for (let pkg of packages) {
    let dependencies = (0, _from2.default)(pkg.getAllDependencies().keys());
    await (0, _symlinkPackageDependencies2.default)(project, pkg, dependencies);
  }

  logger.info(messages.linkingWorkspaceBinaries(), {
    emoji: '🚀',
    prefix: false
  });

  await (0, _symlinkPackagesBinariesToProject2.default)(project);

  logger.success(messages.installedAndLinkedWorkspaces(), { emoji: '💥' });
}
