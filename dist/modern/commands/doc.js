'use strict';

exports.__esModule = true;
exports.toDocOptions = toDocOptions;
exports.doc = doc;

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

function toDocOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args: args
  };
}
async function doc(opts) {
  await (0, _run.run)({
    cwd: opts.cwd,
    script: 'doc',
    scriptArgs: opts.args
  });
}
