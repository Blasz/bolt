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
      var cwd, spawnOpts, project, packages;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                spawnOpts = opts.spawnOpts || {};
                _context.next = 4;
                return _Project2.default.init(cwd);

              case 4:
                project = _context.sent;
                _context.next = 7;
                return project.getPackages();

              case 7:
                packages = _context.sent;
                _context.next = 10;
                return project.runPackageTasks(packages, spawnOpts, function(
                  pkg
                ) {
                  return task({
                    dir: pkg.dir,
                    config: pkg.config.json
                  });
                });

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

  function runWorkspaceTasks(_x2) {
    return _ref.apply(this, arguments);
  }

  return runWorkspaceTasks;
})();
