'use strict';

exports.__esModule = true;

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function versionRangeToRangeType(versionRange) {
  if (versionRange.charAt(0) === '^') return '^';
  if (versionRange.charAt(0) === '~') return '~';
  return '';
}

exports.default = async function updateWorkspaceDependencies(
  dependencyToUpgrade,
  opts = {}
) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let { graph } = await project.getDependencyGraph(packages);
  let editedPackages = new _set2.default();

  // Note: all dependencyToUpgrade are external dependencies

  for (let pkg of packages) {
    let pkgDependencies = pkg.getAllDependencies();
    let name = pkg.getName();

    for (let depName in dependencyToUpgrade) {
      if (pkgDependencies.has(depName)) {
        let depTypes = pkg.getDependencyTypes(depName);
        editedPackages.add(name);
        for (let depType of depTypes) {
          await pkg.setDependencyVersionRange(
            depName,
            depType,
            dependencyToUpgrade[depName]
          );
        }
      }
    }
  }

  return editedPackages;
};
