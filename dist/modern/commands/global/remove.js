'use strict';

exports.__esModule = true;
exports.toGlobalRemoveOptions = toGlobalRemoveOptions;
exports.globalRemove = globalRemove;

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

function toGlobalRemoveOptions(args, flags) {
  let depsArgs = [];

  // args is each of our dependencies we are adding which may have "@version" parts to them
  args.forEach(dep => {
    depsArgs.push(options.toDependency(dep));
  });

  return {
    deps: depsArgs
  };
}
async function globalRemove(opts) {
  try {
    await yarn.globalCli('remove', opts.deps);
  } catch (err) {
    throw new _errors.BoltError(err);
  }
}
