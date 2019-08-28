'use strict';

exports.__esModule = true;
exports.toTagListOptions = toTagListOptions;
exports.tagList = tagList;

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

function toTagListOptions(args, flags) {
  return { cwd: options.string(flags.cwd, 'cwd'), args };
}
async function tagList(opts) {
  let cwd = opts.cwd || process.cwd();
  let args = opts.args || [];

  try {
    await yarn.cliCommand(cwd, 'tag', ['list', ...args]);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
