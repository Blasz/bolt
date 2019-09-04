'use strict';

exports.__esModule = true;
exports.toWorkspaceUpgradeOptions = toWorkspaceUpgradeOptions;
exports.workspaceUpgrade = workspaceUpgrade;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _messages = require('../../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('../../utils/errors');

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

function toWorkspaceUpgradeOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd')
  };
}
async function workspaceUpgrade(opts) {
  throw new _errors.BoltError(messages.errorWorkspaceUpgrade());
}
