'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.toWorkspacesUpgradeOptions = toWorkspacesUpgradeOptions;
exports.workspacesUpgrade = workspacesUpgrade;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _messages = require('../../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('../../utils/errors');

var _upgrade = require('../upgrade');

var Upgrade = _interopRequireWildcard(_upgrade);

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

function toWorkspacesUpgradeOptions(args, flags) {
  return {
    deps: args,
    filterOpts: options.toFilterOpts(flags),
    flags
  };
}
async function workspacesUpgrade(opts) {
  let cwd = opts.cwd || process.cwd();
  let filterOpts = (0, _keys2.default)(opts.filterOpts);

  if (filterOpts.length) {
    throw new _errors.BoltError(messages.errorWorkspacesUpgrade(filterOpts));
  }

  // Calling upgrade on project
  await Upgrade.upgrade(Upgrade.toUpgradeOptions(opts.deps, opts.flags));
}
