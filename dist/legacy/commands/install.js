'use strict';

exports.__esModule = true;
exports.install = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var install = (exports.install = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd,
        project,
        packages,
        projectIsValid,
        _iterator,
        _isArray,
        _i,
        _ref2,
        pkg,
        dependencies;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                _context.next = 3;
                return _Project2.default.init(cwd);

              case 3:
                project = _context.sent;
                _context.next = 6;
                return project.getPackages();

              case 6:
                packages = _context.sent;

                logger.info(messages.validatingProject(), {
                  emoji: '🔎',
                  prefix: false
                });

                _context.next = 10;
                return (0, _validateProject2.default)(project);

              case 10:
                projectIsValid = _context.sent;

                if (projectIsValid) {
                  _context.next = 13;
                  break;
                }

                throw new _errors.BoltError(messages.unableToInstall());

              case 13:
                logger.info(messages.installingProjectDependencies(), {
                  emoji: '📦',
                  prefix: false
                });

                _context.next = 16;
                return yarn.install(project.pkg.dir, opts.lockfileMode);

              case 16:
                logger.info(messages.linkingWorkspaceDependencies(), {
                  emoji: '🔗',
                  prefix: false
                });

                (_iterator = packages),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 18:
                if (!_isArray) {
                  _context.next = 24;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt('break', 34);

              case 21:
                _ref2 = _iterator[_i++];
                _context.next = 28;
                break;

              case 24:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 27;
                  break;
                }

                return _context.abrupt('break', 34);

              case 27:
                _ref2 = _i.value;

              case 28:
                pkg = _ref2;
                dependencies = (0, _from2.default)(
                  pkg.getAllDependencies().keys()
                );
                _context.next = 32;
                return (0, _symlinkPackageDependencies2.default)(
                  project,
                  pkg,
                  dependencies
                );

              case 32:
                _context.next = 18;
                break;

              case 34:
                logger.info(messages.linkingWorkspaceBinaries(), {
                  emoji: '🚀',
                  prefix: false
                });

                _context.next = 37;
                return (0, _symlinkPackagesBinariesToProject2.default)(project);

              case 37:
                logger.success(messages.installedAndLinkedWorkspaces(), {
                  emoji: '💥'
                });

              case 38:
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

  return function install(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toInstallOptions = toInstallOptions;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

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

var _validateProject = require('../utils/validateProject');

var _validateProject2 = _interopRequireDefault(_validateProject);

var _symlinkPackageDependencies = require('../utils/symlinkPackageDependencies');

var _symlinkPackageDependencies2 = _interopRequireDefault(
  _symlinkPackageDependencies
);

var _symlinkPackagesBinariesToProject = require('../utils/symlinkPackagesBinariesToProject');

var _symlinkPackagesBinariesToProject2 = _interopRequireDefault(
  _symlinkPackagesBinariesToProject
);

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _pathIsInside = require('path-is-inside');

var _pathIsInside2 = _interopRequireDefault(_pathIsInside);

var _errors = require('../utils/errors');

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

function toInstallOptions(args, flags) {
  var lockfileMode = 'default';
  // in order of strictness:
  if (options.boolean(flags.frozenLockfile, 'frozen-lockfile')) {
    lockfileMode = 'frozen';
  } else if (options.boolean(flags.pureLockfile, 'pure-lockfile')) {
    lockfileMode = 'pure';
  }
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    lockfileMode
  };
}
