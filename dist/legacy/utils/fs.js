'use strict';

exports.__esModule = true;
exports.symlinkExists = exports.dirExists = exports.readlink = exports.readdirSafe = exports.readdir = exports.symlink = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var cmdShim = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(src, dest) {
      var currentShimTarget;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.t0 = _path2.default;
                _context.t1 = _path2.default.dirname(src);
                _context.next = 4;
                return readCmdShim(src);

              case 4:
                _context.t2 = _context.sent;
                currentShimTarget = _context.t0.resolve.call(
                  _context.t0,
                  _context.t1,
                  _context.t2
                );
                _context.next = 8;
                return (0, _typeablePromisify2.default)(function(cb) {
                  return (0,
                  _cmdShim3.default)(currentShimTarget, stripExtension(dest), cb);
                });

              case 8:
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

  return function cmdShim(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var createSymbolicLink = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(src, dest, type) {
      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return lstat(dest);

              case 3:
                _context2.next = 5;
                return rimraf(dest);

              case 5:
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

                if (!(_context2.t0.code === 'EPERM')) {
                  _context2.next = 11;
                  break;
                }

                throw _context2.t0;

              case 11:
                _context2.next = 13;
                return _symlink(src, dest, type);

              case 13:
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

  return function createSymbolicLink(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})();

var createPosixSymlink = (function() {
  var _ref3 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee3(origin, dest, type) {
      var src;
      return _regenerator2.default.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                if (type === 'exec') {
                  type = 'file';
                }

                src = _path2.default.relative(
                  _path2.default.dirname(dest),
                  origin
                );
                _context3.next = 4;
                return createSymbolicLink(src, dest, type);

              case 4:
                return _context3.abrupt('return', _context3.sent);

              case 5:
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

  return function createPosixSymlink(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})();

var createWindowsSymlink = (function() {
  var _ref4 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee4(src, dest, type) {
      return _regenerator2.default.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                if (!(type === 'exec')) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 3;
                return cmdShim(src, dest);

              case 3:
                return _context4.abrupt('return', _context4.sent);

              case 6:
                _context4.next = 8;
                return createSymbolicLink(src, dest, type);

              case 8:
                return _context4.abrupt('return', _context4.sent);

              case 9:
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

  return function createWindowsSymlink(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
})();

var symlink = (exports.symlink = (function() {
  var _ref5 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee5(src, dest, type) {
      return _regenerator2.default.wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                if (!dest.includes(_path2.default.sep)) {
                  _context5.next = 3;
                  break;
                }

                _context5.next = 3;
                return mkdirp(_path2.default.dirname(dest));

              case 3:
                if (!(process.platform === 'win32')) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 6;
                return createWindowsSymlink(src, dest, type);

              case 6:
                return _context5.abrupt('return', _context5.sent);

              case 9:
                _context5.next = 11;
                return createPosixSymlink(src, dest, type);

              case 11:
                return _context5.abrupt('return', _context5.sent);

              case 12:
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

  return function symlink(_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
})());

var readdir = (exports.readdir = (function() {
  var _ref6 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee6(dir) {
      return _regenerator2.default.wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                return _context6.abrupt(
                  'return',
                  (0, _typeablePromisify2.default)(function(cb) {
                    return _fs2.default.readdir(dir, cb);
                  })
                );

              case 1:
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

  return function readdir(_x15) {
    return _ref6.apply(this, arguments);
  };
})());

// Return an empty array if a directory doesnt exist (but still throw if errof if dir is a file)

var readdirSafe = (exports.readdirSafe = (function() {
  var _ref7 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee7(dir) {
      return _regenerator2.default.wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                return _context7.abrupt(
                  'return',
                  stat(dir)
                    .catch(function(err) {
                      return _promise2.default.resolve([]);
                    })
                    .then(function(statsOrArray) {
                      if (statsOrArray instanceof Array) return statsOrArray;
                      if (!statsOrArray.isDirectory())
                        throw new Error(dir + ' is not a directory');
                      return readdir(dir);
                    })
                );

              case 1:
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

  return function readdirSafe(_x16) {
    return _ref7.apply(this, arguments);
  };
})());

// Copied from:
// https://github.com/npm/npm/blob/d081cc6c8d73f2aa698aab36605377c95e916224/lib/utils/gently-rm.js#L280-L297
var readlink = (exports.readlink = (function() {
  var _ref8 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee8(filePath) {
      var stat, result;
      return _regenerator2.default.wrap(
        function _callee8$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                _context8.next = 2;
                return lstat(filePath);

              case 2:
                stat = _context8.sent;
                result = null;

                if (!stat.isSymbolicLink()) {
                  _context8.next = 10;
                  break;
                }

                _context8.next = 7;
                return _readlink(filePath);

              case 7:
                result = _context8.sent;
                _context8.next = 20;
                break;

              case 10:
                _context8.prev = 10;
                _context8.next = 13;
                return readCmdShim(filePath);

              case 13:
                result = _context8.sent;
                _context8.next = 20;
                break;

              case 16:
                _context8.prev = 16;
                _context8.t0 = _context8['catch'](10);

                if (
                  !(
                    _context8.t0.code !== 'ENOTASHIM' &&
                    _context8.t0.code !== 'EISDIR'
                  )
                ) {
                  _context8.next = 20;
                  break;
                }

                throw _context8.t0;

              case 20:
                return _context8.abrupt('return', result);

              case 21:
              case 'end':
                return _context8.stop();
            }
          }
        },
        _callee8,
        this,
        [[10, 16]]
      );
    })
  );

  return function readlink(_x17) {
    return _ref8.apply(this, arguments);
  };
})());

var dirExists = (exports.dirExists = (function() {
  var _ref9 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee9(dir) {
      var _stat;

      return _regenerator2.default.wrap(
        function _callee9$(_context9) {
          while (1) {
            switch ((_context9.prev = _context9.next)) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return stat(dir);

              case 3:
                _stat = _context9.sent;
                return _context9.abrupt('return', _stat.isDirectory());

              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9['catch'](0);
                return _context9.abrupt('return', false);

              case 10:
              case 'end':
                return _context9.stop();
            }
          }
        },
        _callee9,
        this,
        [[0, 7]]
      );
    })
  );

  return function dirExists(_x18) {
    return _ref9.apply(this, arguments);
  };
})());

var symlinkExists = (exports.symlinkExists = (function() {
  var _ref10 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee10(filePath) {
      var _stat2;

      return _regenerator2.default.wrap(
        function _callee10$(_context10) {
          while (1) {
            switch ((_context10.prev = _context10.next)) {
              case 0:
                _context10.prev = 0;
                _context10.next = 3;
                return lstat(filePath);

              case 3:
                _stat2 = _context10.sent;
                return _context10.abrupt('return', _stat2.isSymbolicLink());

              case 7:
                _context10.prev = 7;
                _context10.t0 = _context10['catch'](0);
                return _context10.abrupt('return', false);

              case 10:
              case 'end':
                return _context10.stop();
            }
          }
        },
        _callee10,
        this,
        [[0, 7]]
      );
    })
  );

  return function symlinkExists(_x19) {
    return _ref10.apply(this, arguments);
  };
})());

