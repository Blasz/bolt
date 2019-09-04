'use strict';

exports.__esModule = true;
exports.toListOptions = toListOptions;
exports.list = list;

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

function toListOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pattern: options.string(flags.pattern, 'pattern') || '',
    depth: options.number(flags.depth, 'depth') || ''
  };
}
async function list(opts) {
  let cwd = opts.cwd || process.cwd();
  let args = opts.pattern ? [`--pattern=${opts.pattern}`] : [];
  if (opts.depth) {
    args = args.concat([`--depth=${opts.depth}`]);
  }
  try {
    yarn.cliCommand(cwd, 'list', args);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
