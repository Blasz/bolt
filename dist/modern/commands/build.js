'use strict';

exports.__esModule = true;
exports.toBuildOptions = toBuildOptions;
exports.build = build;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../utils/errors');

var _run = require('./run');

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

function toBuildOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args: args
  };
}
async function build(opts) {
  await (0, _run.run)({
    cwd: opts.cwd,
    script: 'build',
    scriptArgs: opts.args
  });
}
