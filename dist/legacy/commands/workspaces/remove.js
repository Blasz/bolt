'use strict';

exports.__esModule = true;
exports.workspacesRemove = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var workspacesRemove = (exports.workspacesRemove = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, project, packages, filteredPackages;
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
                filteredPackages = project.filterPackages(
                  packages,
                  opts.filterOpts
                );
                _context.next = 10;
                return (0, _removeDependenciesFromPackages2.default)(
                  project,
                  packages,
                  filteredPackages,
                  opts.deps,
                  opts.spawnOpts
                );

              case 10:
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

  return function workspacesRemove(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toWorkspacesRemoveOptions = toWorkspacesRemoveOptions;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _removeDependenciesFromPackages = require('../../utils/removeDependenciesFromPackages');

var _removeDependenciesFromPackages2 = _interopRequireDefault(
  _removeDependenciesFromPackages
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

function toWorkspacesRemoveOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    deps: args,
    spawnOpts: options.toSpawnOpts(flags),
    filterOpts: options.toFilterOpts(flags)
  };
}
