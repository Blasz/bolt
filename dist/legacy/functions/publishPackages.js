'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _publish = require('../utils/publish');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                return _context.abrupt('return', (0, _publish.publish)(opts));

              case 1:
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

  function publishPackages(_x) {
    return _ref.apply(this, arguments);
  }

  return publishPackages;
})();
