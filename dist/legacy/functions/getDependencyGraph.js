'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

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

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee() {
      var opts =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var cwd,
        project,
        packages,
        _ref2,
        dependencyGraph,
        graphIsValid,
        simplifiedDependencyGraph;

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
                return project.getDependencyGraph(packages, opts.excludedTypes);

              case 9:
                _ref2 = _context.sent;
                dependencyGraph = _ref2.graph;
                graphIsValid = _ref2.valid;

                if (graphIsValid) {
                  _context.next = 14;
                  break;
                }

                throw new Error('Dependency graph is not valid');

              case 14:
                simplifiedDependencyGraph = new _map2.default();

                dependencyGraph.forEach(function(pkgInfo, pkgName) {
                  simplifiedDependencyGraph.set(pkgName, pkgInfo.dependencies);
                });

                return _context.abrupt('return', simplifiedDependencyGraph);

              case 17:
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

  function getDependencyGraph() {
    return _ref.apply(this, arguments);
  }

  return getDependencyGraph;
})();
