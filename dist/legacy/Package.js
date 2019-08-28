'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

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

var Package = (function() {
  function Package(filePath, config) {
    (0, _classCallCheck3.default)(this, Package);

    this.filePath = filePath;
    this.dir = path.dirname(filePath);
    this.nodeModules = path.join(this.dir, 'node_modules');
    this.nodeModulesBin = path.join(this.nodeModules, '.bin');
    this.config = config;
  }

  Package.init = (function() {
    var _ref = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee(filePath) {
        var config;
        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return _Config2.default.init(filePath);

                case 2:
                  config = _context.sent;

                  if (config) {
                    _context.next = 5;
                    break;
                  }

                  throw new _errors.BoltError(
                    `Could not init config for "${filePath}"`
                  );

                case 5:
                  return _context.abrupt(
                    'return',
                    new Package(filePath, config)
                  );

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          this
        );
      })
    );

    function init(_x) {
      return _ref.apply(this, arguments);
    }

    return init;
  })();

  Package.closest = (function() {
    var _ref2 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee2(filePath) {
        var pkgPath;
        return _regenerator2.default.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.next = 2;
                  return _Config2.default.findConfigFile(filePath);

                case 2:
                  pkgPath = _context2.sent;

                  if (pkgPath) {
                    _context2.next = 5;
                    break;
                  }

                  throw new _errors.BoltError(
                    `Could not find package.json from "${filePath}"`
                  );

                case 5:
                  _context2.next = 7;
                  return Package.init(pkgPath);

                case 7:
                  return _context2.abrupt('return', _context2.sent);

                case 8:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          _callee2,
          this
        );
      })
    );

    function closest(_x2) {
      return _ref2.apply(this, arguments);
    }

    return closest;
  })();

  Package.prototype.getWorkspacesConfig = function getWorkspacesConfig() {
    return this.config.getWorkspaces() || [];
  };

  Package.prototype.getAllDependencies = function getAllDependencies() {
    var excludedTypes =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var allDependencies = new _map2.default();
    var dependencyTypes = _constants.DEPENDENCY_TYPES.filter(function(t) {
      return excludedTypes.indexOf(t) === -1;
    });

    for (
      var _iterator = dependencyTypes,
        _isArray = Array.isArray(_iterator),
        _i = 0,
        _iterator = _isArray
          ? _iterator
          : (0, _getIterator3.default)(_iterator);
      ;

    ) {
      var _ref3;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref3 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref3 = _i.value;
      }

      var type = _ref3;

      var deps = this.config.getDeps(type);
      if (!deps) continue;

      for (
        var _iterator2 = (0, _keys2.default)(deps),
          _isArray2 = Array.isArray(_iterator2),
          _i2 = 0,
          _iterator2 = _isArray2
            ? _iterator2
            : (0, _getIterator3.default)(_iterator2);
        ;

      ) {
        var _ref4;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref4 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref4 = _i2.value;
        }

        var _name = _ref4;

        allDependencies.set(_name, deps[_name]);
      }
    }

    return allDependencies;
  };

  Package.prototype.setDependencyVersionRange = (function() {
    var _ref5 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee3(
        depName,
        depType,
        versionRange
      ) {
        var prevDeps, prevVersionRange, pkgName;
        return _regenerator2.default.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  prevDeps = this.config.getDeps(depType);
                  prevVersionRange = (prevDeps && prevDeps[depName]) || null;

                  if (!(prevVersionRange === versionRange)) {
                    _context3.next = 4;
                    break;
                  }

                  return _context3.abrupt('return');

                case 4:
                  _context3.next = 6;
                  return this._updateDependencies(
                    depType,
                    (0, _extends3.default)({}, prevDeps, {
                      [depName]: versionRange
                    })
                  );

                case 6:
                  pkgName = this.config.getDescriptor();

                  if (versionRange === null) {
                    logger.info(
                      messages.removedPackageDependency(pkgName, depName)
                    );
                  } else if (prevVersionRange === null) {
                    logger.info(
                      messages.addedPackageDependency(
                        pkgName,
                        depName,
                        versionRange
                      )
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

                case 8:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          this
        );
      })
    );

    function setDependencyVersionRange(_x4, _x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return setDependencyVersionRange;
  })();

  Package.prototype._updateDependencies = (function() {
    var _ref6 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee4(depType, dependencies) {
        var cleaned, _iterator3, _isArray3, _i3, _ref7, depName, versionRange;

        return _regenerator2.default.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  cleaned = {};
                  (_iterator3 = (0, _keys2.default)(dependencies)),
                    (_isArray3 = Array.isArray(_iterator3)),
                    (_i3 = 0),
                    (_iterator3 = _isArray3
                      ? _iterator3
                      : (0, _getIterator3.default)(_iterator3));

                case 2:
                  if (!_isArray3) {
                    _context4.next = 8;
                    break;
                  }

                  if (!(_i3 >= _iterator3.length)) {
                    _context4.next = 5;
                    break;
                  }

                  return _context4.abrupt('break', 17);

                case 5:
                  _ref7 = _iterator3[_i3++];
                  _context4.next = 12;
                  break;

                case 8:
                  _i3 = _iterator3.next();

                  if (!_i3.done) {
                    _context4.next = 11;
                    break;
                  }

                  return _context4.abrupt('break', 17);

                case 11:
                  _ref7 = _i3.value;

                case 12:
                  depName = _ref7;
                  versionRange = dependencies[depName];

                  if (typeof versionRange === 'string') {
                    cleaned[depName] = versionRange;
                  }

                case 15:
                  _context4.next = 2;
                  break;

                case 17:
                  _context4.next = 19;
                  return this.config.write(
                    (0, _extends3.default)({}, this.config.getConfig(), {
                      [depType]: (0, _sortObject2.default)(cleaned)
                    })
                  );

                case 19:
                case 'end':
                  return _context4.stop();
              }
            }
          },
          _callee4,
          this
        );
      })
    );

    function _updateDependencies(_x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return _updateDependencies;
  })();

  Package.prototype.getDependencyTypes = function getDependencyTypes(depName) {
    var matchedTypes = [];
    for (
      var _iterator4 = _constants.DEPENDENCY_TYPES,
        _isArray4 = Array.isArray(_iterator4),
        _i4 = 0,
        _iterator4 = _isArray4
          ? _iterator4
          : (0, _getIterator3.default)(_iterator4);
      ;

    ) {
      var _ref8;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref8 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref8 = _i4.value;
      }

      var depType = _ref8;

      var deps = this.config.getDeps(depType);
      if (deps && deps[depName]) {
        matchedTypes.push(depType);
      }
    }
    return matchedTypes;
  };

  Package.prototype.getDependencyVersionRange = function getDependencyVersionRange(
    depName
  ) {
    for (
      var _iterator5 = _constants.DEPENDENCY_TYPES,
        _isArray5 = Array.isArray(_iterator5),
        _i5 = 0,
        _iterator5 = _isArray5
          ? _iterator5
          : (0, _getIterator3.default)(_iterator5);
      ;

    ) {
      var _ref9;

      if (_isArray5) {
        if (_i5 >= _iterator5.length) break;
        _ref9 = _iterator5[_i5++];
      } else {
        _i5 = _iterator5.next();
        if (_i5.done) break;
        _ref9 = _i5.value;
      }

      var depType = _ref9;

      var deps = this.config.getDeps(depType);
      if (deps && deps[depName]) {
        return deps[depName];
      }
    }
    return null;
  };

  // async maybeUpdateDependencyVersionRange(depName: string, current: string, version: string) {
  //   let versionRange = '^' + version;
  //   let updated = false;

  //   if (semver.satisfies(version, current)) {
  //     await this.updateDependencyVersionRange(depName, versionRange);
  //     updated = true;
  //   }

  //   return updated;
  // }

  Package.prototype.isSamePackage = function isSamePackage(pkg) {
    return pkg.dir === this.dir;
  };

  Package.prototype.getName = function getName() {
    return this.config.getName();
  };

  Package.prototype.getVersion = function getVersion() {
    return this.config.getVersion();
  };

  Package.prototype.getBins = function getBins() {
    var _this = this;

    var bin = this.config.getBin();
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
      return (0, _keys2.default)(bin).map(function(key) {
        return {
          name: key,
          filePath: path.join(_this.dir, bin[key])
        };
      });
    }
  };

  return Package;
})();

exports.default = Package;
