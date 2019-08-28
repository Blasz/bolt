'use strict';

exports.__esModule = true;

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

exports.default = async function getProject(opts = {}) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);

  return {
    dir: project.pkg.dir,
    name: project.pkg.config.getName(),
    config: project.pkg.config.json
  };
};
