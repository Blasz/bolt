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
    _regenerator2.default.mark(function _callee() {
      var opts =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var cwd, project, packages, filtered;
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
                filtered = project.filterPackages(packages, {
                  only: opts.only,
                  ignore: opts.ignore,
                  onlyFs: opts.onlyFs,
                  ignoreFs: opts.ignoreFs
                });
                return _context.abrupt(
                  'return',
                  filtered.map(function(pkg) {
                    return {
                      dir: pkg.dir,
                      name: pkg.getName(),
                      config: pkg.config.json
                    };
                  })
                );

              case 9:
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

  function getWorkspaces() {
    return _ref.apply(this, arguments);
  }

  return getWorkspaces;
})();
