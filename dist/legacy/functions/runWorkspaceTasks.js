'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(task) {
      var opts =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var cwd, spawnOpts, filterOpts, project, packages, filteredPackages;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                spawnOpts = opts.spawnOpts || {};
                filterOpts = opts.filterOpts || {};
                _context.next = 5;
                return _Project2.default.init(cwd);

              case 5:
                project = _context.sent;
                _context.next = 8;
                return project.getPackages();

              case 8:
                packages = _context.sent;
                filteredPackages = project.filterPackages(packages, filterOpts);
                _context.next = 12;
                return project.runPackageTasks(
                  filteredPackages,
                  spawnOpts,
                  function(pkg) {
                    return task({
                      dir: pkg.dir,
                      config: pkg.config.json
                    });
                  }
                );

              case 12:
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

  function runWorkspaceTasks(_x2) {
    return _ref.apply(this, arguments);
  }

  return runWorkspaceTasks;
})();
