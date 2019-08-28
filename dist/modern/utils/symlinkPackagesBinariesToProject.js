'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathIsInside = require('path-is-inside');

var _pathIsInside2 = _interopRequireDefault(_pathIsInside);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _errors = require('./errors');

var _fs = require('./fs');

var fs = _interopRequireWildcard(_fs);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _yarn = require('./yarn');

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

exports.default = async function symlinkPackagesBinaries(project) {
  let projectBinPath = project.pkg.nodeModulesBin;
  let packages = await project.getPackages();
  let { graph: dependencyGraph } = await project.getDependencyGraph(packages);

  let symlinksToCreate = [];

  for (let pkg of packages) {
    const pkgBins = await pkg.getBins();

    if (pkgBins.length === 0) {
      continue;
    }

    for (let pkgBin of pkgBins) {
      let binName = pkgBin.name.split('/').pop();
      let src = pkgBin.filePath;
      let dest = _path2.default.join(projectBinPath, binName);

      symlinksToCreate.push({ src, dest, type: 'exec' });
    }
  }

  await _promise2.default.all(
    symlinksToCreate.map(({ src, dest, type }) => fs.symlink(src, dest, type))
  );
};
