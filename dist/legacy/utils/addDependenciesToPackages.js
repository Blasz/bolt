'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _yarn = require('./yarn');

var yarn = _interopRequireWildcard(_yarn);

var _symlinkPackageDependencies = require('./symlinkPackageDependencies');

var _symlinkPackageDependencies2 = _interopRequireDefault(
  _symlinkPackageDependencies
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

exports.default = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(project, pkg, dependencies) {
      var type =
        arguments.length > 3 && arguments[3] !== undefined
          ? arguments[3]
          : 'dependencies';

      var packages,
        projectDependencies,
        pkgDependencies,
        _ref2,
        depGraph,
        dependencyNames,
        externalDeps,
        internalDeps,
        externalDepsToInstallForProject,
        installedVersions,
        _iterator,
        _isArray,
        _i,
        _ref3,
        dep,
        installed,
        depVersion,
        _iterator2,
        _isArray2,
        _i2,
        _ref4,
        _dep,
        dependencyPkg,
        internalVersion,
        requestedVersion,
        _iterator3,
        _isArray3,
        _i3,
        _ref6,
        _ref5,
        depName;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return project.getPackages();

              case 2:
                packages = _context.sent;
                projectDependencies = project.pkg.getAllDependencies();
                pkgDependencies = pkg.getAllDependencies();
                _context.next = 7;
                return project.getDependencyGraph(packages);

              case 7:
                _ref2 = _context.sent;
                depGraph = _ref2.graph;
                dependencyNames = dependencies.map(function(dep) {
                  return dep.name;
                });
                externalDeps = dependencies.filter(function(dep) {
                  return !depGraph.has(dep.name);
                });
                internalDeps = dependencies.filter(function(dep) {
                  return depGraph.has(dep.name);
                });
                externalDepsToInstallForProject = externalDeps.filter(function(
                  dep
                ) {
                  return !projectDependencies.has(dep.name);
                });

                if (!(externalDepsToInstallForProject.length !== 0)) {
                  _context.next = 19;
                  break;
                }

                _context.next = 16;
                return yarn.add(
                  project.pkg,
                  externalDepsToInstallForProject,
                  type
                );

              case 16:
                _context.next = 18;
                return _Project2.default.init(project.pkg.dir);

              case 18:
                project = _context.sent;

              case 19:
                if (!pkg.isSamePackage(project.pkg)) {
                  _context.next = 23;
                  break;
                }

                if (!(internalDeps.length > 0)) {
                  _context.next = 22;
                  break;
                }

                throw new _errors.BoltError(
                  messages.cannotInstallWorkspaceInProject(internalDeps[0].name)
                );

              case 22:
                return _context.abrupt('return', true);

              case 23:
                installedVersions = {};
                (_iterator = externalDeps),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 25:
                if (!_isArray) {
                  _context.next = 31;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 28;
                  break;
                }

                return _context.abrupt('break', 43);

              case 28:
                _ref3 = _iterator[_i++];
                _context.next = 35;
                break;

              case 31:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 34;
                  break;
                }

                return _context.abrupt('break', 43);

              case 34:
                _ref3 = _i.value;

              case 35:
                dep = _ref3;
                installed = project.pkg.getDependencyVersionRange(dep.name);
                // If we aren't specified a version, use the same one from the project

                depVersion = dep.version || installed;

                if (!(depVersion !== installed)) {
                  _context.next = 40;
                  break;
                }

                throw new _errors.BoltError(
                  messages.depMustMatchProject(
                    pkg.config.getName(),
                    dep.name,
                    installed,
                    depVersion
                  )
                );

              case 40:
                installedVersions[dep.name] = depVersion;

              case 41:
                _context.next = 25;
                break;

              case 43:
                (_iterator2 = internalDeps),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 44:
                if (!_isArray2) {
                  _context.next = 50;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context.next = 47;
                  break;
                }

                return _context.abrupt('break', 63);

              case 47:
                _ref4 = _iterator2[_i2++];
                _context.next = 54;
                break;

              case 50:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context.next = 53;
                  break;
                }

                return _context.abrupt('break', 63);

              case 53:
                _ref4 = _i2.value;

              case 54:
                _dep = _ref4;
                dependencyPkg = (depGraph.get(_dep.name) || {}).pkg;
                internalVersion = dependencyPkg.config.getVersion();
                // If no version is requested, default to caret at the current version

                requestedVersion = _dep.version || `^${internalVersion}`;

                if (
                  _semver2.default.satisfies(internalVersion, requestedVersion)
                ) {
                  _context.next = 60;
                  break;
                }

                throw new _errors.BoltError(
                  messages.packageMustDependOnCurrentVersion(
                    pkg.config.getName(),
                    _dep.name,
                    internalVersion,
                    requestedVersion
                  )
                );

              case 60:
                installedVersions[_dep.name] = requestedVersion;

              case 61:
                _context.next = 44;
                break;

              case 63:
                (_iterator3 = (0, _entries2.default)(installedVersions)),
                  (_isArray3 = Array.isArray(_iterator3)),
                  (_i3 = 0),
                  (_iterator3 = _isArray3
                    ? _iterator3
                    : (0, _getIterator3.default)(_iterator3));

              case 64:
                if (!_isArray3) {
                  _context.next = 70;
                  break;
                }

                if (!(_i3 >= _iterator3.length)) {
                  _context.next = 67;
                  break;
                }

                return _context.abrupt('break', 81);

              case 67:
                _ref6 = _iterator3[_i3++];
                _context.next = 74;
                break;

              case 70:
                _i3 = _iterator3.next();

                if (!_i3.done) {
                  _context.next = 73;
                  break;
                }

                return _context.abrupt('break', 81);

              case 73:
                _ref6 = _i3.value;

              case 74:
                _ref5 = _ref6;
                depName = _ref5[0];
                depVersion = _ref5[1];
                _context.next = 79;
                return pkg.setDependencyVersionRange(
                  depName,
                  type,
                  String(depVersion)
                );

              case 79:
                _context.next = 64;
                break;

              case 81:
                _context.next = 83;
                return (0, _symlinkPackageDependencies2.default)(
                  project,
                  pkg,
                  dependencyNames
                );

              case 83:
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

  function addDependenciesToPackage(_x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  }

  return addDependenciesToPackage;
})();
