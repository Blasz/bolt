'use strict';

exports.__esModule = true;
exports.toWhyOptions = toWhyOptions;
exports.why = why;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../utils/errors');

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

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

function toWhyOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args
  };
}
async function why(opts) {
  let cwd = opts.cwd || process.cwd();
  try {
    await yarn.cliCommand(cwd, 'why', opts.args);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
