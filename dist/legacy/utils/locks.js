'use strict';

exports.__esModule = true;
exports.unlock = exports.lock = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var lock = (exports.lock = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(packages) {
      var locks, promises, _loop, _iterator, _isArray, _i, _ref2, pkg;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                locks = [];
                promises = [];

                logger.info(messages.lockingAllPackages());

                _loop = function _loop(pkg) {
                  var name = pkg.config.getName();
                  var version = pkg.config.getVersion();
                  var promise = npm.infoAllow404(name).then(function(response) {
                    if (response.published) {
                      var pkgInfo = response.pkgInfo || {};
                      if (pkgInfo['dist-tags'][LOCK_DIST_TAG]) {
                        throw new _errors.BoltError(
                          `Unable to get lock as a lock already exists for '${name}'`
                        );
                      }
                      return npm
                        .addTag(name, pkgInfo.version, LOCK_DIST_TAG)
                        .then(function() {
                          locks.push(pkg);
                        });
                    }
                  });
                  promises.push(promise);
                };

                (_iterator = packages),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 5:
                if (!_isArray) {
                  _context.next = 11;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt('break', 19);

              case 8:
                _ref2 = _iterator[_i++];
                _context.next = 15;
                break;

              case 11:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('break', 19);

              case 14:
                _ref2 = _i.value;

              case 15:
                pkg = _ref2;

                _loop(pkg);

              case 17:
                _context.next = 5;
                break;

              case 19:
                _context.prev = 19;
                _context.next = 22;
                return (0, _promises.settleAll)(promises);

              case 22:
                _context.next = 30;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context['catch'](19);

                logger.error(_context.t0.message);
                // Note: We only unlock the locks *we* just locked, as the other ones are currently being used
                _context.next = 29;
                return _unlock(locks);

              case 29:
                throw new _errors.BoltError(
                  'Unable to lock all packages, someone else may be releasing'
                );

              case 30:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[19, 24]]
      );
    })
  );

  return function lock(_x) {
    return _ref.apply(this, arguments);
  };
})());

var _unlock = (function() {
  var _ref3 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(packages) {
      var promises, _iterator2, _isArray2, _i2, _ref4, pkg;

      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                promises = [];
                (_iterator2 = packages),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 2:
                if (!_isArray2) {
                  _context2.next = 8;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('break', 16);

              case 5:
                _ref4 = _iterator2[_i2++];
                _context2.next = 12;
                break;

              case 8:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('break', 16);

              case 11:
                _ref4 = _i2.value;

              case 12:
                pkg = _ref4;

                promises.push(
                  npm.removeTag(pkg.config.getName(), LOCK_DIST_TAG)
                );

              case 14:
                _context2.next = 2;
                break;

              case 16:
                _context2.next = 18;
                return _promise2.default.all(promises);

              case 18:
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

  return function _unlock(_x2) {
    return _ref3.apply(this, arguments);
  };
})();

var unlock = (exports.unlock = (function() {
  var _ref5 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee3(packages) {
      var promises, _loop2, _iterator3, _isArray3, _i3, _ref6, pkg;

      return _regenerator2.default.wrap(
        function _callee3$(_context3) {
          while (1) {
            switch ((_context3.prev = _context3.next)) {
              case 0:
                promises = [];

                _loop2 = function _loop2(pkg) {
                  var name = pkg.config.getName();
                  var promise = npm.infoAllow404(name).then(function(response) {
                    if (response.published) {
                      var pkgInfo = response.pkgInfo || {};
                      if (!pkgInfo['dist-tags'][LOCK_DIST_TAG]) {
                        return;
                      }
                      return npm.removeTag(pkg.config.getName(), LOCK_DIST_TAG);
                    }
                  });

                  promises.push(promise);
                };

                (_iterator3 = packages),
                  (_isArray3 = Array.isArray(_iterator3)),
                  (_i3 = 0),
                  (_iterator3 = _isArray3
                    ? _iterator3
                    : (0, _getIterator3.default)(_iterator3));

              case 3:
                if (!_isArray3) {
                  _context3.next = 9;
                  break;
                }

                if (!(_i3 >= _iterator3.length)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('break', 17);

              case 6:
                _ref6 = _iterator3[_i3++];
                _context3.next = 13;
                break;

              case 9:
                _i3 = _iterator3.next();

                if (!_i3.done) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt('break', 17);

              case 12:
                _ref6 = _i3.value;

              case 13:
                pkg = _ref6;

                _loop2(pkg);

              case 15:
                _context3.next = 3;
                break;

              case 17:
                _context3.next = 19;
                return _promise2.default.all(promises);

              case 19:
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

  return function unlock(_x3) {
    return _ref5.apply(this, arguments);
  };
})());

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _npm = require('./npm');

var npm = _interopRequireWildcard(_npm);

var _promises = require('./promises');

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

var LOCK_DIST_TAG = 'bolt-lock';
