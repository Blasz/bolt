'use strict';

exports.__esModule = true;
exports.matchWorkspaces = matchWorkspaces;
exports.findWorkspaces = findWorkspaces;
exports.matchOnlyAndIgnore = matchOnlyAndIgnore;

var _multimatch = require('multimatch');

var _multimatch2 = _interopRequireDefault(_multimatch);

var _globby = require('globby');

var _globby2 = _interopRequireDefault(_globby);

var _path = require('path');

var path = _interopRequireWildcard(_path);

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

function matchGlobs(paths, patterns) {
  return (0, _multimatch2.default)(paths, patterns);
}

function findGlobs(cwd, patterns) {
  return (0, _globby2.default)(patterns, { cwd });
}

function matchWorkspaces(paths, patterns) {
  return matchGlobs(paths, patterns);
}

function findWorkspaces(cwd, patterns) {
  return findGlobs(cwd, patterns);
}

function matchOnlyAndIgnore(paths, only, ignore) {
  var onlyPattern = only || '**';
  var ignorePattern = ignore ? `!${ignore}` : '';
  return matchGlobs(paths, [onlyPattern, ignorePattern]);
}
