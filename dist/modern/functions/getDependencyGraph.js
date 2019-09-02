'use strict';

exports.__esModule = true;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = async function getDependencyGraph(opts = {}) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();

  let {
    graph: dependencyGraph,
    valid: graphIsValid
  } = await project.getDependencyGraph(packages, opts.excludedTypes);

  if (!graphIsValid) {
    throw new Error('Dependency graph is not valid');
  }

  let simplifiedDependencyGraph = new _map2.default();

  dependencyGraph.forEach((pkgInfo, pkgName) => {
    simplifiedDependencyGraph.set(pkgName, pkgInfo.dependencies);
  });

  return simplifiedDependencyGraph;
};
