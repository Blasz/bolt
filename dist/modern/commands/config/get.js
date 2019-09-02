'use strict';

exports.__esModule = true;
exports.toConfigGetOptions = toConfigGetOptions;
exports.configGet = configGet;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../../utils/errors');

var _yarn = require('../../utils/yarn');

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

function toConfigGetOptions(args, flags) {
  return { cwd: options.string(flags.cwd, 'cwd'), args };
}
async function configGet(opts) {
  let cwd = opts.cwd || process.cwd();
  try {
    await yarn.cliCommand(cwd, 'config', ['get', ...opts.args]);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
