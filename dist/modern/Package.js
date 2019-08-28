'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _Config = require('./Config');

var _Config2 = _interopRequireDefault(_Config);

var _constants = require('./constants');

var _processes = require('./utils/processes');

var processes = _interopRequireWildcard(_processes);

var _semver = require('semver');

var semver = _interopRequireWildcard(_semver);

var _logger = require('./utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./utils/messages');

var messages = _interopRequireWildcard(_messages);

var _sortObject = require('sort-object');

var _sortObject2 = _interopRequireDefault(_sortObject);

var _errors = require('./utils/errors');

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

class Package {
  constructor(filePath, config) {
    this.filePath = filePath;
    this.dir = path.dirname(filePath);
    this.nodeModules = path.join(this.dir, 'node_modules');
    this.nodeModulesBin = path.join(this.nodeModules, '.bin');
    this.config = config;
  }

  static async init(filePath) {
    let config = await _Config2.default.init(filePath);
    if (!config) {
      throw new _errors.BoltError(`Could not init config for "${filePath}"`);
    }
    return new Package(filePath, config);
  }

  static async closest(filePath) {
    let pkgPath = await _Config2.default.findConfigFile(filePath);
    if (!pkgPath) {
      throw new _errors.BoltError(
        `Could not find package.json from "${filePath}"`
      );
    }
    return await Package.init(pkgPath);
  }

  getWorkspacesConfig() {
    return this.config.getWorkspaces() || [];
  }

  getAllDependencies(excludedTypes = []) {
    let allDependencies = new _map2.default();
    let dependencyTypes = _constants.DEPENDENCY_TYPES.filter(
      t => excludedTypes.indexOf(t) === -1
    );

    for (let type of dependencyTypes) {
      let deps = this.config.getDeps(type);
      if (!deps) continue;

      for (let name of (0, _keys2.default)(deps)) {
        allDependencies.set(name, deps[name]);
      }
    }

    return allDependencies;
  }

  async setDependencyVersionRange(depName, depType, versionRange) {
    let prevDeps = this.config.getDeps(depType);
    let prevVersionRange = (prevDeps && prevDeps[depName]) || null;
    if (prevVersionRange === versionRange) return;

    await this._updateDependencies(
      depType,
      (0, _extends3.default)({}, prevDeps, {
        [depName]: versionRange
      })
    );

    let pkgName = this.config.getDescriptor();

    if (versionRange === null) {
      logger.info(messages.removedPackageDependency(pkgName, depName));
    } else if (prevVersionRange === null) {
      logger.info(
        messages.addedPackageDependency(pkgName, depName, versionRange)
      );
    } else {
      logger.info(
        messages.updatedPackageDependency(
          pkgName,
          depName,
          versionRange,
          prevVersionRange
        )
      );
    }
  }

  async _updateDependencies(depType, dependencies) {
    let cleaned = {};

    for (let depName of (0, _keys2.default)(dependencies)) {
      let versionRange = dependencies[depName];

      if (typeof versionRange === 'string') {
        cleaned[depName] = versionRange;
      }
    }
    await this.config.write(
      (0, _extends3.default)({}, this.config.getConfig(), {
        [depType]: (0, _sortObject2.default)(cleaned)
      })
    );
  }

  getDependencyTypes(depName) {
    let matchedTypes = [];
    for (let depType of _constants.DEPENDENCY_TYPES) {
      let deps = this.config.getDeps(depType);
      if (deps && deps[depName]) {
        matchedTypes.push(depType);
      }
    }
    return matchedTypes;
  }

  getDependencyVersionRange(depName) {
    for (let depType of _constants.DEPENDENCY_TYPES) {
      let deps = this.config.getDeps(depType);
      if (deps && deps[depName]) {
        return deps[depName];
      }
    }
    return null;
  }

  // async maybeUpdateDependencyVersionRange(depName: string, current: string, version: string) {
  //   let versionRange = '^' + version;
  //   let updated = false;

  //   if (semver.satisfies(version, current)) {
  //     await this.updateDependencyVersionRange(depName, versionRange);
  //     updated = true;
  //   }

  //   return updated;
  // }

  isSamePackage(pkg) {
    return pkg.dir === this.dir;
  }

  getName() {
    return this.config.getName();
  }

  getVersion() {
    return this.config.getVersion();
  }

  getBins() {
    let bin = this.config.getBin();
    if (typeof bin === 'undefined') {
      return [];
    } else if (typeof bin === 'string') {
      return [
        {
          name: this.config.getName(),
          filePath: path.join(this.dir, bin)
        }
      ];
    } else {
      return (0, _keys2.default)(bin).map(key => {
        return {
          name: key,
          filePath: path.join(this.dir, bin[key])
        };
      });
    }
  }
}
exports.default = Package;
