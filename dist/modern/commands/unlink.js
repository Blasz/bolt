'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.toUnlinkOptions = toUnlinkOptions;
exports.unlink = unlink;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../utils/errors');

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

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

function getPackageMap(packages) {
  let packageMap = new _map2.default();

  for (let pkg of packages) {
    packageMap.set(pkg.getName(), pkg);
  }

  return packageMap;
}

function toUnlinkOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    packagesToUnlink: args
  };
}

async function unlink(opts) {
  let cwd = opts.cwd || process.cwd();
  let packagesToUnlink = opts.packagesToUnlink;
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let packageMap = getPackageMap(packages);

  // guard to check if there are packages to unlink
  if (packagesToUnlink && packagesToUnlink.length) {
    await _promise2.default.all(
      packagesToUnlink.map(async packageToUnlink => {
        if (packageMap.has(packageToUnlink)) {
          logger.warn(messages.unlinkInternalPackage(packageToUnlink));
        } else {
          await yarn.cliCommand(cwd, 'unlink', [packageToUnlink]);
        }
      })
    );
  } else {
    throw new _errors.BoltError(
      'Please specify package to unlink. Try: bolt w [packageToUnlink] unlink'
    );
  }
}
