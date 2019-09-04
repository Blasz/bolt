'use strict';

exports.__esModule = true;
exports.cacheList = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var cacheList = (exports.cacheList = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, args;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                args = ['list'];

                if (opts.pattern) {
                  args = args.concat([`--pattern=${opts.pattern}`]);
                }

                _context.prev = 3;
                _context.next = 6;
                return yarn.cliCommand(cwd, 'cache', args);

              case 6:
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](3);
                throw new _errors.BoltError(_context.t0);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[3, 8]]
      );
    })
  );

  return function cacheList(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toCacheListOptions = toCacheListOptions;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../../utils/errors');

var _yarn = require('../../utils/yarn');

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

function toCacheListOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pattern: options.string(flags.pattern, 'pattern') || ''
  };
}
