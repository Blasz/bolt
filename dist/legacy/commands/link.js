'use strict';

exports.__esModule = true;
exports.link = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var link = (exports.link = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(opts) {
      var _this = this;

      var cwd, packagesToLink, project, packages, packageMap;
      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                packagesToLink = opts.packagesToLink;
                _context2.next = 4;
                return _Project2.default.init(cwd);

              case 4:
                project = _context2.sent;
                _context2.next = 7;
                return project.getPackages();

              case 7:
                packages = _context2.sent;
                packageMap = getPackageMap(packages);

                if (!(packagesToLink && packagesToLink.length)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 12;
                return _promise2.default.all(
                  packagesToLink.map(
                    (function() {
                      var _ref3 = (0, _asyncToGenerator3.default)(
                        _regenerator2.default.mark(function _callee(
                          packageToLink
                        ) {
                          return _regenerator2.default.wrap(
                            function _callee$(_context) {
                              while (1) {
                                switch ((_context.prev = _context.next)) {
                                  case 0:
                                    if (!packageMap.has(packageToLink)) {
                                      _context.next = 4;
                                      break;
                                    }

                                    logger.warn(
                                      messages.linkInternalPackage(
                                        packageToLink
                                      )
                                    );
                                    _context.next = 6;
                                    break;

                                  case 4:
                                    _context.next = 6;
                                    return yarn.cliCommand(cwd, 'link', [
                                      packageToLink
                                    ]);

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
                      );

                      return function(_x2) {
                        return _ref3.apply(this, arguments);
                      };
                    })()
                  )
                );

              case 12:
                _context2.next = 15;
                break;

              case 14:
                throw new _errors.BoltError(
                  `Cannot create a link to entire workspace. Please specify package to link.`
                );

              case 15:
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

  return function link(_x) {
    return _ref2.apply(this, arguments);
  };
})());

exports.toLinkOptions = toLinkOptions;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../utils/errors');

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

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

function toLinkOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    packagesToLink: args
  };
}
