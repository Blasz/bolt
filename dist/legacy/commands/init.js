'use strict';

exports.__esModule = true;
exports.init = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = (exports.init = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, spawnArgs, addWorkspace, pkg, config, json;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                spawnArgs = ['-s'];

                if (opts.args.private) spawnArgs.push('-p');
                if (opts.args.yes) spawnArgs.push('-y');

                _context.prev = 4;
                _context.next = 7;
                return yarn.cliCommand(cwd, 'init', spawnArgs);

              case 7:
                if (!(spawnArgs.indexOf('-y') === -1)) {
                  _context.next = 20;
                  break;
                }

                _context.next = 10;
                return (0, _prompts.isWorkspaceNeeded)();

              case 10:
                addWorkspace = _context.sent;

                if (!addWorkspace) {
                  _context.next = 20;
                  break;
                }

                _context.next = 14;
                return _Package2.default.closest(cwd);

              case 14:
                pkg = _context.sent;
                config = pkg.config;
                _context.next = 18;
                return (0, _jsonModifier2.default)(config.json);

              case 18:
                json = _context.sent;

                config.write(json);

              case 20:
                _context.next = 25;
                break;

              case 22:
                _context.prev = 22;
                _context.t0 = _context['catch'](4);
                throw new _errors.BoltError(
                  `Unable to create new package due to: ${_context.t0}`
                );

              case 25:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[4, 22]]
      );
    })
  );

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toInitOptions = toInitOptions;

var _errors = require('../utils/errors');

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _prompts = require('../utils/prompts');

var _jsonModifier = require('../utils/jsonModifier');

var _jsonModifier2 = _interopRequireDefault(_jsonModifier);

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

function toInitOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args: options.toYarnInit(flags)
  };
}
