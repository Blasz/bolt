'use strict';

exports.__esModule = true;
exports.toInfoOptions = toInfoOptions;
exports.info = info;

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

function toInfoOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args,
    flags
  };
}
async function info(opts) {
  let cwd = opts.cwd || process.cwd();
  let spawnArgs = Array.prototype.concat([], opts.args);
  if (opts.flags && opts.flags.json) {
    spawnArgs.push('--json');
  }
  try {
    await yarn.info(cwd, spawnArgs);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
