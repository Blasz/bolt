'use strict';

exports.__esModule = true;
exports.publish = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var publish = (exports.publish = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var response,
        _partition,
        successful,
        unsuccessful,
        _iterator,
        _isArray,
        _i,
        _ref3,
        pkg,
        _iterator2,
        _isArray2,
        _i2,
        _ref4,
        _pkg;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _publish.publish)(opts);

              case 2:
                response = _context.sent;
                (_partition = partition(response, function(p) {
                  return p.published;
                })),
                  (successful = _partition[0]),
                  (unsuccessful = _partition[1]);
                (_iterator = successful),
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
                _ref3 = _iterator[_i++];
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
                _ref3 = _i.value;

              case 15:
                pkg = _ref3;

                logger.success(
                  messages.successfullyPublishedPackage(
                    pkg.name,
                    pkg.newVersion
                  )
                );

              case 17:
                _context.next = 5;
                break;

              case 19:
                (_iterator2 = unsuccessful),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 20:
                if (!_isArray2) {
                  _context.next = 26;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt('break', 34);

              case 23:
                _ref4 = _iterator2[_i2++];
                _context.next = 30;
                break;

              case 26:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context.next = 29;
                  break;
                }

                return _context.abrupt('break', 34);

              case 29:
                _ref4 = _i2.value;

              case 30:
                _pkg = _ref4;

                logger.error(messages.failedToPublishPackage(_pkg.name));

              case 32:
                _context.next = 20;
                break;

              case 34:
                if (!(unsuccessful.length > 0)) {
                  _context.next = 36;
                  break;
                }

                throw new _errors.BoltError(
                  `Failed to publish ${unsuccessful.length} ${
                    unsuccessful.length === 1 ? 'package' : 'packages'
                  }`
                );

              case 36:
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

  return function publish(_x2) {
    return _ref2.apply(this, arguments);
  };
})());

exports.toPublishOptions = toPublishOptions;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _publish = require('../utils/publish');

var _errors = require('../utils/errors');

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

function toPublishOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    access: options.string(flags.access, 'access')
  };
}

function partition(collection) {
  var predicate =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : function(x) {
          return x;
        };

  return collection.reduce(
    function(_ref, value) {
      var a = _ref[0],
        b = _ref[1];

      (predicate(value) ? a : b).push(value);
      return [a, b];
    },
    [[], []]
  );
}
