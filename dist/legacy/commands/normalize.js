'use strict';

exports.__esModule = true;
exports.normalize = undefined;

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var getInfoForPackageNames = (function() {
  var _ref7 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(pkgNames) {
      var _this = this;

      var info;
      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                info = {};
                _context2.next = 3;
                return _promise2.default.all(
                  pkgNames.map(
                    (function() {
                      var _ref8 = (0, _asyncToGenerator3.default)(
                        _regenerator2.default.mark(function _callee(pkgName) {
                          return _regenerator2.default.wrap(
                            function _callee$(_context) {
                              while (1) {
                                switch ((_context.prev = _context.next)) {
                                  case 0:
                                    _context.next = 2;
                                    return npm.info(pkgName);

                                  case 2:
                                    info[pkgName] = _context.sent;

                                  case 3:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            },
                            _callee,
                            _this
                          );
                        })
                      );

                      return function(_x2) {
                        return _ref8.apply(this, arguments);
                      };
                    })()
                  )
                );

              case 3:
                return _context2.abrupt('return', info);

              case 4:
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

  return function getInfoForPackageNames(_x) {
    return _ref7.apply(this, arguments);
  };
})();

var normalize = (exports.normalize = (function() {
  var _ref9 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee3(opts) {
      var cwd,
        project,
        packages,
        packageMap,
        projectDependencies,
        packageDependencyMap,
        allDependencies,
        finalVersions,
        unmatched,
        _iterator5,
        _isArray5,
        _i5,
        _ref11,
        _ref10,
        depName,
        versionMap,
        unmatchedInfo,
        _iterator6,
        _isArray6,
        _i6,
        _ref12,
        _depName,
        _versionMap,
        versionRanges,
        validVersions,
        highest,
        newVersion,
        _iterator9,
        _isArray9,
        _i9,
        _ref17,
        _ref16,
        pkg,
        packageDependencies,
        prevVersion,
        depTypes,
        _iterator10,
        _isArray10,
        _i10,
        _ref18,
        depType,
        _iterator7,
        _isArray7,
        _i7,
        _ref14,
        _ref13,
        _depName2,
        finalVersion,
        isInternal,
        isUpdating,
        _iterator11,
        _isArray11,
        _i11,
        _ref19,
        _depType,
        outputItems,
        maxLength,
        padding,
        _iterator8,
        _isArray8,
        _i8,
        _ref15,
        _depName3,
        _versionMap2,
        outputItem,
        _iterator12,
        _isArray12,
        _i12,
        _ref21,
        _ref20,
        version,
        _packages,
        pkgs;

      return _regenerator2.default.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                _context3.next = 3;
                return _Project2.default.init(cwd);

              case 3:
                project = _context3.sent;
                _context3.next = 6;
                return project.getPackages();

              case 6:
                packages = _context3.sent;
                packageMap = getPackageMap(packages);
                projectDependencies = project.pkg.getAllDependencies();
                packageDependencyMap = getPackageDependencyMap(
                  project,
                  projectDependencies,
                  packages
                );
                allDependencies = getAllDependencies(packageDependencyMap);
                finalVersions = new _map2.default();
                unmatched = [];
                (_iterator5 = allDependencies),
                  (_isArray5 = Array.isArray(_iterator5)),
                  (_i5 = 0),
                  (_iterator5 = _isArray5
                    ? _iterator5
                    : (0, _getIterator3.default)(_iterator5));

              case 14:
                if (!_isArray5) {
                  _context3.next = 20;
                  break;
                }

                if (!(_i5 >= _iterator5.length)) {
                  _context3.next = 17;
                  break;
                }

                return _context3.abrupt('break', 30);

              case 17:
                _ref11 = _iterator5[_i5++];
                _context3.next = 24;
                break;

              case 20:
                _i5 = _iterator5.next();

                if (!_i5.done) {
                  _context3.next = 23;
                  break;
                }

                return _context3.abrupt('break', 30);

              case 23:
                _ref11 = _i5.value;

              case 24:
                _ref10 = _ref11;
                depName = _ref10[0];
                versionMap = _ref10[1];

                if (versionMap.size === 1) {
                  finalVersions.set(
                    depName,
                    (0, _from2.default)(versionMap.keys())[0]
                  );
                } else {
                  unmatched.push(depName);
                }

              case 28:
                _context3.next = 14;
                break;

              case 30:
                _context3.next = 32;
                return getInfoForPackageNames(unmatched);

              case 32:
                unmatchedInfo = _context3.sent;
                (_iterator6 = unmatched),
                  (_isArray6 = Array.isArray(_iterator6)),
                  (_i6 = 0),
                  (_iterator6 = _isArray6
                    ? _iterator6
                    : (0, _getIterator3.default)(_iterator6));

              case 34:
                if (!_isArray6) {
                  _context3.next = 40;
                  break;
                }

                if (!(_i6 >= _iterator6.length)) {
                  _context3.next = 37;
                  break;
                }

                return _context3.abrupt('break', 92);

              case 37:
                _ref12 = _iterator6[_i6++];
                _context3.next = 44;
                break;

              case 40:
                _i6 = _iterator6.next();

                if (!_i6.done) {
                  _context3.next = 43;
                  break;
                }

                return _context3.abrupt('break', 92);

              case 43:
                _ref12 = _i6.value;

              case 44:
                _depName = _ref12;
                _versionMap = allDependencies.get(_depName);

                if (_versionMap) {
                  _context3.next = 48;
                  break;
                }

                return _context3.abrupt('continue', 90);

              case 48:
                versionRanges = (0, _from2.default)(_versionMap.keys());
                validVersions = unmatchedInfo[_depName].versions;
                highest = getHighestVersionForRanges(
                  validVersions,
                  versionRanges
                );

                if (highest) {
                  _context3.next = 53;
                  break;
                }

                return _context3.abrupt('continue', 90);

              case 53:
                newVersion = '^' + highest;
                (_iterator9 = packageDependencyMap),
                  (_isArray9 = Array.isArray(_iterator9)),
                  (_i9 = 0),
                  (_iterator9 = _isArray9
                    ? _iterator9
                    : (0, _getIterator3.default)(_iterator9));

              case 55:
                if (!_isArray9) {
                  _context3.next = 61;
                  break;
                }

                if (!(_i9 >= _iterator9.length)) {
                  _context3.next = 58;
                  break;
                }

                return _context3.abrupt('break', 89);

              case 58:
                _ref17 = _iterator9[_i9++];
                _context3.next = 65;
                break;

              case 61:
                _i9 = _iterator9.next();

                if (!_i9.done) {
                  _context3.next = 64;
                  break;
                }

                return _context3.abrupt('break', 89);

              case 64:
                _ref17 = _i9.value;

              case 65:
                _ref16 = _ref17;
                pkg = _ref16[0];
                packageDependencies = _ref16[1];
                prevVersion = packageDependencies.get(_depName);
                depTypes = pkg.getDependencyTypes(_depName);

                if (!(prevVersion && depTypes.length > 0)) {
                  _context3.next = 87;
                  break;
                }

                (_iterator10 = depTypes),
                  (_isArray10 = Array.isArray(_iterator10)),
                  (_i10 = 0),
                  (_iterator10 = _isArray10
                    ? _iterator10
                    : (0, _getIterator3.default)(_iterator10));

              case 72:
                if (!_isArray10) {
                  _context3.next = 78;
                  break;
                }

                if (!(_i10 >= _iterator10.length)) {
                  _context3.next = 75;
                  break;
                }

                return _context3.abrupt('break', 87);

              case 75:
                _ref18 = _iterator10[_i10++];
                _context3.next = 82;
                break;

              case 78:
                _i10 = _iterator10.next();

                if (!_i10.done) {
                  _context3.next = 81;
                  break;
                }

                return _context3.abrupt('break', 87);

              case 81:
                _ref18 = _i10.value;

              case 82:
                depType = _ref18;
                _context3.next = 85;
                return pkg.setDependencyVersionRange(
                  _depName,
                  depType,
                  newVersion
                );

              case 85:
                _context3.next = 72;
                break;

              case 87:
                _context3.next = 55;
                break;

              case 89:
                finalVersions.set(_depName, newVersion);

              case 90:
                _context3.next = 34;
                break;

              case 92:
                (_iterator7 = allDependencies),
                  (_isArray7 = Array.isArray(_iterator7)),
                  (_i7 = 0),
                  (_iterator7 = _isArray7
                    ? _iterator7
                    : (0, _getIterator3.default)(_iterator7));

              case 93:
                if (!_isArray7) {
                  _context3.next = 99;
                  break;
                }

                if (!(_i7 >= _iterator7.length)) {
                  _context3.next = 96;
                  break;
                }

                return _context3.abrupt('break', 129);

              case 96:
                _ref14 = _iterator7[_i7++];
                _context3.next = 103;
                break;

              case 99:
                _i7 = _iterator7.next();

                if (!_i7.done) {
                  _context3.next = 102;
                  break;
                }

                return _context3.abrupt('break', 129);

              case 102:
                _ref14 = _i7.value;

              case 103:
                _ref13 = _ref14;
                _depName2 = _ref13[0];
                finalVersion = finalVersions.get(_depName2);
                depTypes = project.pkg.getDependencyTypes(_depName2);

                depTypes = depTypes.length > 0 ? depTypes : ['dependencies'];

                isInternal = packageMap.has(_depName2);
                isUpdating = projectDependencies.has(_depName2);

                if (!(finalVersion && (isInternal ? isUpdating : true))) {
                  _context3.next = 127;
                  break;
                }

                (_iterator11 = depTypes),
                  (_isArray11 = Array.isArray(_iterator11)),
                  (_i11 = 0),
                  (_iterator11 = _isArray11
                    ? _iterator11
                    : (0, _getIterator3.default)(_iterator11));

              case 112:
                if (!_isArray11) {
                  _context3.next = 118;
                  break;
                }

                if (!(_i11 >= _iterator11.length)) {
                  _context3.next = 115;
                  break;
                }

                return _context3.abrupt('break', 127);

              case 115:
                _ref19 = _iterator11[_i11++];
                _context3.next = 122;
                break;

              case 118:
                _i11 = _iterator11.next();

                if (!_i11.done) {
                  _context3.next = 121;
                  break;
                }

                return _context3.abrupt('break', 127);

              case 121:
                _ref19 = _i11.value;

              case 122:
                _depType = _ref19;
                _context3.next = 125;
                return project.pkg.setDependencyVersionRange(
                  _depName2,
                  _depType,
                  finalVersion
                );

              case 125:
                _context3.next = 112;
                break;

              case 127:
                _context3.next = 93;
                break;

              case 129:
                outputItems = [];
                maxLength = getMaxPackageNameLength(unmatched);
                padding = ' '.repeat(maxLength + 1);
                (_iterator8 = unmatched),
                  (_isArray8 = Array.isArray(_iterator8)),
                  (_i8 = 0),
                  (_iterator8 = _isArray8
                    ? _iterator8
                    : (0, _getIterator3.default)(_iterator8));

              case 133:
                if (!_isArray8) {
                  _context3.next = 139;
                  break;
                }

                if (!(_i8 >= _iterator8.length)) {
                  _context3.next = 136;
                  break;
                }

                return _context3.abrupt('break', 171);

              case 136:
                _ref15 = _iterator8[_i8++];
                _context3.next = 143;
                break;

              case 139:
                _i8 = _iterator8.next();

                if (!_i8.done) {
                  _context3.next = 142;
                  break;
                }

                return _context3.abrupt('break', 171);

              case 142:
                _ref15 = _i8.value;

              case 143:
                _depName3 = _ref15;
                _versionMap2 = allDependencies.get(_depName3);
                finalVersion = finalVersions.get(_depName3);

                if (!(_versionMap2 && !finalVersion)) {
                  _context3.next = 169;
                  break;
                }

                outputItem = _chalk2.default.red(_depName3.padStart(maxLength));
                (_iterator12 = _versionMap2),
                  (_isArray12 = Array.isArray(_iterator12)),
                  (_i12 = 0),
                  (_iterator12 = _isArray12
                    ? _iterator12
                    : (0, _getIterator3.default)(_iterator12));

              case 149:
                if (!_isArray12) {
                  _context3.next = 155;
                  break;
                }

                if (!(_i12 >= _iterator12.length)) {
                  _context3.next = 152;
                  break;
                }

                return _context3.abrupt('break', 168);

              case 152:
                _ref21 = _iterator12[_i12++];
                _context3.next = 159;
                break;

              case 155:
                _i12 = _iterator12.next();

                if (!_i12.done) {
                  _context3.next = 158;
                  break;
                }

                return _context3.abrupt('break', 168);

              case 158:
                _ref21 = _i12.value;

              case 159:
                _ref20 = _ref21;
                version = _ref20[0];
                _packages = _ref20[1];
                pkgs = (0, _from2.default)(_packages).map(function(pkg) {
                  return _chalk2.default.cyan(pkg.config.getDescriptor());
                });

                outputItem += '\n';
                outputItem += version.padStart(maxLength);
                outputItem += ' ' + pkgs.join('\n' + padding);

              case 166:
                _context3.next = 149;
                break;

              case 168:
                outputItems.push(outputItem);

              case 169:
                _context3.next = 133;
                break;

              case 171:
                logger.error(messages.couldNotBeNormalized());
                logger.error(messages.toMessage(outputItems.join('\n\n')), {
                  prefix: false
                });

              case 173:
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

  return function normalize(_x3) {
    return _ref9.apply(this, arguments);
  };
})());

exports.toNormalizeOptions = toNormalizeOptions;

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
  var packageMap = new _map2.default();

  for (
    var _iterator = packages,
      _isArray = Array.isArray(_iterator),
      _i = 0,
      _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);
    ;

  ) {
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var pkg = _ref;

    packageMap.set(pkg.getName(), pkg);
  }

  return packageMap;
}

function getPackageDependencyMap(project, projectDependencies, packages) {
  var map = new _map2.default();
  map.set(project.pkg, projectDependencies);
  for (
    var _iterator2 = packages,
      _isArray2 = Array.isArray(_iterator2),
      _i2 = 0,
      _iterator2 = _isArray2
        ? _iterator2
        : (0, _getIterator3.default)(_iterator2);
    ;

  ) {
    var _ref2;

    if (_isArray2) {
      if (_i2 >= _iterator2.length) break;
      _ref2 = _iterator2[_i2++];
    } else {
      _i2 = _iterator2.next();
      if (_i2.done) break;
      _ref2 = _i2.value;
    }

    var pkg = _ref2;

    map.set(pkg, pkg.getAllDependencies());
  }
  return map;
}

function getAllDependencies(packageDependencyMap) {
  var allDependencies = new _map2.default();

  for (
    var _iterator3 = packageDependencyMap,
      _isArray3 = Array.isArray(_iterator3),
      _i3 = 0,
      _iterator3 = _isArray3
        ? _iterator3
        : (0, _getIterator3.default)(_iterator3);
    ;

  ) {
    var _ref4;

    if (_isArray3) {
      if (_i3 >= _iterator3.length) break;
      _ref4 = _iterator3[_i3++];
    } else {
      _i3 = _iterator3.next();
      if (_i3.done) break;
      _ref4 = _i3.value;
    }

    var _ref3 = _ref4;
    var pkg = _ref3[0];
    var packageDependencies = _ref3[1];

    for (
      var _iterator4 = packageDependencies,
        _isArray4 = Array.isArray(_iterator4),
        _i4 = 0,
        _iterator4 = _isArray4
          ? _iterator4
          : (0, _getIterator3.default)(_iterator4);
      ;

    ) {
      var _ref6;

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break;
        _ref6 = _iterator4[_i4++];
      } else {
        _i4 = _iterator4.next();
        if (_i4.done) break;
        _ref6 = _i4.value;
      }

      var _ref5 = _ref6;
      var dependency = _ref5[0];
      var version = _ref5[1];

      var versionMap = allDependencies.get(dependency);

      if (!versionMap) {
        versionMap = new _map2.default();
        allDependencies.set(dependency, versionMap);
      }

      var packageSet = versionMap.get(version);

      if (!packageSet) {
        packageSet = new _set2.default();
        versionMap.set(version, packageSet);
      }

      packageSet.add(pkg);
    }
  }

  return allDependencies;
}

function getHighestVersionForRanges(versions, ranges) {
  var filtered = ranges.reduce(function(filteredVersions, range) {
    return filteredVersions.filter(function(version) {
      return semver.satisfies(version, range);
    });
  }, versions);

  if (filtered.length === 0) {
    return null;
  }

  return filtered[filtered.length - 1];
}

function getMaxPackageNameLength(pkgNames) {
  return pkgNames.reduce(function(curr, pkgName) {
    return Math.max(curr, pkgName.length);
  }, 0);
}
