'use strict';

exports.__esModule = true;
exports.info = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var info = (exports.info = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, spawnArgs;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                spawnArgs = Array.prototype.concat([], opts.args);

                if (opts.flags && opts.flags.json) {
                  spawnArgs.push('--json');
                }
                _context.prev = 3;
                _context.next = 6;
                return yarn.info(cwd, spawnArgs);

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

  return function info(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toInfoOptions = toInfoOptions;

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

function toInfoOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args,
    flags
  };
}
