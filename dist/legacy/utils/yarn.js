'use strict';

exports.__esModule = true;
exports.globalCli = exports.userAgent = exports.info = exports.cliCommand = exports.remove = exports.getScript = exports.runIfExists = exports.run = exports.upgrade = exports.add = exports.install = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var install = (exports.install = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(cwd) {
      var lockfileMode =
        arguments.length > 1 && arguments[1] !== undefined
          ? arguments[1]
          : 'default';
      var localYarn, installFlags, yarnUserAgent, boltUserAgent;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.t0 = path;
                _context.next = 3;
                return getLocalBinPath();

              case 3:
                _context.t1 = _context.sent;
                localYarn = _context.t0.join.call(
                  _context.t0,
                  _context.t1,
                  'yarn'
                );
                installFlags = [];
                _context.t2 = lockfileMode;
                _context.next =
                  _context.t2 === 'frozen'
                    ? 9
                    : _context.t2 === 'pure'
                    ? 11
                    : 13;
                break;

              case 9:
                installFlags.push('--frozen-lockfile');
                return _context.abrupt('break', 14);

              case 11:
                installFlags.push('--pure-lockfile');
                return _context.abrupt('break', 14);

              case 13:
                return _context.abrupt('break', 14);

              case 14:
                _context.next = 16;
                return userAgent();

              case 16:
                yarnUserAgent = _context.sent;
                boltUserAgent = `bolt/${_constants.BOLT_VERSION} ${yarnUserAgent}`;
                _context.next = 20;
                return processes.spawn(
                  localYarn,
                  ['install'].concat(installFlags),
                  {
                    cwd,
                    tty: true,
                    env: (0, _extends3.default)({}, process.env, {
                      npm_config_user_agent: boltUserAgent,
                      bolt_config_user_agent: boltUserAgent
                    }),
                    useBasename: true
                  }
                );

              case 20:
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

  return function install(_x2) {
    return _ref.apply(this, arguments);
  };
})());

var add = (exports.add = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(pkg, dependencies, type) {
      var localYarn, spawnArgs, flag;
      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.t0 = path;
                _context2.next = 3;
                return getLocalBinPath();

              case 3:
                _context2.t1 = _context2.sent;
                localYarn = _context2.t0.join.call(
                  _context2.t0,
                  _context2.t1,
                  'yarn'
                );
                spawnArgs = ['add'];

                if (dependencies.length) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return');

              case 8:
                dependencies.forEach(function(dep) {
                  if (dep.version) {
                    spawnArgs.push(`${dep.name}@${dep.version}`);
                  } else {
                    spawnArgs.push(dep.name);
                  }
                });

                if (type) {
                  flag = depTypeToFlag(type);

                  if (flag) spawnArgs.push(flag);
                }

                _context2.next = 12;
                return processes.spawn(localYarn, spawnArgs, {
                  cwd: pkg.dir,
                  pkg: pkg,
                  tty: true
                });

              case 12:
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

  return function add(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})());

