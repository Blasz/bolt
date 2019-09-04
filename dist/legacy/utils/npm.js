'use strict';

exports.__esModule = true;
exports.cliCommand = exports.logout = exports.login = exports.infoAllow404 = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var infoAllow404 = (exports.infoAllow404 = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(pkgName) {
      var pkgInfo, output;
      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return info(pkgName);

              case 3:
                pkgInfo = _context2.sent;
                return _context2.abrupt('return', { published: true, pkgInfo });

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);
                output = JSON.parse(_context2.t0.stdout);

                if (!(output.error && output.error.code === 'E404')) {
                  _context2.next = 13;
                  break;
                }

                logger.warn(messages.npmInfo404(pkgName));
                return _context2.abrupt('return', {
                  published: false,
                  pkgInfo: {}
                });

              case 13:
                throw _context2.t0;

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        this,
        [[0, 7]]
      );
    })
  );

  return function infoAllow404(_x) {
    return _ref2.apply(this, arguments);
  };
})());

var login = (exports.login = (function() {
  var _ref6 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee6(cwd) {
      return _regenerator2.default.wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                _context6.next = 2;
                return processes.spawn('npm', ['login'], {
                  cwd,
                  tty: true
                });

              case 2:
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

  return function login(_x3) {
    return _ref6.apply(this, arguments);
  };
})());

var logout = (exports.logout = (function() {
  var _ref7 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee7(cwd) {
      return _regenerator2.default.wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                _context7.next = 2;
                return processes.spawn('npm', ['logout'], {
                  cwd,
                  tty: true
                });

              case 2:
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

  return function logout(_x4) {
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
      return _regenerator2.default.wrap(
        function _callee8$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                _context8.next = 2;
                return processes.spawn('npm', [command].concat(spawnArgs), {
                  cwd,
                  tty: true
                });

              case 2:
                return _context8.abrupt('return', _context8.sent);

              case 3:
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

  return function cliCommand(_x7) {
    return _ref8.apply(this, arguments);
  };
})());

exports.info = info;
exports.publish = publish;
exports.addTag = addTag;
exports.removeTag = removeTag;

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _processes = require('./processes');

var processes = _interopRequireWildcard(_processes);

var _pLimit = require('p-limit');

var _pLimit2 = _interopRequireDefault(_pLimit);

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

var npmRequestLimit = (0, _pLimit2.default)(40);

function getCorrectRegistry() {
  var registry =
    process.env.npm_config_registry === 'https://registry.yarnpkg.com'
      ? undefined
      : process.env.npm_config_registry;
  return registry;
}

function info(pkgName) {
  var _this = this;

  return npmRequestLimit(
    (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee() {
        var envOverride, result;
        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  logger.info(messages.npmInfo(pkgName));

                  // Due to a couple of issues with yarnpkg, we also want to override the npm registry when doing
                  // npm info.
                  // Issues: We sometimes get back cached responses, i.e old data about packages which causes
                  // `publish` to behave incorrectly. It can also cause issues when publishing private packages
                  // as they will always give a 404, which will tell `publish` to always try to publish.
                  // See: https://github.com/yarnpkg/yarn/issues/2935#issuecomment-355292633
                  envOverride = {
                    npm_config_registry: getCorrectRegistry()
                  };
                  _context.next = 4;
                  return processes.spawn('npm', ['info', pkgName, '--json'], {
                    silent: true,
                    env: (0, _assign2.default)({}, process.env, envOverride)
                  });

                case 4:
                  result = _context.sent;
                  return _context.abrupt('return', JSON.parse(result.stdout));

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          },
          _callee,
          _this
        );
      })
    )
  );
}

function publish(pkgName) {
  var _this2 = this;

  var opts =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return npmRequestLimit(
    (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee3() {
        var publishFlags, envOverride;
        return _regenerator2.default.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  logger.info(messages.npmPublish(pkgName));
                  publishFlags = opts.access ? ['--access', opts.access] : [];
                  _context3.prev = 2;

                  // Due to a super annoying issue in yarn, we have to manually override this env variable
                  // See: https://github.com/yarnpkg/yarn/issues/2935#issuecomment-355292633
                  envOverride = {
                    npm_config_registry: getCorrectRegistry()
                  };
                  _context3.next = 6;
                  return processes.spawn(
                    'npm',
                    ['publish'].concat(publishFlags),
                    {
                      cwd: opts.cwd,
                      env: (0, _assign2.default)({}, process.env, envOverride)
                    }
                  );

                case 6:
                  return _context3.abrupt('return', { published: true });

                case 9:
                  _context3.prev = 9;
                  _context3.t0 = _context3['catch'](2);
                  return _context3.abrupt('return', { published: false });

                case 12:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          _this2,
          [[2, 9]]
        );
      })
    )
  );
}

function addTag(pkgName, pkgVersion, tag) {
  var _this3 = this;

  return npmRequestLimit(
    (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee4() {
        var pkgStr, result;
        return _regenerator2.default.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  logger.info(messages.npmDistTagAdd(pkgName, pkgVersion, tag));
                  pkgStr = `${pkgName}@${pkgVersion}`;
                  _context4.next = 4;
                  return processes.spawn('npm', [
                    'dist-tag',
                    'add',
                    pkgStr,
                    tag
                  ]);

                case 4:
                  result = _context4.sent;

                  if (!result.stderr) {
                    _context4.next = 7;
                    break;
                  }

                  throw new _errors.BoltError(
                    `Could not add tag ${tag} to ${pkgStr} as one already exists`
                  );

                case 7:
                  return _context4.abrupt('return', result);

                case 8:
                case 'end':
                  return _context4.stop();
              }
            }
          },
          _callee4,
          _this3
        );
      })
    )
  );
}

function removeTag(pkgName, tag) {
  var _this4 = this;

  return npmRequestLimit(
    (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee5() {
        return _regenerator2.default.wrap(
          function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  logger.info(messages.npmDistTagRm(pkgName, tag));

                  _context5.prev = 1;
                  _context5.next = 4;
                  return processes.spawn(
                    'npm',
                    ['dist-tag', 'rm', pkgName, tag],
                    {
                      silent: true
                    }
                  );

                case 4:
                  return _context5.abrupt('return', _context5.sent);

                case 7:
                  _context5.prev = 7;
                  _context5.t0 = _context5['catch'](1);

                  if (
                    !(
                      _context5.t0.code === 1 &&
                      _context5.t0.stderr.includes('is not a dist-tag on')
                    )
                  ) {
                    _context5.next = 14;
                    break;
                  }

                  logger.warn(messages.notDistTagFound(tag, pkgName));
                  return _context5.abrupt('return');

                case 14:
                  if (
                    !(
                      _context5.t0.stderr &&
                      _context5.t0.stderr.startsWith('npm ERR! code E404')
                    )
                  ) {
                    _context5.next = 17;
                    break;
                  }

                  // the package does not exist yet, warn but dont error
                  logger.warn(messages.npmPackageCouldNotBeFound(pkgName));
                  return _context5.abrupt('return');

                case 17:
                  throw _context5.t0;

                case 18:
                case 'end':
                  return _context5.stop();
              }
            }
          },
          _callee5,
          _this4,
          [[1, 7]]
        );
      })
    )
  );
}
