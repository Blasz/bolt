'use strict';

exports.__esModule = true;
exports.pack = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var pack = (exports.pack = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, fileName;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                fileName = opts.fileName ? [`--filename=${opts.fileName}`] : [];
                _context.prev = 2;
                _context.next = 5;
                return yarn.cliCommand(cwd, 'pack', fileName);

              case 5:
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](2);
                throw new _errors.BoltError(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[2, 7]]
      );
    })
  );

  return function pack(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toPackOptions = toPackOptions;

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

function toPackOptions(args, flags) {
  var fileName =
    options.string(flags.filename, 'filename') || options.string(flags.f, 'f');
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    fileName: fileName || ''
  };
}
