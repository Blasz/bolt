'use strict';

exports.__esModule = true;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Package = require('./Package');

var _Package2 = _interopRequireDefault(_Package);

var _Config = require('./Config');

var _Config2 = _interopRequireDefault(_Config);

var _fs = require('./utils/fs');

var fs = _interopRequireWildcard(_fs);

var _logger = require('./utils/logger');

var logger = _interopRequireWildcard(_logger);

var _promiseWrapper = require('./utils/promiseWrapper');

var _messages = require('./utils/messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('./utils/errors');

var _globs = require('./utils/globs');

var globs = _interopRequireWildcard(_globs);

var _taskGraphRunner = require('task-graph-runner');

var _taskGraphRunner2 = _interopRequireDefault(_taskGraphRunner);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _env = require('./utils/env');

var env = _interopRequireWildcard(_env);

var _chunkd = require('chunkd');

var _chunkd2 = _interopRequireDefault(_chunkd);

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

function taskWrapper(task, bail) {
  if (bail === undefined || bail) {
    return (0, _promiseWrapper.promiseWrapperSuccess)(task);
  } else {
    return (0, _promiseWrapper.promiseWrapper)(task);
  }
}

var Project = (function() {
  function Project(pkg) {
    (0, _classCallCheck3.default)(this, Project);

    this.pkg = pkg;
  }

  Project.init = (function() {
    var _ref = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee(cwd) {
        var filePath, pkg;
        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return _Config2.default.getProjectConfig(cwd);

                case 2:
                  filePath = _context.sent;

                  if (filePath) {
                    _context.next = 5;
                    break;
                  }

                  throw new _errors.BoltError(
                    `Unable to find root of project in ${cwd}`
                  );

                case 5:
                  _context.next = 7;
                  return _Package2.default.init(filePath);

                case 7:
                  pkg = _context.sent;
                  return _context.abrupt('return', new Project(pkg));

                case 9:
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

  Project.prototype.getPackages = (function() {
    var _ref2 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee2() {
        var queue,
          packages,
          _iterator,
          _isArray,
          _i,
          _ref3,
          item,
          cwd,
          patterns,
          matchedPaths,
          _iterator2,
          _isArray2,
          _i2,
          _ref4,
          matchedPath,
          dir,
          stats,
          filePath,
          _pkg;

        return _regenerator2.default.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  queue = [this.pkg];
                  packages = [];
                  (_iterator = queue),
                    (_isArray = Array.isArray(_iterator)),
                    (_i = 0),
                    (_iterator = _isArray
                      ? _iterator
                      : (0, _getIterator3.default)(_iterator));

                case 3:
                  if (!_isArray) {
                    _context2.next = 9;
                    break;
                  }

                  if (!(_i >= _iterator.length)) {
                    _context2.next = 6;
                    break;
                  }

                  return _context2.abrupt('break', 56);

                case 6:
                  _ref3 = _iterator[_i++];
                  _context2.next = 13;
                  break;

                case 9:
                  _i = _iterator.next();

                  if (!_i.done) {
                    _context2.next = 12;
                    break;
                  }

                  return _context2.abrupt('break', 56);

                case 12:
                  _ref3 = _i.value;

                case 13:
                  item = _ref3;
                  cwd = path.dirname(item.filePath);
                  patterns = item.getWorkspacesConfig();
                  _context2.next = 18;
                  return globs.findWorkspaces(cwd, patterns);

                case 18:
                  matchedPaths = _context2.sent;
                  (_iterator2 = matchedPaths),
                    (_isArray2 = Array.isArray(_iterator2)),
                    (_i2 = 0),
                    (_iterator2 = _isArray2
                      ? _iterator2
                      : (0, _getIterator3.default)(_iterator2));

                case 20:
                  if (!_isArray2) {
                    _context2.next = 26;
                    break;
                  }

                  if (!(_i2 >= _iterator2.length)) {
                    _context2.next = 23;
                    break;
                  }

                  return _context2.abrupt('break', 54);

                case 23:
                  _ref4 = _iterator2[_i2++];
                  _context2.next = 30;
                  break;

                case 26:
                  _i2 = _iterator2.next();

                  if (!_i2.done) {
                    _context2.next = 29;
                    break;
                  }

                  return _context2.abrupt('break', 54);

                case 29:
                  _ref4 = _i2.value;

                case 30:
                  matchedPath = _ref4;
                  dir = path.join(cwd, matchedPath);
                  _context2.next = 34;
                  return fs.stat(dir);

                case 34:
                  stats = _context2.sent;

                  if (stats.isDirectory()) {
                    _context2.next = 37;
                    break;
                  }

                  return _context2.abrupt('continue', 52);

                case 37:
                  filePath = path.join(dir, 'package.json');
                  _pkg = void 0;
                  _context2.prev = 39;
                  _context2.next = 42;
                  return _Package2.default.init(filePath);

                case 42:
                  _pkg = _context2.sent;
                  _context2.next = 50;
                  break;

                case 45:
                  _context2.prev = 45;
                  _context2.t0 = _context2['catch'](39);

                  if (!(_context2.t0 instanceof _errors.BoltError)) {
                    _context2.next = 49;
                    break;
                  }

                  return _context2.abrupt('continue', 52);

                case 49:
                  throw _context2.t0;

                case 50:
                  queue.push(_pkg);
                  packages.push(_pkg);

                case 52:
                  _context2.next = 20;
                  break;

                case 54:
                  _context2.next = 3;
                  break;

                case 56:
                  return _context2.abrupt('return', packages);

                case 57:
                case 'end':
                  return _context2.stop();
              }
            }
          },
          _callee2,
          this,
          [[39, 45]]
        );
      })
    );

    function getPackages() {
      return _ref2.apply(this, arguments);
    }

    return getPackages;
  })();

  Project.prototype.getDependencyGraph = (function() {
    var _ref5 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee3(
        packages,
        excludedDependencyTypes
      ) {
        var graph,
          queue,
          packagesByName,
          valid,
          _iterator3,
          _isArray3,
          _i3,
          _ref6,
          _pkg2,
          _iterator4,
          _isArray4,
          _i4,
          _ref7,
          _pkg3,
          name,
          _dependencies,
          allDependencies,
          _iterator5,
          _isArray5,
          _i5,
          _ref9,
          _ref8,
          depName,
          depVersion,
          match,
          actual,
          expected;

        return _regenerator2.default.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  graph = new _map2.default();
                  queue = [this.pkg];
                  packagesByName = { [this.pkg.getName()]: this.pkg };
                  valid = true;
                  (_iterator3 = packages),
                    (_isArray3 = Array.isArray(_iterator3)),
                    (_i3 = 0),
                    (_iterator3 = _isArray3
                      ? _iterator3
                      : (0, _getIterator3.default)(_iterator3));

                case 5:
                  if (!_isArray3) {
                    _context3.next = 11;
                    break;
                  }

                  if (!(_i3 >= _iterator3.length)) {
                    _context3.next = 8;
                    break;
                  }

                  return _context3.abrupt('break', 20);

                case 8:
                  _ref6 = _iterator3[_i3++];
                  _context3.next = 15;
                  break;

                case 11:
                  _i3 = _iterator3.next();

                  if (!_i3.done) {
                    _context3.next = 14;
                    break;
                  }

                  return _context3.abrupt('break', 20);

                case 14:
                  _ref6 = _i3.value;

                case 15:
                  _pkg2 = _ref6;

                  queue.push(_pkg2);
                  packagesByName[_pkg2.getName()] = _pkg2;

                case 18:
                  _context3.next = 5;
                  break;

                case 20:
                  (_iterator4 = queue),
                    (_isArray4 = Array.isArray(_iterator4)),
                    (_i4 = 0),
                    (_iterator4 = _isArray4
                      ? _iterator4
                      : (0, _getIterator3.default)(_iterator4));

                case 21:
                  if (!_isArray4) {
                    _context3.next = 27;
                    break;
                  }

                  if (!(_i4 >= _iterator4.length)) {
                    _context3.next = 24;
                    break;
                  }

                  return _context3.abrupt('break', 64);

                case 24:
                  _ref7 = _iterator4[_i4++];
                  _context3.next = 31;
                  break;

                case 27:
                  _i4 = _iterator4.next();

                  if (!_i4.done) {
                    _context3.next = 30;
                    break;
                  }

                  return _context3.abrupt('break', 64);

                case 30:
                  _ref7 = _i4.value;

                case 31:
                  _pkg3 = _ref7;
                  name = _pkg3.config.getName();
                  _dependencies = [];
                  allDependencies = _pkg3.getAllDependencies(
                    excludedDependencyTypes
                  );
                  (_iterator5 = allDependencies),
                    (_isArray5 = Array.isArray(_iterator5)),
                    (_i5 = 0),
                    (_iterator5 = _isArray5
                      ? _iterator5
                      : (0, _getIterator3.default)(_iterator5));

                case 36:
                  if (!_isArray5) {
                    _context3.next = 42;
                    break;
                  }

                  if (!(_i5 >= _iterator5.length)) {
                    _context3.next = 39;
                    break;
                  }

                  return _context3.abrupt('break', 61);

                case 39:
                  _ref9 = _iterator5[_i5++];
                  _context3.next = 46;
                  break;

                case 42:
                  _i5 = _iterator5.next();

                  if (!_i5.done) {
                    _context3.next = 45;
                    break;
                  }

                  return _context3.abrupt('break', 61);

                case 45:
                  _ref9 = _i5.value;

                case 46:
                  _ref8 = _ref9;
                  depName = _ref8[0];
                  depVersion = _ref8[1];
                  match = packagesByName[depName];

                  if (match) {
                    _context3.next = 52;
                    break;
                  }

                  return _context3.abrupt('continue', 59);

                case 52:
                  actual = depVersion;
                  expected = match.config.getVersion();

                  // Workspace dependencies only need to semver satisfy, not '==='

                  if (_semver2.default.satisfies(expected, depVersion)) {
                    _context3.next = 58;
                    break;
                  }

                  valid = false;
                  logger.error(
                    messages.packageMustDependOnCurrentVersion(
                      name,
                      depName,
                      expected,
                      depVersion
                    )
                  );
                  return _context3.abrupt('continue', 59);

                case 58:
                  _dependencies.push(depName);

                case 59:
                  _context3.next = 36;
                  break;

                case 61:
                  graph.set(name, { pkg: _pkg3, dependencies: _dependencies });

                case 62:
                  _context3.next = 21;
                  break;

                case 64:
                  return _context3.abrupt('return', { graph, valid });

                case 65:
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

    function getDependencyGraph(_x2, _x3) {
      return _ref5.apply(this, arguments);
    }

    return getDependencyGraph;
  })();

  Project.prototype.getDependentsGraph = (function() {
    var _ref10 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee4(packages, excludedDepTypes) {
        var graph, _ref11, valid, dependencyGraph, dependentsLookup;

        return _regenerator2.default.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  graph = new _map2.default();
                  _context4.next = 3;
                  return this.getDependencyGraph(packages, excludedDepTypes);

                case 3:
                  _ref11 = _context4.sent;
                  valid = _ref11.valid;
                  dependencyGraph = _ref11.graph;
                  dependentsLookup = {};

                  packages.forEach(function(pkg) {
                    dependentsLookup[pkg.config.getName()] = {
                      pkg,
                      dependents: []
                    };
                  });

                  packages.forEach(function(pkg) {
                    var dependent = pkg.getName();
                    var valFromDependencyGraph =
                      dependencyGraph.get(dependent) || {};
                    var dependencies =
                      valFromDependencyGraph.dependencies || [];

                    dependencies.forEach(function(dependency) {
                      dependentsLookup[dependency].dependents.push(dependent);
                    });
                  });

                  // can't use Object.entries here as the flow type for it is Array<[string, mixed]>;
                  (0, _keys2.default)(dependentsLookup).forEach(function(key) {
                    graph.set(key, dependentsLookup[key]);
                  });

                  return _context4.abrupt('return', { valid, graph });

                case 11:
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

    function getDependentsGraph(_x4, _x5) {
      return _ref10.apply(this, arguments);
    }

    return getDependentsGraph;
  })();

  Project.prototype.runPackageTasks = (function() {
    var _ref12 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee5(packages, spawnOpts, task) {
        var wrappedTask, results;
        return _regenerator2.default.wrap(
          function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  wrappedTask = taskWrapper(task, spawnOpts.bail);
                  results = void 0;

                  if (!(spawnOpts.orderMode === 'serial')) {
                    _context5.next = 8;
                    break;
                  }

                  _context5.next = 5;
                  return this.runPackageTasksSerial(packages, wrappedTask);

                case 5:
                  results = _context5.sent;
                  _context5.next = 23;
                  break;

                case 8:
                  if (!(spawnOpts.orderMode === 'parallel')) {
                    _context5.next = 14;
                    break;
                  }

                  _context5.next = 11;
                  return this.runPackageTasksParallel(packages, wrappedTask);

                case 11:
                  results = _context5.sent;
                  _context5.next = 23;
                  break;

                case 14:
                  if (!(spawnOpts.orderMode === 'parallel-nodes')) {
                    _context5.next = 20;
                    break;
                  }

                  _context5.next = 17;
                  return this.runPackageTasksParallelNodes(
                    packages,
                    wrappedTask
                  );

                case 17:
                  results = _context5.sent;
                  _context5.next = 23;
                  break;

                case 20:
                  _context5.next = 22;
                  return this.runPackageTasksGraphParallel(
                    packages,
                    wrappedTask
                  );

                case 22:
                  results = _context5.sent;

                case 23:
                  results.forEach(function(r) {
                    if (r.status === 'error') {
                      throw r.error;
                    }
                  });

                case 24:
                case 'end':
                  return _context5.stop();
              }
            }
          },
          _callee5,
          this
        );
      })
    );

    function runPackageTasks(_x6, _x7, _x8) {
      return _ref12.apply(this, arguments);
    }

    return runPackageTasks;
  })();

  Project.prototype.runPackageTasksSerial = (function() {
    var _ref13 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee6(packages, task) {
        var results, _iterator6, _isArray6, _i6, _ref14, _pkg4;

        return _regenerator2.default.wrap(
          function _callee6$(_context6) {
            while (1) {
              switch ((_context6.prev = _context6.next)) {
                case 0:
                  results = [];
                  (_iterator6 = packages),
                    (_isArray6 = Array.isArray(_iterator6)),
                    (_i6 = 0),
                    (_iterator6 = _isArray6
                      ? _iterator6
                      : (0, _getIterator3.default)(_iterator6));

                case 2:
                  if (!_isArray6) {
                    _context6.next = 8;
                    break;
                  }

                  if (!(_i6 >= _iterator6.length)) {
                    _context6.next = 5;
                    break;
                  }

                  return _context6.abrupt('break', 20);

                case 5:
                  _ref14 = _iterator6[_i6++];
                  _context6.next = 12;
                  break;

                case 8:
                  _i6 = _iterator6.next();

                  if (!_i6.done) {
                    _context6.next = 11;
                    break;
                  }

                  return _context6.abrupt('break', 20);

                case 11:
                  _ref14 = _i6.value;

                case 12:
                  _pkg4 = _ref14;
                  _context6.t0 = results;
                  _context6.next = 16;
                  return task(_pkg4);

                case 16:
                  _context6.t1 = _context6.sent;

                  _context6.t0.push.call(_context6.t0, _context6.t1);

                case 18:
                  _context6.next = 2;
                  break;

                case 20:
                  return _context6.abrupt('return', results);

                case 21:
                case 'end':
                  return _context6.stop();
              }
            }
          },
          _callee6,
          this
        );
      })
    );

    function runPackageTasksSerial(_x9, _x10) {
      return _ref13.apply(this, arguments);
    }

    return runPackageTasksSerial;
  })();

  Project.prototype.runPackageTasksParallel = function runPackageTasksParallel(
    packages,
    task
  ) {
    return _promise2.default.all(
      packages.map(function(pkg) {
        return task(pkg);
      })
    );
  };

  Project.prototype.runPackageTasksParallelNodes = (function() {
    var _ref15 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee7(packages, task) {
        var index, total, all;
        return _regenerator2.default.wrap(
          function _callee7$(_context7) {
            while (1) {
              switch ((_context7.prev = _context7.next)) {
                case 0:
                  packages = packages.sort(function(a, b) {
                    return a.filePath.localeCompare(b.filePath, [], {
                      numeric: true
                    });
                  });

                  index = env.get('CI_NODE_INDEX');
                  total = env.get('CI_NODE_TOTAL');

                  if (typeof index === 'number' && typeof total === 'number') {
                    all = packages.length;

                    packages = (0, _chunkd2.default)(packages, index, total);
                    logger.info(
                      messages.taskRunningAcrossCINodes(
                        total,
                        packages.length,
                        all
                      )
                    );
                  }

                  return _context7.abrupt(
                    'return',
                    this.runPackageTasksParallel(packages, task)
                  );

                case 5:
                case 'end':
                  return _context7.stop();
              }
            }
          },
          _callee7,
          this
        );
      })
    );

    function runPackageTasksParallelNodes(_x11, _x12) {
      return _ref15.apply(this, arguments);
    }

    return runPackageTasksParallelNodes;
  })();

  Project.prototype.runPackageTasksGraphParallel = (function() {
    var _ref16 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee9(packages, _task) {
        var _this = this;

        var _ref17,
          dependentsGraph,
          valid,
          graph,
          _iterator7,
          _isArray7,
          _i7,
          _ref19,
          _ref18,
          pkgName,
          pkgInfo,
          _ref20,
          safe,
          values;

        return _regenerator2.default.wrap(
          function _callee9$(_context9) {
            while (1) {
              switch ((_context9.prev = _context9.next)) {
                case 0:
                  _context9.next = 2;
                  return this.getDependencyGraph(packages, ['devDependencies']);

                case 2:
                  _ref17 = _context9.sent;
                  dependentsGraph = _ref17.graph;
                  valid = _ref17.valid;
                  graph = new _map2.default();
                  (_iterator7 = dependentsGraph),
                    (_isArray7 = Array.isArray(_iterator7)),
                    (_i7 = 0),
                    (_iterator7 = _isArray7
                      ? _iterator7
                      : (0, _getIterator3.default)(_iterator7));

                case 7:
                  if (!_isArray7) {
                    _context9.next = 13;
                    break;
                  }

                  if (!(_i7 >= _iterator7.length)) {
                    _context9.next = 10;
                    break;
                  }

                  return _context9.abrupt('break', 23);

                case 10:
                  _ref19 = _iterator7[_i7++];
                  _context9.next = 17;
                  break;

                case 13:
                  _i7 = _iterator7.next();

                  if (!_i7.done) {
                    _context9.next = 16;
                    break;
                  }

                  return _context9.abrupt('break', 23);

                case 16:
                  _ref19 = _i7.value;

                case 17:
                  _ref18 = _ref19;
                  pkgName = _ref18[0];
                  pkgInfo = _ref18[1];

                  graph.set(pkgName, pkgInfo.dependencies);

                case 21:
                  _context9.next = 7;
                  break;

                case 23:
                  _context9.next = 25;
                  return (0, _taskGraphRunner2.default)({
                    graph,
                    force: true,
                    task: (function() {
                      var _ref21 = (0, _asyncToGenerator3.default)(
                        _regenerator2.default.mark(function _callee8(pkgName) {
                          var pkg;
                          return _regenerator2.default.wrap(
                            function _callee8$(_context8) {
                              while (1) {
                                switch ((_context8.prev = _context8.next)) {
                                  case 0:
                                    pkg = _this.getPackageByName(
                                      packages,
                                      pkgName
                                    );

                                    if (!pkg) {
                                      _context8.next = 3;
                                      break;
                                    }

                                    return _context8.abrupt(
                                      'return',
                                      _task(pkg)
                                    );

                                  case 3:
                                  case 'end':
                                    return _context8.stop();
                                }
                              }
                            },
                            _callee8,
                            _this
                          );
                        })
                      );

                      function task(_x15) {
                        return _ref21.apply(this, arguments);
                      }

                      return task;
                    })()
                  });

                case 25:
                  _ref20 = _context9.sent;
                  safe = _ref20.safe;
                  values = _ref20.values;

                  if (!safe) {
                    logger.warn(messages.unsafeCycles());
                  }
                  return _context9.abrupt(
                    'return',
                    (0, _values2.default)(values)
                  );

                case 30:
                case 'end':
                  return _context9.stop();
              }
            }
          },
          _callee9,
          this
        );
      })
    );

    function runPackageTasksGraphParallel(_x13, _x14) {
      return _ref16.apply(this, arguments);
    }

    return runPackageTasksGraphParallel;
  })();

  Project.prototype.getPackageByName = function getPackageByName(
    packages,
    pkgName
  ) {
    return packages.find(function(pkg) {
      return pkg.getName() === pkgName;
    });
  };

  Project.prototype.filterPackages = function filterPackages(packages, opts) {
    var _this2 = this;

    var relativeDir = function relativeDir(pkg) {
      return path.relative(_this2.pkg.dir, pkg.dir);
    };

    var packageNames = packages.map(function(pkg) {
      return pkg.getName();
    });
    var packageDirs = packages.map(function(pkg) {
      return relativeDir(pkg);
    });

    var filteredByName = globs.matchOnlyAndIgnore(
      packageNames,
      opts.only,
      opts.ignore
    );

    var filteredByDir = globs.matchOnlyAndIgnore(
      packageDirs,
      opts.onlyFs,
      opts.ignoreFs
    );

    var filteredPackages = packages.filter(function(pkg) {
      return (
        (0, _arrayIncludes2.default)(filteredByName, pkg.getName()) &&
        (0, _arrayIncludes2.default)(filteredByDir, relativeDir(pkg))
      );
    });

    if (filteredPackages.length === 0) {
      logger.warn(messages.noPackagesMatchFilters());
    }

    return filteredPackages;
  };

  return Project;
})();

exports.default = Project;
