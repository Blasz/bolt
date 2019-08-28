'use strict';

exports.__esModule = true;
exports.getDiffForPathSinceCommit = exports.MAGIC_EMPTY_STATE_HASH = exports.showFileAtCommit = exports.getCommitParent = exports.getCommitsToFile = exports.removeTag = exports.addTag = exports.listTags = exports.getAllCommits = exports.commit = exports.addFiles = exports.addAll = exports.status = exports.getRootDirectory = exports.initRepository = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var initRepository = (exports.initRepository = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return git(['init'], { cwd: opts.cwd });

              case 2:
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

  return function initRepository(_x) {
    return _ref.apply(this, arguments);
  };
})());

var getRootDirectory = (exports.getRootDirectory = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(opts) {
      var _ref3, stdout;

      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return git(['rev-parse', '--show-toplevel'], {
                  cwd: opts.cwd
                });

              case 3:
                _ref3 = _context2.sent;
                stdout = _ref3.stdout;
                return _context2.abrupt('return', stdout.trim());

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2['catch'](0);

                if (isGitFatalError(_context2.t0)) {
                  _context2.next = 12;
                  break;
                }

                throw _context2.t0;

              case 12:
                return _context2.abrupt('return', null);

              case 13:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        this,
        [[0, 8]]
      );
    })
  );

  return function getRootDirectory(_x2) {
    return _ref2.apply(this, arguments);
  };
})());

