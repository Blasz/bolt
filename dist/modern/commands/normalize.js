'use strict';

exports.__esModule = true;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.toNormalizeOptions = toNormalizeOptions;
exports.normalize = normalize;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _processes = require('../utils/processes');

var processes = _interopRequireWildcard(_processes);

var _fs = require('../utils/fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _semver = require('semver');

var semver = _interopRequireWildcard(_semver);

var _npm = require('../utils/npm');

var npm = _interopRequireWildcard(_npm);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

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

function toNormalizeOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd')
  };
}

function getPackageMap(packages) {
  let packageMap = new _map2.default();

  for (let pkg of packages) {
    packageMap.set(pkg.getName(), pkg);
  }

  return packageMap;
}

function getPackageDependencyMap(project, projectDependencies, packages) {
  let map = new _map2.default();
  map.set(project.pkg, projectDependencies);
  for (let pkg of packages) {
    map.set(pkg, pkg.getAllDependencies());
  }
  return map;
}

function getAllDependencies(packageDependencyMap) {
  let allDependencies = new _map2.default();

  for (let [pkg, packageDependencies] of packageDependencyMap) {
    for (let [dependency, version] of packageDependencies) {
      let versionMap = allDependencies.get(dependency);

      if (!versionMap) {
        versionMap = new _map2.default();
        allDependencies.set(dependency, versionMap);
      }

      let packageSet = versionMap.get(version);

      if (!packageSet) {
        packageSet = new _set2.default();
        versionMap.set(version, packageSet);
      }

      packageSet.add(pkg);
    }
  }

  return allDependencies;
}

async function getInfoForPackageNames(pkgNames) {
  let info = {};

  await _promise2.default.all(
    pkgNames.map(async pkgName => {
      info[pkgName] = await npm.info(pkgName);
    })
  );

  return info;
}

function getHighestVersionForRanges(versions, ranges) {
  let filtered = ranges.reduce((filteredVersions, range) => {
    return filteredVersions.filter(version => {
      return semver.satisfies(version, range);
    });
  }, versions);

  if (filtered.length === 0) {
    return null;
  }

  return filtered[filtered.length - 1];
}

function getMaxPackageNameLength(pkgNames) {
  return pkgNames.reduce((curr, pkgName) => {
    return Math.max(curr, pkgName.length);
  }, 0);
}

async function normalize(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();

  let packageMap = getPackageMap(packages);

  let projectDependencies = project.pkg.getAllDependencies();
  let packageDependencyMap = getPackageDependencyMap(
    project,
    projectDependencies,
    packages
  );
  let allDependencies = getAllDependencies(packageDependencyMap);

  let finalVersions = new _map2.default();

  let unmatched = [];

  for (let [depName, versionMap] of allDependencies) {
    if (versionMap.size === 1) {
      finalVersions.set(depName, (0, _from2.default)(versionMap.keys())[0]);
    } else {
      unmatched.push(depName);
    }
  }

  let unmatchedInfo = await getInfoForPackageNames(unmatched);

  for (let depName of unmatched) {
    let versionMap = allDependencies.get(depName);
    if (!versionMap) continue;

    let versionRanges = (0, _from2.default)(versionMap.keys());
    let validVersions = unmatchedInfo[depName].versions;

    let highest = getHighestVersionForRanges(validVersions, versionRanges);
    if (!highest) continue;

    let newVersion = '^' + highest;

    for (let [pkg, packageDependencies] of packageDependencyMap) {
      let prevVersion = packageDependencies.get(depName);
      let depTypes = pkg.getDependencyTypes(depName);

      if (prevVersion && depTypes.length > 0) {
        for (let depType of depTypes) {
          await pkg.setDependencyVersionRange(depName, depType, newVersion);
        }
      }
    }

    finalVersions.set(depName, newVersion);
  }

  for (let [depName] of allDependencies) {
    let finalVersion = finalVersions.get(depName);
    let depTypes = project.pkg.getDependencyTypes(depName);
    depTypes = depTypes.length > 0 ? depTypes : ['dependencies'];

    let isInternal = packageMap.has(depName);
    let isUpdating = projectDependencies.has(depName);

    if (finalVersion && (isInternal ? isUpdating : true)) {
      for (let depType of depTypes) {
        await project.pkg.setDependencyVersionRange(
          depName,
          depType,
          finalVersion
        );
      }
    }
  }

  let outputItems = [];

  let maxLength = getMaxPackageNameLength(unmatched);
  let padding = ' '.repeat(maxLength + 1);

  for (let depName of unmatched) {
    let versionMap = allDependencies.get(depName);
    let finalVersion = finalVersions.get(depName);

    if (versionMap && !finalVersion) {
      let outputItem = _chalk2.default.red(depName.padStart(maxLength));

      for (let [version, packages] of versionMap) {
        let pkgs = (0, _from2.default)(packages).map(pkg => {
          return _chalk2.default.cyan(pkg.config.getDescriptor());
        });

        outputItem += '\n';
        outputItem += version.padStart(maxLength);
        outputItem += ' ' + pkgs.join('\n' + padding);
      }

      outputItems.push(outputItem);
    }
  }

  logger.error(messages.couldNotBeNormalized());
  logger.error(messages.toMessage(outputItems.join('\n\n')), {
    prefix: false
  });
}
