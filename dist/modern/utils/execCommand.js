'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = execCommand;

var _processes = require('./processes');

var processes = _interopRequireWildcard(_processes);

var _options = require('./options');

var options = _interopRequireWildcard(_options);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function execCommand(project, pkg, command, commandArgs) {
  let PATH_PARTS = [];

  // We don't want to add the project package to the PATH twice
  if (!pkg.isSamePackage(project.pkg)) {
    PATH_PARTS.push(pkg.nodeModulesBin);
  }

  PATH_PARTS.push(project.pkg.nodeModulesBin);

  if (process.env.PATH) {
    PATH_PARTS.push(process.env.PATH);
  }

  let PATH = PATH_PARTS.join(':');

  return processes.spawn(command, commandArgs, {
    pkg,
    cwd: pkg.dir,
    tty: false,
    env: (0, _extends3.default)({}, process.env, { PATH })
  });
}
