'use strict';

exports.__esModule = true;
exports.toTeamAddOptions = toTeamAddOptions;
exports.teamAdd = teamAdd;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _npm = require('../../utils/npm');

var npm = _interopRequireWildcard(_npm);

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

function toTeamAddOptions(args, flags) {
  return { cwd: options.string(flags.cwd, 'cwd'), args };
}
async function teamAdd(opts) {
  let cwd = opts.cwd || process.cwd();
  try {
    await npm.cliCommand(cwd, 'team', ['add', ...opts.args]);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
