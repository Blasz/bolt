'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getPackageStack = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(cwd) {
      var stack, searching, filePath, config;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                stack = [];
                searching = cwd;

              case 2:
                if (!searching) {
                  _context.next = 17;
                  break;
                }

                _context.next = 5;
                return Config.findConfigFile(searching);

              case 5:
                filePath = _context.sent;

                if (!filePath) {
                  _context.next = 14;
                  break;
                }

                _context.next = 9;
                return Config.init(filePath);

              case 9:
                config = _context.sent;

                stack.unshift({ filePath, config });
                searching = path.dirname(path.dirname(filePath));
                _context.next = 15;
                break;

              case 14:
                searching = null;

              case 15:
                _context.next = 2;
                break;

              case 17:
                return _context.abrupt('return', stack);

              case 18:
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

  return function getPackageStack(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _pkgUp = require('pkg-up');

var _pkgUp2 = _interopRequireDefault(_pkgUp);

var _detectIndent = require('detect-indent');

var _detectIndent2 = _interopRequireDefault(_detectIndent);

var _detectNewline = require('detect-newline');

var _detectNewline2 = _interopRequireDefault(_detectNewline);

var _parseJson = require('parse-json');

var _parseJson2 = _interopRequireDefault(_parseJson);

var _fs = require('./utils/fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _globs = require('./utils/globs');

var globs = _interopRequireWildcard(_globs);

var _logger = require('./utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./utils/messages');

var messages = _interopRequireWildcard(_messages);

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

function toArrayOfStrings(value, message) {
  if (!Array.isArray(value)) {
    throw new _errors.BoltError(message);
  }

  return value.map(function(item) {
    if (typeof item !== 'string') {
      throw new _errors.BoltError(message);
    } else {
      return item;
    }
  });
}

function toObject(value, message) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new _errors.BoltError(message);
  } else {
    return value;
  }
}

function toObjectOfStrings(value, message) {
  var safeRef = toObject(value, message);
  var safeCopy = {};

  (0, _keys2.default)(safeRef).forEach(function(k) {
    if (typeof safeRef[k] !== 'string') {
      throw new _errors.BoltError(message);
    } else {
      safeCopy[k] = safeRef[k];
    }
  });

  return safeCopy;
}

