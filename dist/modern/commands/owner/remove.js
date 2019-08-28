'use strict';

exports.__esModule = true;
exports.toOwnerRemoveOptions = toOwnerRemoveOptions;
exports.ownerRemove = ownerRemove;

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

function toOwnerRemoveOptions(args, flags) {
  return { cwd: options.string(flags.cwd, 'cwd'), args };
}
async function ownerRemove(opts) {
  let cwd = opts.cwd || process.cwd();
  try {
    await yarn.cliCommand(cwd, 'owner', ['remove', ...opts.args]);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