var upgrade = (exports.upgrade = (function() {
  var _ref3 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee3(pkg) {
      var dependencies =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var flags =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var localYarn, spawnArgs;
      return _regenerator2.default.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.t0 = path;
                _context3.next = 3;
                return getLocalBinPath();

              case 3:
                _context3.t1 = _context3.sent;
                localYarn = _context3.t0.join.call(
                  _context3.t0,
                  _context3.t1,
                  'yarn'
                );
                spawnArgs = ['upgrade'];

                if (dependencies.length) {
                  dependencies.forEach(function(dep) {
                    if (dep.version) {
                      spawnArgs.push(`${dep.name}@${dep.version}`);
                    } else {
                      spawnArgs.push(dep.name);
                    }
                  });
                }

                _context3.next = 9;
                return processes.spawn(localYarn, [].concat(spawnArgs, flags), {
                  cwd: pkg.dir,
                  pkg: pkg,
                  tty: true
                });

              case 9:
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

  return function upgrade(_x8) {
    return _ref3.apply(this, arguments);
  };
})());

var run = (exports.run = (function() {
  var _ref4 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee4(pkg, script) {
      var args =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var project, localYarn, localYarnRelative, spawnArgs;
      return _regenerator2.default.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.next = 2;
                return _Project2.default.init(pkg.dir);

              case 2:
                project = _context4.sent;
                _context4.t0 = path;
                _context4.next = 6;
                return getLocalBinPath();

              case 6:
                _context4.t1 = _context4.sent;
                localYarn = _context4.t0.join.call(
                  _context4.t0,
                  _context4.t1,
                  'yarn'
                );

                // We use a relative path because the absolute paths are very long and noisy in logs
                localYarnRelative = path.relative(pkg.dir, localYarn);
                spawnArgs = ['run', '-s', script];

                if (args.length) {
                  spawnArgs = spawnArgs.concat(args);
                }
                _context4.next = 13;
                return processes.spawn(localYarnRelative, spawnArgs, {
                  cwd: pkg.dir,
                  pkg: pkg,
                  tty: true,
                  useBasename: true
                });

              case 13:
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

  return function run(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
})());

var runIfExists = (exports.runIfExists = (function() {
  var _ref5 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee5(pkg, script) {
      var args =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var scriptExists;
      return _regenerator2.default.wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                _context5.next = 2;
                return getScript(pkg, script);

              case 2:
                scriptExists = _context5.sent;

                if (!scriptExists) {
                  _context5.next = 6;
                  break;
                }

                _context5.next = 6;
                return run(pkg, script, args);

              case 6:
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

  return function runIfExists(_x13, _x14) {
    return _ref5.apply(this, arguments);
  };
})());

var getScript = (exports.getScript = (function() {
  var _ref6 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee6(pkg, script) {
      var result, scripts, bins;
      return _regenerator2.default.wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                result = null;
                scripts = pkg.config.getScripts();

                if (scripts && scripts[script]) {
                  result = scripts[script];
                }

                if (result) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 6;
                return fs.readdirSafe(pkg.nodeModulesBin);

              case 6:
                bins = _context6.sent;

                if ((0, _arrayIncludes2.default)(bins, script)) {
                  result = script;
                }

              case 8:
                return _context6.abrupt('return', result);

              case 9:
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

  return function getScript(_x15, _x16) {
    return _ref6.apply(this, arguments);
  };
})());

var remove = (exports.remove = (function() {
  var _ref7 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee7(dependencies, cwd) {
      var localYarn;
      return _regenerator2.default.wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                _context7.t0 = path;
                _context7.next = 3;
                return getLocalBinPath();

              case 3:
                _context7.t1 = _context7.sent;
                localYarn = _context7.t0.join.call(
                  _context7.t0,
                  _context7.t1,
                  'yarn'
                );
                _context7.next = 7;
                return processes.spawn(
                  localYarn,
                  ['remove'].concat(dependencies),
                  {
                    cwd,
                    tty: true
                  }
                );

              case 7:
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

  return function remove(_x17, _x18) {
    return _ref7.apply(this, arguments);
  };
})());

var cliCommand = (exports.cliCommand = (function() {
  var _ref8 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee8(cwd) {
      var command =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var spawnArgs =
        arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var localYarn;
      return _regenerator2.default.wrap(
        function _callee8$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                _context8.t0 = path;
                _context8.next = 3;
                return getLocalBinPath();

              case 3:
                _context8.t1 = _context8.sent;
                localYarn = _context8.t0.join.call(
                  _context8.t0,
                  _context8.t1,
                  'yarn'
                );
                _context8.next = 7;
                return processes.spawn(localYarn, [command].concat(spawnArgs), {
                  cwd,
                  tty: true,
                  useBasename: true
                });

              case 7:
                return _context8.abrupt('return', _context8.sent);

              case 8:
              case 'end':
                return _context8.stop();
            }
          }
        },
        _callee8,
        this
      );
    })
  );

  return function cliCommand(_x21) {
    return _ref8.apply(this, arguments);
  };
})());

var info = (exports.info = (function() {
  var _ref9 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee9(cwd) {
      var spawnArgs =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var localYarn;
      return _regenerator2.default.wrap(
        function _callee9$(_context9) {
          while (1) {
            switch ((_context9.prev = _context9.next)) {
              case 0:
                _context9.t0 = path;
                _context9.next = 3;
                return getLocalBinPath();

              case 3:
                _context9.t1 = _context9.sent;
                localYarn = _context9.t0.join.call(
                  _context9.t0,
                  _context9.t1,
                  'yarn'
                );
                _context9.next = 7;
                return processes.spawn(localYarn, ['info'].concat(spawnArgs), {
                  cwd,
                  tty: true
                });

              case 7:
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

  return function info(_x23) {
    return _ref9.apply(this, arguments);
  };
})());

var userAgent = (exports.userAgent = (function() {
  var _ref10 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee10() {
      var localYarn, _ref11, yarnUserAgent;

      return _regenerator2.default.wrap(
        function _callee10$(_context10) {
          while (1) {
            switch ((_context10.prev = _context10.next)) {
              case 0:
                _context10.t0 = path;
                _context10.next = 3;
                return getLocalBinPath();

              case 3:
                _context10.t1 = _context10.sent;
                localYarn = _context10.t0.join.call(
                  _context10.t0,
                  _context10.t1,
                  'yarn'
                );
                _context10.next = 7;
                return processes.spawn(
                  localYarn,
                  ['config', 'get', 'user-agent'],
                  {
                    tty: false
                  }
                );

              case 7:
                _ref11 = _context10.sent;
                yarnUserAgent = _ref11.stdout;
                return _context10.abrupt(
                  'return',
                  yarnUserAgent.replace(/\n/g, '')
                );

              case 10:
              case 'end':
                return _context10.stop();
            }
          }
        },
        _callee10,
        this
      );
    })
  );

  return function userAgent() {
    return _ref10.apply(this, arguments);
  };
})());

var globalCli = (exports.globalCli = (function() {
  var _ref12 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee11() {
      var command =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var dependencies = arguments[1];
      var spawnArgs;
      return _regenerator2.default.wrap(
        function _callee11$(_context11) {
          while (1) {
            switch ((_context11.prev = _context11.next)) {
              case 0:
                spawnArgs = ['global', command];

                if (dependencies.length) {
                  _context11.next = 3;
                  break;
                }

                return _context11.abrupt('return');

              case 3:
                dependencies.forEach(function(dep) {
                  if (dep.version) {
                    spawnArgs.push(`${dep.name}@${dep.version}`);
                  } else {
                    spawnArgs.push(dep.name);
                  }
                });

                _context11.next = 6;
                return processes.spawn('yarn', spawnArgs, {
                  tty: true
                });

              case 6:
              case 'end':
                return _context11.stop();
            }
          }
        },
        _callee11,
        this
      );
    })
  );

  return function globalCli() {
    return _ref12.apply(this, arguments);
  };
})());

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

var _projectBinPath = require('project-bin-path');

var _projectBinPath2 = _interopRequireDefault(_projectBinPath);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _processes = require('./processes');

var processes = _interopRequireWildcard(_processes);

var _fs = require('../utils/fs');

var fs = _interopRequireWildcard(_fs);

var logger = _interopRequireWildcard(_fs);

var _constants = require('../constants');

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

function getLocalBinPath() {
  return (0, _projectBinPath2.default)(__dirname);
}

function depTypeToFlag(depType) {
  var flag = (0, _keys2.default)(_constants.DEPENDENCY_TYPE_FLAGS_MAP).find(
    function(key) {
      return _constants.DEPENDENCY_TYPE_FLAGS_MAP[key] === depType;
    }
  );

  return flag ? `--${flag}` : flag;
}