var Config = (function() {
  function Config(filePath, fileContents) {
    (0, _classCallCheck3.default)(this, Config);

    this.filePath = filePath;
    this.fileContents = fileContents;
    try {
      this.indent = (0, _detectIndent2.default)(fileContents).indent || '  ';
      this.newline =
        (0, _detectNewline2.default)(fileContents) || _os2.default.EOL;
      this.json = (0, _parseJson2.default)(fileContents);
    } catch (e) {
      if (e.name === 'JSONError') {
        logger.error(messages.errorParsingJSON(filePath), {
          emoji: '💥',
          prefix: false
        });
      }
      throw e;
    }
  }

  Config.findConfigFile = (function() {
    var _ref2 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee2(filePath) {
        return _regenerator2.default.wrap(
          function _callee2$(_context2) {
            while (1) {
              switch ((_context2.prev = _context2.next)) {
                case 0:
                  _context2.next = 2;
                  return (0, _pkgUp2.default)(filePath);

                case 2:
                  return _context2.abrupt('return', _context2.sent);

                case 3:
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

    function findConfigFile(_x2) {
      return _ref2.apply(this, arguments);
    }

    return findConfigFile;
  })();

  Config.init = (function() {
    var _ref3 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee3(filePath) {
        var fileContents;
        return _regenerator2.default.wrap(
          function _callee3$(_context3) {
            while (1) {
              switch ((_context3.prev = _context3.next)) {
                case 0:
                  fileContents = void 0;
                  _context3.prev = 1;
                  _context3.next = 4;
                  return fs.readFile(filePath);

                case 4:
                  fileContents = _context3.sent;
                  _context3.next = 12;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3['catch'](1);

                  if (!(_context3.t0.code === 'ENOENT')) {
                    _context3.next = 11;
                    break;
                  }

                  throw new _errors.BoltError(
                    messages.cannotInitConfigMissingPkgJSON(filePath)
                  );

                case 11:
                  throw _context3.t0;

                case 12:
                  return _context3.abrupt(
                    'return',
                    new Config(filePath, fileContents.toString())
                  );

                case 13:
                case 'end':
                  return _context3.stop();
              }
            }
          },
          _callee3,
          this,
          [[1, 7]]
        );
      })
    );

    function init(_x3) {
      return _ref3.apply(this, arguments);
    }

    return init;
  })();

  Config.prototype.write = (function() {
    var _ref4 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee4(json) {
        var fileContents;
        return _regenerator2.default.wrap(
          function _callee4$(_context4) {
            while (1) {
              switch ((_context4.prev = _context4.next)) {
                case 0:
                  fileContents =
                    (0, _stringify2.default)(json, null, this.indent).replace(
                      /\n/g,
                      this.newline
                    ) + this.newline;
                  _context4.next = 3;
                  return fs.writeFile(this.filePath, fileContents);

                case 3:
                  this.fileContents = fileContents;
                  this.json = json;

                case 5:
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

    function write(_x4) {
      return _ref4.apply(this, arguments);
    }

    return write;
  })();

  Config.getProjectConfig = (function() {
    var _ref5 = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee5(cwd) {
        var stack, highest, matches, _loop;

        return _regenerator2.default.wrap(
          function _callee5$(_context5) {
            while (1) {
              switch ((_context5.prev = _context5.next)) {
                case 0:
                  _context5.next = 2;
                  return getPackageStack(cwd);

                case 2:
                  stack = _context5.sent;

                  if (!(stack.length === 0)) {
                    _context5.next = 5;
                    break;
                  }

                  return _context5.abrupt('return', null);

                case 5:
                  highest = stack.pop();
                  matches = [highest];

                  _loop = function _loop() {
                    var current = stack.pop();
                    var patterns = current.config.getWorkspaces();

                    if (patterns) {
                      var filePaths = matches.map(function(match) {
                        return path.relative(
                          path.dirname(current.filePath),
                          path.dirname(match.filePath)
                        );
                      });

                      var found = globs.matchWorkspaces(filePaths, patterns);

                      if (found.length) {
                        matches.push(current);
                        highest = current;
                      }
                    }
                  };

                  while (stack.length) {
                    _loop();
                  }

                  return _context5.abrupt('return', highest.filePath);

                case 10:
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

    function getProjectConfig(_x5) {
      return _ref5.apply(this, arguments);
    }

    return getProjectConfig;
  })();

  Config.prototype.getConfig = function getConfig() {
    if (this.invalid) {
      throw new _errors.BoltError(
        `You need to refresh the Config object for ${this.filePath}`
      );
    }
    var config = this.json;

    if (
      typeof config !== 'object' ||
      config === null ||
      Array.isArray(config)
    ) {
      throw new _errors.BoltError(
        `package.json must be an object. See: "${this.filePath}"`
      );
    }

    return config;
  };

  Config.prototype.invalidate = function invalidate() {
    this.invalid = true;
  };

  Config.prototype.getDescriptor = function getDescriptor() {
    if (this.json && typeof this.json.name === 'string') {
      return this.json.name;
    } else {
      return this.filePath;
    }
  };

  Config.prototype.getName = function getName() {
    var config = this.getConfig();
    var name = config.name;
    if (typeof name !== 'string') {
      throw new _errors.BoltError(
        `package.json#name must be a string. See "${this.filePath}"`
      );
    }
    return name;
  };

  Config.prototype.getVersion = function getVersion() {
    var config = this.getConfig();
    var version = config.version;
    if (typeof version !== 'string') {
      throw new _errors.BoltError(
        `package.json#version must be a string. See "${this.filePath}"`
      );
    }
    return version;
  };

  Config.prototype.getPrivate = function getPrivate() {
    var config = this.getConfig();
    var priv = config.private;
    if (typeof priv !== 'undefined' && typeof priv !== 'boolean') {
      throw new _errors.BoltError(
        `package.json#private must be a boolean. See "${this.filePath}"`
      );
    }
    return priv;
  };

  Config.prototype.getBoltConfig = function getBoltConfig() {
    var config = this.getConfig();
    var boltConfig = config.bolt;
    if (typeof boltConfig === 'undefined') return;
    return toObject(
      boltConfig,
      `package.json#bolt must be an object. See "${this.filePath}"`
    );
  };

  Config.prototype.getBoltConfigVersion = function getBoltConfigVersion() {
    var config = this.getBoltConfig();
    var boltVersion = config && config.version;
    if (typeof boltVersion === 'string') {
      return boltVersion;
    }
    return;
  };

  Config.prototype.getWorkspaces = function getWorkspaces() {
    var boltConfig = this.getBoltConfig();
    if (typeof boltConfig === 'undefined') return;
    var workspaces = boltConfig.workspaces;
    if (typeof workspaces === 'undefined') return;
    return toArrayOfStrings(
      workspaces,
      `package.json#bolt.workspaces must be an array of globs. See "${this.filePath}"`
    );
  };

  Config.prototype.getDeps = function getDeps(depType) {
    var config = this.getConfig();
    var deps = config[depType];
    if (typeof deps === 'undefined') return;
    return toObjectOfStrings(
      deps,
      `package.json#${depType} must be an object of strings. See "${this.filePath}"`
    );
  };

  Config.prototype.getScripts = function getScripts() {
    var config = this.getConfig();
    var scripts = config.scripts;
    if (typeof scripts === 'undefined') return;
    return toObjectOfStrings(
      scripts,
      `package.json#scripts must be an object of strings. See "${this.filePath}"`
    );
  };

  Config.prototype.getBin = function getBin() {
    var config = this.getConfig();
    var bin = config.bin;
    if (typeof bin === 'undefined') return;
    if (typeof bin === 'string') return bin;
    return toObjectOfStrings(
      bin,
      `package.json#bin must be an object of strings or a string. See "${this.filePath}"`
    );
  };

  return Config;
})();

exports.default = Config;
