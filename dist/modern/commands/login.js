'use strict';

exports.__esModule = true;
exports.toLoginOptions = toLoginOptions;
exports.login = login;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _npm = require('../utils/npm');

var npm = _interopRequireWildcard(_npm);

var _errors = require('../utils/errors');

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

function toLoginOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd')
  };
}
async function login(opts) {
  let cwd = opts.cwd || process.cwd();
  try {
    await npm.login(cwd);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
