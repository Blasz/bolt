'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.lock = lock;
exports.unlock = unlock;

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _npm = require('./npm');

var npm = _interopRequireWildcard(_npm);

var _promises = require('./promises');

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

const LOCK_DIST_TAG = 'bolt-lock';

async function lock(packages) {
  let locks = [];
  let promises = [];

  logger.info(messages.lockingAllPackages());

  for (let pkg of packages) {
    let name = pkg.config.getName();
    let version = pkg.config.getVersion();
    let promise = npm.infoAllow404(name).then(response => {
      if (response.published) {
        let pkgInfo = response.pkgInfo || {};
        if (pkgInfo['dist-tags'][LOCK_DIST_TAG]) {
          throw new _errors.BoltError(
            `Unable to get lock as a lock already exists for '${name}'`
          );
        }
        return npm.addTag(name, pkgInfo.version, LOCK_DIST_TAG).then(() => {
          locks.push(pkg);
        });
      }
    });
    promises.push(promise);
  }

  try {
    await (0, _promises.settleAll)(promises);
  } catch (err) {
    logger.error(err.message);
    // Note: We only unlock the locks *we* just locked, as the other ones are currently being used
    await _unlock(locks);
    throw new _errors.BoltError(
      'Unable to lock all packages, someone else may be releasing'
    );
  }
}

async function _unlock(packages) {
  let promises = [];

  for (let pkg of packages) {
    promises.push(npm.removeTag(pkg.config.getName(), LOCK_DIST_TAG));
  }

  await _promise2.default.all(promises);
}

async function unlock(packages) {
  let promises = [];

  for (let pkg of packages) {
    let name = pkg.config.getName();
    let promise = npm.infoAllow404(name).then(response => {
      if (response.published) {
        let pkgInfo = response.pkgInfo || {};
        if (!pkgInfo['dist-tags'][LOCK_DIST_TAG]) {
          return;
        }
        return npm.removeTag(pkg.config.getName(), LOCK_DIST_TAG);
      }
    });

    promises.push(promise);
  }

  await _promise2.default.all(promises);
}
