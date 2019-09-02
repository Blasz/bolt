'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _updatePackageVersions = require('../functions/updatePackageVersions');

var _updatePackageVersions2 = _interopRequireDefault(_updatePackageVersions);

var _updateWorkspaceDependencies = require('../functions/updateWorkspaceDependencies');

var _updateWorkspaceDependencies2 = _interopRequireDefault(
  _updateWorkspaceDependencies
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
    _regenerator2.default.mark(function _callee(
      project,
      pkg,
      dependencies,
      flags
    ) {
      var packages,
        pkgDependencies,
        _ref2,
        depGraph,
        externalDeps,
        internalDeps,
        projectDependencies,
        internalDepNames,
        newProject,
        newProjectDependencies,
        depsToUpgrade;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return project.getPackages();

              case 2:
                packages = _context.sent;
                pkgDependencies = pkg.getAllDependencies();
                _context.next = 6;
                return project.getDependencyGraph(packages);

              case 6:
                _ref2 = _context.sent;
                depGraph = _ref2.graph;
                externalDeps = dependencies.filter(function(dep) {
                  return !depGraph.has(dep.name);
                });
                internalDeps = dependencies.filter(function(dep) {
                  return depGraph.has(dep.name);
                });
                projectDependencies = project.pkg.getAllDependencies();

                if (!project.pkg.isSamePackage(pkg)) {
                  _context.next = 16;
                  break;
                }

                if (!(internalDeps.length > 0)) {
                  _context.next = 16;
                  break;
                }

                internalDepNames = internalDeps.map(function(dep) {
                  return dep.name;
                });

                internalDeps.forEach(function(dep) {
                  logger.error(
                    messages.cannotUpgradeWorkspaceDependencyInProject(dep.name)
                  );
                });
                throw new _errors.BoltError(
                  messages.noNeedToSymlinkInternalDependency()
                );

              case 16:
                _context.next = 18;
                return yarn.upgrade(project.pkg, externalDeps, flags);

              case 18:
                _context.next = 20;
                return _Project2.default.init(project.pkg.dir);

              case 20:
                newProject = _context.sent;

                // get the new versions of everything from the project config
                newProjectDependencies = newProject.pkg.getAllDependencies();
                depsToUpgrade = {};

                newProjectDependencies.forEach(function(value, key) {
                  depsToUpgrade[key] = value;
                });

                _context.next = 26;
                return (0, _updateWorkspaceDependencies2.default)(
                  depsToUpgrade,
                  {
                    cwd: project.pkg.dir
                  }
                );

              case 26:
                return _context.abrupt('return', _context.sent);

              case 27:
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

  function upgradeDependenciesInPackage(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  }

  return upgradeDependenciesInPackage;
})();
