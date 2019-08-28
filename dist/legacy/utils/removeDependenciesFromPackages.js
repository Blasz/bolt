'use strict';

exports.__esModule = true;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var removeDependenciesFromPackage = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(project, pkg, dependencies) {
      var matchedDependencies,
        isProjectPackage,
        _iterator,
        _isArray,
        _i,
        _ref2,
        depName,
        filePath,
        depTypes,
        _iterator2,
        _isArray2,
        _i2,
        _ref3,
        depType;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                matchedDependencies = filterDependenciesForPackage(
                  pkg,
                  dependencies
                );

                if (matchedDependencies.length) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', false);

              case 3:
                isProjectPackage = pkg.isSamePackage(project.pkg);

                if (!isProjectPackage) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return yarn.remove(matchedDependencies, pkg.dir);

              case 7:
                return _context.abrupt('return', true);

              case 8:
                (_iterator = matchedDependencies),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 9:
                if (!_isArray) {
                  _context.next = 15;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('break', 42);

              case 12:
                _ref2 = _iterator[_i++];
                _context.next = 19;
                break;

              case 15:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 18;
                  break;
                }

                return _context.abrupt('break', 42);

              case 18:
                _ref2 = _i.value;

              case 19:
                depName = _ref2;
                filePath = path.join(pkg.nodeModules, depName);
                depTypes = pkg.getDependencyTypes(depName);

                // Delete directory

                _context.next = 24;
                return fs.rimraf(filePath);

              case 24:
                (_iterator2 = depTypes),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 25:
                if (!_isArray2) {
                  _context.next = 31;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context.next = 28;
                  break;
                }

                return _context.abrupt('break', 40);

              case 28:
                _ref3 = _iterator2[_i2++];
                _context.next = 35;
                break;

              case 31:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context.next = 34;
                  break;
                }

                return _context.abrupt('break', 40);

              case 34:
                _ref3 = _i2.value;

              case 35:
                depType = _ref3;
                _context.next = 38;
                return pkg.setDependencyVersionRange(depName, depType, null);

              case 38:
                _context.next = 25;
                break;

              case 40:
                _context.next = 9;
                break;

              case 42:
                return _context.abrupt('return', true);

              case 43:
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

  return function removeDependenciesFromPackage(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _yarn = require('./yarn');

var yarn = _interopRequireWildcard(_yarn);

var _fs = require('./fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _errors = require('./errors');

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

var UNINSTALL_SCRIPTS = ['preuninstall', 'uninstall', 'postuninstall'];

function filterDependenciesForPackage(pkg, dependencies) {
  var allDependencies = pkg.getAllDependencies();
  return dependencies.filter(function(depName) {
    return allDependencies.has(depName);
  });
}

exports.default = (function() {
  var _ref4 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee4(
      project,
      packages,
      targetPackages,
      dependencies,
      spawnOpts
    ) {
      var _this = this;

      var includesProjectPackage,
        includedPackagesDirs,
        _iterator3,
        _isArray3,
        _i3,
        _ref5,
        pkg,
        invalid,
        _loop,
        _iterator4,
        _isArray4,
        _i4,
        _ref6,
        depName,
        _ret,
        includedPackages,
        _iterator5,
        _isArray5,
        _i5,
        _ref9,
        _pkg;

      return _regenerator2.default.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                // Is the set of packages that we're modifying include the project package? ...
                includesProjectPackage = false;

                // Which packages are we working with? ...

                includedPackagesDirs = {};

                // ...let's find out...

                (_iterator3 = targetPackages),
                  (_isArray3 = Array.isArray(_iterator3)),
                  (_i3 = 0),
                  (_iterator3 = _isArray3
                    ? _iterator3
                    : (0, _getIterator3.default)(_iterator3));

              case 3:
                if (!_isArray3) {
                  _context4.next = 9;
                  break;
                }

                if (!(_i3 >= _iterator3.length)) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('break', 17);

              case 6:
                _ref5 = _iterator3[_i3++];
                _context4.next = 13;
                break;

              case 9:
                _i3 = _iterator3.next();

                if (!_i3.done) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt('break', 17);

              case 12:
                _ref5 = _i3.value;

              case 13:
                pkg = _ref5;

                if (pkg.isSamePackage(project.pkg)) {
                  includesProjectPackage = true;
                } else {
                  includedPackagesDirs[pkg.dir] = true;
                }

              case 15:
                _context4.next = 3;
                break;

              case 17:
                // We're going to build up a list of the invalid specified dependencies to
                // remove
                invalid = [];

                _loop = function _loop(depName) {
                  // Get all of the dependents for this dependency
                  var dependents = targetPackages.filter(function(pkg) {
                    return pkg.getAllDependencies().has(depName);
                  });

                  // If there are no dependents for this dependency, then we don't need
                  // to do anything for it
                  if (!dependents.length) {
                    invalid.push(depName);
                    logger.error(messages.dependencyNotInstalled(depName));
                    return 'continue';
                  }

                  // If we're not removing anything from the project then we don't need to do
                  // anymore checks
                  if (!includesProjectPackage) {
                    return 'continue';
                  }

                  // Build up the dependents by their directory so we can test faster
                  var dependentsByDir = new _map2.default();
                  for (
                    var _iterator6 = dependents,
                      _isArray6 = Array.isArray(_iterator6),
                      _i6 = 0,
                      _iterator6 = _isArray6
                        ? _iterator6
                        : (0, _getIterator3.default)(_iterator6);
                    ;

                  ) {
                    var _ref10;

                    if (_isArray6) {
                      if (_i6 >= _iterator6.length) break;
                      _ref10 = _iterator6[_i6++];
                    } else {
                      _i6 = _iterator6.next();
                      if (_i6.done) break;
                      _ref10 = _i6.value;
                    }

                    var dependent = _ref10;

                    dependentsByDir.set(dependent.dir, dependent);
                  }

                  // Check to see if any workspaces (other than our dependents) depend on
                  // this dependency.
                  var excludedDependentPackages = packages.filter(function(
                    pkg
                  ) {
                    return (
                      !dependentsByDir.has(pkg.dir) &&
                      pkg.getAllDependencies().has(depName)
                    );
                  });

                  // We can't remove dependencies from our project package that aren't also
                  // being removed from all of the dependent workspaces.
                  if (excludedDependentPackages.length) {
                    invalid.push(depName);
                    logger.error(
                      messages.cannotRemoveDependencyDependendOnByWorkspaces(
                        depName,
                        excludedDependentPackages
                      )
                    );
                    logger.info(
                      messages.runWorkspacesRemoveDependency(depName)
                    );
                    return 'continue';
                  }
                };

                (_iterator4 = dependencies),
                  (_isArray4 = Array.isArray(_iterator4)),
                  (_i4 = 0),
                  (_iterator4 = _isArray4
                    ? _iterator4
                    : (0, _getIterator3.default)(_iterator4));

              case 20:
                if (!_isArray4) {
                  _context4.next = 26;
                  break;
                }

                if (!(_i4 >= _iterator4.length)) {
                  _context4.next = 23;
                  break;
                }

                return _context4.abrupt('break', 36);

              case 23:
                _ref6 = _iterator4[_i4++];
                _context4.next = 30;
                break;

              case 26:
                _i4 = _iterator4.next();

                if (!_i4.done) {
                  _context4.next = 29;
                  break;
                }

                return _context4.abrupt('break', 36);

              case 29:
                _ref6 = _i4.value;

              case 30:
                depName = _ref6;
                _ret = _loop(depName);

                if (!(_ret === 'continue')) {
                  _context4.next = 34;
                  break;
                }

                return _context4.abrupt('continue', 34);

              case 34:
                _context4.next = 20;
                break;

              case 36:
                if (!invalid.length) {
                  _context4.next = 38;
                  break;
                }

                throw new _errors.BoltError(
                  messages.couldntRemoveDependencies(invalid)
                );

              case 38:
                // Get an array of workspaces that we're removing from.
                includedPackages = packages.filter(function(pkg) {
                  return includedPackagesDirs[pkg.dir];
                });

                // Run the uninstall scripts for each workspace

                _context4.next = 41;
                return _promise2.default.all(
                  UNINSTALL_SCRIPTS.map(
                    (function() {
                      var _ref7 = (0, _asyncToGenerator3.default)(
                        _regenerator2.default.mark(function _callee3(script) {
                          return _regenerator2.default.wrap(
                            function _callee3$(_context3) {
                              while (1) {
                                switch ((_context3.prev = _context3.next)) {
                                  case 0:
                                    _context3.next = 2;
                                    return project.runPackageTasks(
                                      includedPackages,
                                      spawnOpts,
                                      (function() {
                                        var _ref8 = (0,
                                        _asyncToGenerator3.default)(
                                          _regenerator2.default.mark(
                                            function _callee2(pkg) {
                                              return _regenerator2.default.wrap(
                                                function _callee2$(_context2) {
                                                  while (1) {
                                                    switch (
                                                      (_context2.prev =
                                                        _context2.next)
                                                    ) {
                                                      case 0:
                                                        _context2.next = 2;
                                                        return yarn.runIfExists(
                                                          pkg,
                                                          script
                                                        );

                                                      case 2:
                                                        return _context2.abrupt(
                                                          'return',
                                                          _context2.sent
                                                        );

                                                      case 3:
                                                      case 'end':
                                                        return _context2.stop();
                                                    }
                                                  }
                                                },
                                                _callee2,
                                                _this
                                              );
                                            }
                                          )
                                        );

                                        return function(_x10) {
                                          return _ref8.apply(this, arguments);
                                        };
                                      })()
                                    );

                                  case 2:
                                  case 'end':
                                    return _context3.stop();
                                }
                              }
                            },
                            _callee3,
                            _this
                          );
                        })
                      );

                      return function(_x9) {
                        return _ref7.apply(this, arguments);
                      };
                    })()
                  )
                );

              case 41:
                if (!includesProjectPackage) {
                  _context4.next = 44;
                  break;
                }

                _context4.next = 44;
                return removeDependenciesFromPackage(
                  project,
                  project.pkg,
                  dependencies
                );

              case 44:
                (_iterator5 = includedPackages),
                  (_isArray5 = Array.isArray(_iterator5)),
                  (_i5 = 0),
                  (_iterator5 = _isArray5
                    ? _iterator5
                    : (0, _getIterator3.default)(_iterator5));

              case 45:
                if (!_isArray5) {
                  _context4.next = 51;
                  break;
                }

                if (!(_i5 >= _iterator5.length)) {
                  _context4.next = 48;
                  break;
                }

                return _context4.abrupt('break', 60);

              case 48:
                _ref9 = _iterator5[_i5++];
                _context4.next = 55;
                break;

              case 51:
                _i5 = _iterator5.next();

                if (!_i5.done) {
                  _context4.next = 54;
                  break;
                }

                return _context4.abrupt('break', 60);

              case 54:
                _ref9 = _i5.value;

              case 55:
                _pkg = _ref9;
                _context4.next = 58;
                return removeDependenciesFromPackage(
                  project,
                  _pkg,
                  dependencies
                );

              case 58:
                _context4.next = 45;
                break;

              case 60:
                logger.success(messages.removedDependencies());

              case 61:
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

  function removeDependenciesFromPackages(_x4, _x5, _x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  }

  return removeDependenciesFromPackages;
})();
