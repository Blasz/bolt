'use strict';

exports.__esModule = true;
exports.list = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var list = (exports.list = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, args;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                args = opts.pattern ? [`--pattern=${opts.pattern}`] : [];

                if (opts.depth) {
                  args = args.concat([`--depth=${opts.depth}`]);
                }
                _context.prev = 3;

                yarn.cliCommand(cwd, 'list', args);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](3);
                throw new _errors.BoltError(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[3, 7]]
      );
    })
  );

  return function list(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toListOptions = toListOptions;

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

function toListOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pattern: options.string(flags.pattern, 'pattern') || '',
    depth: options.number(flags.depth, 'depth') || ''
  };
}
