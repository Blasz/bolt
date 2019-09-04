'use strict';

exports.__esModule = true;
exports.create = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var create = (exports.create = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                _context.prev = 1;
                _context.next = 4;
                return yarn.cliCommand(cwd, 'create', opts.args);

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](1);
                throw new _errors.BoltError(_context.t0);

              case 9:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[1, 6]]
      );
    })
  );

  return function create(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toCreateOptions = toCreateOptions;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../utils/errors');

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

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

function toCreateOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args
  };
}
