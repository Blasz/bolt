'use strict';

exports.__esModule = true;
exports.upgrade = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var upgrade = (exports.upgrade = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, project, pkg;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                _context.next = 3;
                return _Project2.default.init(cwd);

              case 3:
                project = _context.sent;
                _context.next = 6;
                return _Package2.default.closest(cwd);

              case 6:
                pkg = _context.sent;
                _context.prev = 7;
                _context.next = 10;
                return (0, _upgradeDependenciesInPackages2.default)(
                  project,
                  pkg,
                  opts.deps,
                  opts.flags
                );

              case 10:
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context['catch'](7);
                throw new _errors.BoltError(
                  `upgrading dependencies failed due to ${_context.t0}`
                );

              case 15:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this,
        [[7, 12]]
      );
    })
  );

  return function upgrade(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toUpgradeOptions = toUpgradeOptions;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../utils/errors');

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _upgradeDependenciesInPackages = require('../utils/upgradeDependenciesInPackages');

var _upgradeDependenciesInPackages2 = _interopRequireDefault(
  _upgradeDependenciesInPackages
);

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

// TODO: pass flags individially, upgrade has many flags this is here for testing
function toScriptFlags(flags) {
  var scriptFlags = [];

  (0, _keys2.default)(flags).map(function(flag) {
    if (flag === '--') return;
    if (typeof flags[flag] === 'string') {
      scriptFlags.push(`--${flag}=${flags[flag]}`);
    } else {
      scriptFlags.push(`--${flag}`);
    }
  });

  return scriptFlags;
}
function toUpgradeOptions(args, flags) {
  var depsArgs = [];

  args.forEach(function(dep) {
    depsArgs.push(options.toDependency(dep));
  });

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    deps: depsArgs,
    flags: toScriptFlags(flags)
  };
}
