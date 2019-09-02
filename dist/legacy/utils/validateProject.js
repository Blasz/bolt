'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

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

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(project) {
      var packages,
        projectDependencies,
        projectConfig,
        _ref2,
        depGraph,
        projectIsValid,
        boltConfigVersion,
        _iterator,
        _isArray,
        _i,
        _ref3,
        pkg,
        _iterator2,
        _isArray2,
        _i2,
        _ref4,
        _pkg,
        depName;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return project.getPackages();

              case 2:
                packages = _context.sent;
                projectDependencies = project.pkg.getAllDependencies();
                projectConfig = project.pkg.config;
                _context.next = 7;
                return project.getDependencyGraph(packages);

              case 7:
                _ref2 = _context.sent;
                depGraph = _ref2.graph;
                projectIsValid = true;

                // If the project has an engines.bolt field we must respect it

                boltConfigVersion = projectConfig.getBoltConfigVersion();

                if (boltConfigVersion) {
                  if (
                    !_semver2.default.satisfies(
                      _constants.BOLT_VERSION,
                      boltConfigVersion
                    )
                  ) {
                    logger.error(
                      messages.invalidBoltVersion(
                        _constants.BOLT_VERSION,
                        boltConfigVersion
                      )
                    );
                    projectIsValid = false;
                  }
                }

                // Workspaces always have a name and a version in their configs
                (_iterator = packages),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 13:
                if (!_isArray) {
                  _context.next = 19;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt('break', 28);

              case 16:
                _ref3 = _iterator[_i++];
                _context.next = 23;
                break;

              case 19:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt('break', 28);

              case 22:
                _ref3 = _i.value;

              case 23:
                pkg = _ref3;

                try {
                  pkg.getName();
                } catch (err) {
                  logger.error(err.message);
                  projectIsValid = false;
                }

                try {
                  pkg.getVersion();
                } catch (err) {
                  logger.error(err.message);
                  projectIsValid = false;
                }

              case 26:
                _context.next = 13;
                break;

              case 28:
                (_iterator2 = packages),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 29:
                if (!_isArray2) {
                  _context.next = 35;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context.next = 32;
                  break;
                }

                return _context.abrupt('break', 44);

              case 32:
                _ref4 = _iterator2[_i2++];
                _context.next = 39;
                break;

              case 35:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context.next = 38;
                  break;
                }

                return _context.abrupt('break', 44);

              case 38:
                _ref4 = _i2.value;

              case 39:
                _pkg = _ref4;
                depName = _pkg.getName();

                if (projectDependencies.has(depName)) {
                  logger.error(
                    messages.projectCannotDependOnWorkspace(depName)
                  );
                  projectIsValid = false;
                }

              case 42:
                _context.next = 29;
                break;

              case 44:
                return _context.abrupt('return', projectIsValid);

              case 45:
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

  function validateProject(_x) {
    return _ref.apply(this, arguments);
  }

  return validateProject;
})();
