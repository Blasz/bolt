'use strict';

exports.__esModule = true;
exports.workspaceRemove = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var workspaceRemove = (exports.workspaceRemove = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, project, packages, pkg;
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
                return project.getPackages();

              case 6:
                packages = _context.sent;
                _context.next = 9;
                return project.getPackageByName(packages, opts.pkgName);

              case 9:
                pkg = _context.sent;

                if (pkg) {
                  _context.next = 12;
                  break;
                }

                throw new _errors.BoltError(
                  `Could not find a workspace named "${opts.pkgName}" from "${cwd}"`
                );

              case 12:
                _context.next = 14;
                return (0, _removeDependenciesFromPackages2.default)(
                  project,
                  packages,
                  [pkg],
                  opts.deps,
                  opts.spawnOpts
                );

              case 14:
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

  return function workspaceRemove(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toWorkspaceRemoveOptions = toWorkspaceRemoveOptions;

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../../Package');

var _Package2 = _interopRequireDefault(_Package);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _logger = require('../../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _removeDependenciesFromPackages = require('../../utils/removeDependenciesFromPackages');

var _removeDependenciesFromPackages2 = _interopRequireDefault(
  _removeDependenciesFromPackages
);

var _errors = require('../../utils/errors');

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

function toWorkspaceRemoveOptions(args, flags) {
  var pkgName = args[0],
    deps = args.slice(1);

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pkgName,
    deps,
    spawnOpts: options.toSpawnOpts(flags)
  };
}