var status = (exports.status = (function() {
  var _ref4 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee3(opts) {
      var _ref5, stdout;

      return _regenerator2.default.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                _context3.next = 2;
                return git(['status', '--porcelain'], {
                  cwd: opts.cwd
                });

              case 2:
                _ref5 = _context3.sent;
                stdout = _ref5.stdout;
                return _context3.abrupt('return', stdout.trim());

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

  return function status(_x3) {
    return _ref4.apply(this, arguments);
  };
})());

var addAll = (exports.addAll = (function() {
  var _ref6 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee4(opts) {
      return _regenerator2.default.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                _context4.next = 2;
                return git(['add', '-A'], { cwd: opts.cwd });

              case 2:
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

  return function addAll(_x4) {
    return _ref6.apply(this, arguments);
  };
})());

var addFiles = (exports.addFiles = (function() {
  var _ref7 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee5(filePaths, opts) {
      var gitPaths;
      return _regenerator2.default.wrap(
        function _callee5$(_context5) {
          while (1) {
            switch ((_context5.prev = _context5.next)) {
              case 0:
                gitPaths = filePaths.map(function(filePath) {
                  return toGitPath(opts.cwd, filePath);
                });
                _context5.next = 3;
                return git(['add'].concat(gitPaths), { cwd: opts.cwd });

              case 3:
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

  return function addFiles(_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
})());

var commit = (exports.commit = (function() {
  var _ref8 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee6(message, opts) {
      var args;
      return _regenerator2.default.wrap(
        function _callee6$(_context6) {
          while (1) {
            switch ((_context6.prev = _context6.next)) {
              case 0:
                args = ['commit'];

                if (!message.includes(os.EOL)) {
                  _context6.next = 9;
                  break;
                }

                _context6.t0 = args;
                _context6.next = 5;
                return (0, _tempWrite2.default)(message, 'bolt-commit.txt');

              case 5:
                _context6.t1 = _context6.sent;

                _context6.t0.push.call(_context6.t0, '-F', _context6.t1);

                _context6.next = 10;
                break;

              case 9:
                args.push('-m', message);

              case 10:
                _context6.next = 12;
                return git(args, { cwd: opts.cwd });

              case 12:
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

  return function commit(_x7, _x8) {
    return _ref8.apply(this, arguments);
  };
})());

var getAllCommits = (exports.getAllCommits = (function() {
  var _ref9 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee7(opts) {
      var _ref10, stdout;

      return _regenerator2.default.wrap(
        function _callee7$(_context7) {
          while (1) {
            switch ((_context7.prev = _context7.next)) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return git(['log', '--pretty=format:%H %s'], {
                  cwd: opts.cwd
                });

              case 3:
                _ref10 = _context7.sent;
                stdout = _ref10.stdout;
                return _context7.abrupt(
                  'return',
                  formattedLogLinesToArray(stdout.trim())
                );

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7['catch'](0);

                if (isGitFatalError(_context7.t0)) {
                  _context7.next = 12;
                  break;
                }

                throw _context7.t0;

              case 12:
                return _context7.abrupt('return', []);

              case 13:
              case 'end':
                return _context7.stop();
            }
          }
        },
        _callee7,
        this,
        [[0, 8]]
      );
    })
  );

  return function getAllCommits(_x9) {
    return _ref9.apply(this, arguments);
  };
})());

var listTags = (exports.listTags = (function() {
  var _ref11 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee8(opts) {
      var _ref12, stdout;

      return _regenerator2.default.wrap(
        function _callee8$(_context8) {
          while (1) {
            switch ((_context8.prev = _context8.next)) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return git(['tag'], { cwd: opts.cwd });

              case 3:
                _ref12 = _context8.sent;
                stdout = _ref12.stdout;
                return _context8.abrupt('return', linesToArray(stdout.trim()));

              case 8:
                _context8.prev = 8;
                _context8.t0 = _context8['catch'](0);

                if (isGitFatalError(_context8.t0)) {
                  _context8.next = 12;
                  break;
                }

                throw _context8.t0;

              case 12:
                return _context8.abrupt('return', []);

              case 13:
              case 'end':
                return _context8.stop();
            }
          }
        },
        _callee8,
        this,
        [[0, 8]]
      );
    })
  );

  return function listTags(_x10) {
    return _ref11.apply(this, arguments);
  };
})());

var addTag = (exports.addTag = (function() {
  var _ref13 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee9(tagName, opts) {
      return _regenerator2.default.wrap(
        function _callee9$(_context9) {
          while (1) {
            switch ((_context9.prev = _context9.next)) {
              case 0:
                _context9.next = 2;
                return git(['tag', tagName, '-m', tagName], { cwd: opts.cwd });

              case 2:
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

  return function addTag(_x11, _x12) {
    return _ref13.apply(this, arguments);
  };
})());

var removeTag = (exports.removeTag = (function() {
  var _ref14 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee10(tagName, opts) {
      return _regenerator2.default.wrap(
        function _callee10$(_context10) {
          while (1) {
            switch ((_context10.prev = _context10.next)) {
              case 0:
                _context10.next = 2;
                return git(['tag', '-d', tagName], { cwd: opts.cwd });

              case 2:
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

  return function removeTag(_x13, _x14) {
    return _ref14.apply(this, arguments);
  };
})());

var getCommitsToFile = (exports.getCommitsToFile = (function() {
  var _ref15 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee11(filePath, opts) {
      var gitPath, _ref16, stdout;

      return _regenerator2.default.wrap(
        function _callee11$(_context11) {
          while (1) {
            switch ((_context11.prev = _context11.next)) {
              case 0:
                gitPath = toGitPath(opts.cwd, filePath);
                _context11.prev = 1;
                _context11.next = 4;
                return git(
                  ['log', GIT_LOG_LINE_FORMAT_FLAG, '--follow', gitPath],
                  {
                    cwd: opts.cwd
                  }
                );

              case 4:
                _ref16 = _context11.sent;
                stdout = _ref16.stdout;
                return _context11.abrupt(
                  'return',
                  formattedLogLinesToArray(stdout.trim())
                );

              case 9:
                _context11.prev = 9;
                _context11.t0 = _context11['catch'](1);

                if (isGitFatalError(_context11.t0)) {
                  _context11.next = 13;
                  break;
                }

                throw _context11.t0;

              case 13:
                return _context11.abrupt('return', []);

              case 14:
              case 'end':
                return _context11.stop();
            }
          }
        },
        _callee11,
        this,
        [[1, 9]]
      );
    })
  );

  return function getCommitsToFile(_x15, _x16) {
    return _ref15.apply(this, arguments);
  };
})());

var getCommitParent = (exports.getCommitParent = (function() {
  var _ref17 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee12(commitHash, opts) {
      var _ref18, stdout;

      return _regenerator2.default.wrap(
        function _callee12$(_context12) {
          while (1) {
            switch ((_context12.prev = _context12.next)) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return git(['rev-parse', `${commitHash}^`], {
                  cwd: opts.cwd
                });

              case 3:
                _ref18 = _context12.sent;
                stdout = _ref18.stdout;
                return _context12.abrupt('return', stdout.trim());

              case 8:
                _context12.prev = 8;
                _context12.t0 = _context12['catch'](0);

                if (isGitFatalError(_context12.t0)) {
                  _context12.next = 12;
                  break;
                }

                throw _context12.t0;

              case 12:
                return _context12.abrupt('return', null);

              case 13:
              case 'end':
                return _context12.stop();
            }
          }
        },
        _callee12,
        this,
        [[0, 8]]
      );
    })
  );

  return function getCommitParent(_x17, _x18) {
    return _ref17.apply(this, arguments);
  };
})());

var showFileAtCommit = (exports.showFileAtCommit = (function() {
  var _ref19 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee13(filePath, commitHash, opts) {
      var gitPath, _ref20, stdout;

      return _regenerator2.default.wrap(
        function _callee13$(_context13) {
          while (1) {
            switch ((_context13.prev = _context13.next)) {
              case 0:
                gitPath = toGitPath(opts.cwd, filePath);
                _context13.next = 3;
                return git(['show', `${commitHash}:${gitPath}`], {
                  cwd: opts.cwd
                });

              case 3:
                _ref20 = _context13.sent;
                stdout = _ref20.stdout;
                return _context13.abrupt('return', stdout);

              case 6:
              case 'end':
                return _context13.stop();
            }
          }
        },
        _callee13,
        this
      );
    })
  );

  return function showFileAtCommit(_x19, _x20, _x21) {
    return _ref19.apply(this, arguments);
  };
})());

var getDiffForPathSinceCommit = (exports.getDiffForPathSinceCommit = (function() {
  var _ref21 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee14(filePath, commitHash, opts) {
      var gitPath, _ref22, stdout;

      return _regenerator2.default.wrap(
        function _callee14$(_context14) {
          while (1) {
            switch ((_context14.prev = _context14.next)) {
              case 0:
                gitPath = toGitPath(opts.cwd, filePath);
                _context14.next = 3;
                return git(
                  ['diff', commitHash, '--color=always', '--', filePath],
                  {
                    cwd: opts.cwd
                  }
                );

              case 3:
                _ref22 = _context14.sent;
                stdout = _ref22.stdout;
                return _context14.abrupt('return', stdout.trim());

              case 6:
              case 'end':
                return _context14.stop();
            }
          }
        },
        _callee14,
        this
      );
    })
  );

  return function getDiffForPathSinceCommit(_x22, _x23, _x24) {
    return _ref21.apply(this, arguments);
  };
})());

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _processes = require('./processes');

var processes = _interopRequireWildcard(_processes);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _pLimit = require('p-limit');

var _pLimit2 = _interopRequireDefault(_pLimit);

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

var _tempWrite = require('temp-write');

var _tempWrite2 = _interopRequireDefault(_tempWrite);

var _os = require('os');

var os = _interopRequireWildcard(_os);

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

// We should never run more than one git command at a time, git enforces this
// for a lot of commands and will error.
var gitCommandLimit = (0, _pLimit2.default)(1); // Parts of this source are modified from lerna:
// lerna: https://github.com/lerna/lerna/blob/master/LICENSE

var GIT_LOG_LINE_FORMAT_FLAG = '--pretty=format:%H %s';
var GIT_LOG_LINE_FORMAT_SPLITTER = /^([a-zA-Z0-9]+) (.*)/;

function git(args, opts) {
  return gitCommandLimit(function() {
    return processes.spawn(
      'git',
      args,
      (0, _extends3.default)({ silent: true }, opts)
    );
  });
}

function toGitPath(cwd, filePath) {
  return (0, _slash2.default)(path.relative(cwd, filePath));
}

function isGitFatalError(err) {
  return err.code === 128;
}

function linesToArray(lines) {
  return lines === '' ? [] : lines.split(os.EOL);
}

function formattedLogLinesToArray(lines) {
  return linesToArray(lines).map(function(line) {
    var _GIT_LOG_LINE_FORMAT_ = GIT_LOG_LINE_FORMAT_SPLITTER.exec(line),
      hash = _GIT_LOG_LINE_FORMAT_[1],
      message = _GIT_LOG_LINE_FORMAT_[2];

    return { hash, message };
  });
}

var MAGIC_EMPTY_STATE_HASH = (exports.MAGIC_EMPTY_STATE_HASH =
  '4b825dc642cb6eb9a060e54bf8d69288fbee4904');
