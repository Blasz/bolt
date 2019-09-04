'use strict';

exports.__esModule = true;
exports.workspacesUpgrade = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var workspacesUpgrade = (exports.workspacesUpgrade = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, filterOpts;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                filterOpts = (0, _keys2.default)(opts.filterOpts);

                if (!filterOpts.length) {
                  _context.next = 4;
                  break;
                }

                throw new _errors.BoltError(
                  messages.errorWorkspacesUpgrade(filterOpts)
                );

              case 4:
                _context.next = 6;
                return Upgrade.upgrade(
                  Upgrade.toUpgradeOptions(opts.deps, opts.flags)
                );

              case 6:
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

  return function workspacesUpgrade(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toWorkspacesUpgradeOptions = toWorkspacesUpgradeOptions;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _messages = require('../../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('../../utils/errors');

var _upgrade = require('../upgrade');

var Upgrade = _interopRequireWildcard(_upgrade);

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

function toWorkspacesUpgradeOptions(args, flags) {
  return {
    deps: args,
    filterOpts: options.toFilterOpts(flags),
    flags
  };
}
