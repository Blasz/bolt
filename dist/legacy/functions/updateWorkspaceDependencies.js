'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function versionRangeToRangeType(versionRange) {
  if (versionRange.charAt(0) === '^') return '^';
  if (versionRange.charAt(0) === '~') return '~';
  return '';
}

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(dependencyToUpgrade) {
      var opts =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var cwd,
        project,
        packages,
        _ref2,
        graph,
        editedPackages,
        _iterator,
        _isArray,
        _i,
        _ref3,
        pkg,
        pkgDependencies,
        name,
        depName,
        depTypes,
        _iterator2,
        _isArray2,
        _i2,
        _ref4,
        depType;

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
                return project.getDependencyGraph(packages);

              case 9:
                _ref2 = _context.sent;
                graph = _ref2.graph;
                editedPackages = new _set2.default();

                // Note: all dependencyToUpgrade are external dependencies

                (_iterator = packages),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 13:
                if (!_isArray) {
                  _context.next = 19;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt('break', 52);

              case 16:
                _ref3 = _iterator[_i++];
                _context.next = 23;
                break;

              case 19:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt('break', 52);

              case 22:
                _ref3 = _i.value;

              case 23:
                pkg = _ref3;
                pkgDependencies = pkg.getAllDependencies();
                name = pkg.getName();
                _context.t0 = _regenerator2.default.keys(dependencyToUpgrade);

              case 27:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 50;
                  break;
                }

                depName = _context.t1.value;

                if (!pkgDependencies.has(depName)) {
                  _context.next = 48;
                  break;
                }

                depTypes = pkg.getDependencyTypes(depName);

                editedPackages.add(name);
                (_iterator2 = depTypes),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 33:
                if (!_isArray2) {
                  _context.next = 39;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context.next = 36;
                  break;
                }

                return _context.abrupt('break', 48);

              case 36:
                _ref4 = _iterator2[_i2++];
                _context.next = 43;
                break;

              case 39:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context.next = 42;
                  break;
                }

                return _context.abrupt('break', 48);

              case 42:
                _ref4 = _i2.value;

              case 43:
                depType = _ref4;
                _context.next = 46;
                return pkg.setDependencyVersionRange(
                  depName,
                  depType,
                  dependencyToUpgrade[depName]
                );

              case 46:
                _context.next = 33;
                break;

              case 48:
                _context.next = 27;
                break;

              case 50:
                _context.next = 13;
                break;

              case 52:
                return _context.abrupt('return', editedPackages);

              case 53:
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

  function updateWorkspaceDependencies(_x2) {
    return _ref.apply(this, arguments);
  }

  return updateWorkspaceDependencies;
})();
