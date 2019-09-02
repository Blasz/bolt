'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

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

function versionRangeToRangeType(versionRange) {
  if (versionRange.charAt(0) === '^') return '^';
  if (versionRange.charAt(0) === '~') return '~';
  return '';
}

/**
 * This function is used to update all the internal dependencies where you have an external source
 * bumping updated packages (a tool like bolt-releases for example).
 * It takes an object of packageNames and their new updated packages. updatePackageVersions will update all
 * internal updated packages of packages according to those new updated packages.
 * ie, a caret dep, will remain a caret dep and a pinned dep will remain pinned.
 *
 * Note: we explicitly ignore all external dependencies passed and warn if they are.
 *
 * It is up to the consumer to ensure that these new updated packages are not going to leave the repo in an
 * inconsistent state (internal deps leaving semver ranges). This can occur if your
 * updated packages will not release all packages that need to be.
 *
 */

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(updatedPackages) {
      var opts =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var cwd,
        project,
        packages,
        _ref2,
        graph,
        editedPackages,
        internalDeps,
        externalDeps,
        _iterator,
        _isArray,
        _i,
        _ref3,
        pkg,
        promises,
        _name,
        _iterator2,
        _isArray2,
        _i2,
        _ref4,
        depName,
        depRange,
        depTypes,
        rangeType,
        newDepRange,
        inUpdatedPackages,
        willLeaveSemverRange,
        _iterator3,
        _isArray3,
        _i3,
        _ref5,
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
                internalDeps = (0, _keys2.default)(updatedPackages).filter(
                  function(dep) {
                    return graph.has(dep);
                  }
                );
                externalDeps = (0, _keys2.default)(updatedPackages).filter(
                  function(dep) {
                    return !graph.has(dep);
                  }
                );

                if (externalDeps.length !== 0) {
                  logger.warn(
                    messages.externalDepsPassedToUpdatePackageVersions(
                      externalDeps
                    )
                  );
                }

                (_iterator = packages),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 16:
                if (!_isArray) {
                  _context.next = 22;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt('break', 74);

              case 19:
                _ref3 = _iterator[_i++];
                _context.next = 26;
                break;

              case 22:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 25;
                  break;
                }

                return _context.abrupt('break', 74);

              case 25:
                _ref3 = _i.value;

              case 26:
                pkg = _ref3;
                promises = [];
                _name = pkg.getName();
                (_iterator2 = internalDeps),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 30:
                if (!_isArray2) {
                  _context.next = 36;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context.next = 33;
                  break;
                }

                return _context.abrupt('break', 72);

              case 33:
                _ref4 = _iterator2[_i2++];
                _context.next = 40;
                break;

              case 36:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context.next = 39;
                  break;
                }

                return _context.abrupt('break', 72);

              case 39:
                _ref4 = _i2.value;

              case 40:
                depName = _ref4;
                depRange = String(pkg.getDependencyVersionRange(depName));
                depTypes = pkg.getDependencyTypes(depName);
                rangeType = versionRangeToRangeType(depRange);
                newDepRange = rangeType + updatedPackages[depName];

                if (!(depTypes.length === 0)) {
                  _context.next = 47;
                  break;
                }

                return _context.abrupt('continue', 70);

              case 47:
                inUpdatedPackages = (0, _arrayIncludes2.default)(
                  internalDeps,
                  _name
                );
                willLeaveSemverRange = !_semver2.default.satisfies(
                  updatedPackages[depName],
                  depRange
                );
                // This check determines whether the package will be released. If the
                // package will not be released, we throw.

                if (!(!inUpdatedPackages && willLeaveSemverRange)) {
                  _context.next = 51;
                  break;
                }

                throw new Error(
                  messages.invalidBoltWorkspacesFromUpdate(
                    _name,
                    depName,
                    depRange,
                    updatedPackages[depName]
                  )
                );

              case 51:
                if (inUpdatedPackages) {
                  _context.next = 53;
                  break;
                }

                return _context.abrupt('continue', 70);

              case 53:
                (_iterator3 = depTypes),
                  (_isArray3 = Array.isArray(_iterator3)),
                  (_i3 = 0),
                  (_iterator3 = _isArray3
                    ? _iterator3
                    : (0, _getIterator3.default)(_iterator3));

              case 54:
                if (!_isArray3) {
                  _context.next = 60;
                  break;
                }

                if (!(_i3 >= _iterator3.length)) {
                  _context.next = 57;
                  break;
                }

                return _context.abrupt('break', 69);

              case 57:
                _ref5 = _iterator3[_i3++];
                _context.next = 64;
                break;

              case 60:
                _i3 = _iterator3.next();

                if (!_i3.done) {
                  _context.next = 63;
                  break;
                }

                return _context.abrupt('break', 69);

              case 63:
                _ref5 = _i3.value;

              case 64:
                depType = _ref5;
                _context.next = 67;
                return pkg.setDependencyVersionRange(
                  depName,
                  depType,
                  newDepRange
                );

              case 67:
                _context.next = 54;
                break;

              case 69:
                editedPackages.add(pkg.filePath);

              case 70:
                _context.next = 30;
                break;

              case 72:
                _context.next = 16;
                break;

              case 74:
                return _context.abrupt(
                  'return',
                  (0, _from2.default)(editedPackages)
                );

              case 75:
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

  function updatePackageVersions(_x2) {
    return _ref.apply(this, arguments);
  }

  return updatePackageVersions;
})();
