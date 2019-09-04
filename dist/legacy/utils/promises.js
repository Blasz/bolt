'use strict';

exports.__esModule = true;
exports.settleAll = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * This ensures that all promises have finished before throwing any errors. Useful when you need to
 * be able to clean up after yourself, but have many async operations happening at once
 *
 * try {
 *  let promises = [];
 *  let locksHeld = [];
 *
 *  files.forEach(file => {
 *    promises.push(getLockForFile(f)
 *      .then(lock => { locksHeld.push(lock) })
 *    );
 *  });
 *
 *  await Promise.all(promises); // BAD: leaves us with locks that hadnt resolved yet
 *  await settleAll(locksHeld); // GOOD: We dont throw until after all promises have resolved
 * } catch(err) {
 *  // need to release the locks we have
 *  releaseLocksForFiles(locksHeld);
 * }
 * */
var settleAll = (exports.settleAll = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(promises) {
      var error, results, _iterator, _isArray, _i, _ref2, promise;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                error = void 0;
                results = [];
                (_iterator = promises),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 3:
                if (!_isArray) {
                  _context.next = 9;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('break', 27);

              case 6:
                _ref2 = _iterator[_i++];
                _context.next = 13;
                break;

              case 9:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt('break', 27);

              case 12:
                _ref2 = _i.value;

              case 13:
                promise = _ref2;
                _context.prev = 14;
                _context.t0 = results;
                _context.next = 18;
                return promise;

              case 18:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t2 = _context['catch'](14);

                error = _context.t2;

              case 25:
                _context.next = 3;
                break;

              case 27:
                if (!error) {
                  _context.next = 31;
                  break;
                }

                throw error;

              case 31:
                return _context.abrupt('return', results);

              case 32:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[14, 22]]
      );
    })
  );

  return function settleAll(_x) {
    return _ref.apply(this, arguments);
  };
})());

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
