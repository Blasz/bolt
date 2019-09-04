'use strict';

exports.__esModule = true;
exports.toGlobalBinOptions = toGlobalBinOptions;
exports.globalBin = globalBin;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _yarn = require('../../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

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

function toGlobalBinOptions(args, flags) {
  return { cwd: options.string(flags.cwd, 'cwd') };
}
async function globalBin(opts) {
  let cwd = opts.cwd || process.cwd();
  try {
    await yarn.cliCommand(cwd, 'global', ['bin']);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