exports.readFile = readFile;
exports.writeFile = writeFile;
exports.mkdirp = mkdirp;
exports.rimraf = rimraf;
exports.stat = stat;
exports.lstat = lstat;
exports.realpath = realpath;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cmdShim2 = require('cmd-shim');

var _cmdShim3 = _interopRequireDefault(_cmdShim2);

var _readCmdShim2 = require('read-cmd-shim');

var _readCmdShim3 = _interopRequireDefault(_readCmdShim2);

var _typeablePromisify = require('typeable-promisify');

var _typeablePromisify2 = _interopRequireDefault(_typeablePromisify);

var _makeDir = require('make-dir');

var _makeDir2 = _interopRequireDefault(_makeDir);

var _rimraf2 = require('rimraf');

var _rimraf3 = _interopRequireDefault(_rimraf2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function readFile(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.readFile(filePath, cb);
  });
} // Parts of this source are modified from npm and lerna:
// npm: https://github.com/npm/npm/blob/master/LICENSE
// lerna: https://github.com/lerna/lerna/blob/master/LICENSE

function writeFile(filePath, fileContents) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.writeFile(filePath, fileContents, cb);
  });
}

function mkdirp(filePath) {
  return (0, _makeDir2.default)(filePath);
}

function rimraf(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return (0, _rimraf3.default)(filePath, cb);
  });
}

function stat(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.stat(filePath, cb);
  });
}

function lstat(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.lstat(filePath, cb);
  });
}

function unlink(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.unlink(filePath, cb);
  });
}

function realpath(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.realpath(filePath, cb);
  });
}

function _symlink(src, dest, type) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.symlink(src, dest, type, cb);
  });
}

function stripExtension(filePath) {
  return _path2.default.join(
    _path2.default.dirname(filePath),
    _path2.default.basename(filePath, _path2.default.extname(filePath))
  );
}

function readCmdShim(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return (0, _readCmdShim3.default)(filePath, cb);
  });
}

function _readlink(filePath) {
  return (0, _typeablePromisify2.default)(function(cb) {
    return _fs2.default.readlink(filePath, cb);
  });
}
