'use strict';

exports.__esModule = true;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

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

function versionRangeToRangeType(versionRange) {
  if (versionRange.charAt(0) === '^') return '^';
  if (versionRange.charAt(0) === '~') return '~';
  return '';
}

/**
 * This function is used to update all the internal dependencies where you have an external source
 * bumping updated packages (a tool like bolt-releases for example).
 * It takes an object of packageNames and their new updated packages. updatePackageVersions will update all
 * internal updated packages of packages according to those new updated packages.
 * ie, a caret dep, will remain a caret dep and a pinned dep will remain pinned.
 *
 * Note: we explicitly ignore all external dependencies passed and warn if they are.
 *
 * It is up to the consumer to ensure that these new updated packages are not going to leave the repo in an
 * inconsistent state (internal deps leaving semver ranges). This can occur if your
 * updated packages will not release all packages that need to be.
 *
 */

exports.default = async function updatePackageVersions(
  updatedPackages,
  opts = {}
) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let { graph } = await project.getDependencyGraph(packages);
  let editedPackages = new _set2.default();

  let internalDeps = (0, _keys2.default)(updatedPackages).filter(dep =>
    graph.has(dep)
  );
  let externalDeps = (0, _keys2.default)(updatedPackages).filter(
    dep => !graph.has(dep)
  );

  if (externalDeps.length !== 0) {
    logger.warn(
      messages.externalDepsPassedToUpdatePackageVersions(externalDeps)
    );
  }

  for (let pkg of packages) {
    let promises = [];
    let name = pkg.getName();

    for (let depName of internalDeps) {
      let depRange = String(pkg.getDependencyVersionRange(depName));
      let depTypes = pkg.getDependencyTypes(depName);
      let rangeType = versionRangeToRangeType(depRange);
      let newDepRange = rangeType + updatedPackages[depName];
      if (depTypes.length === 0) continue;

      let inUpdatedPackages = (0, _arrayIncludes2.default)(internalDeps, name);
      let willLeaveSemverRange = !_semver2.default.satisfies(
        updatedPackages[depName],
        depRange
      );
      // This check determines whether the package will be released. If the
      // package will not be released, we throw.
      if (!inUpdatedPackages && willLeaveSemverRange) {
        throw new Error(
          messages.invalidBoltWorkspacesFromUpdate(
            name,
            depName,
            depRange,
            updatedPackages[depName]
          )
        );
      }
      if (!inUpdatedPackages) continue;

      for (let depType of depTypes) {
        await pkg.setDependencyVersionRange(depName, depType, newDepRange);
      }
      editedPackages.add(pkg.filePath);
    }
  }

  return (0, _from2.default)(editedPackages);
};
