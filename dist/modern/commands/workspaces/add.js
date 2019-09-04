'use strict';

exports.__esModule = true;
exports.toWorkspacesAddOptions = toWorkspacesAddOptions;
exports.workspacesAdd = workspacesAdd;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

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

function toWorkspacesAddOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd')
  };
}

async function workspacesAdd(opts) {
  throw new _errors.BoltError('Unimplemented command "workspaces add"');
}
