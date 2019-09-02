'use strict';

exports.__esModule = true;

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathIsInside = require('path-is-inside');

var _pathIsInside2 = _interopRequireDefault(_pathIsInside);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _errors = require('./errors');

var _fs = require('./fs');

var fs = _interopRequireWildcard(_fs);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _yarn = require('./yarn');

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
    _regenerator2.default.mark(function _callee2(project, pkg, dependencies) {
      var _this = this;

      var projectDeps,
        pkgDependencies,
        packages,
        _ref2,
        dependencyGraph,
        dependencyGraphValid,
        pkgName,
        internalDeps,
        directoriesToCreate,
        symlinksToCreate,
        valid,
        _iterator,
        _isArray,
        _i,
        _ref3,
        depName,
        versionInProject,
        versionInPkg,
        src,
        dest,
        _iterator2,
        _isArray2,
        _i2,
        _ref4,
        dependency,
        depWorkspace,
        projectBinFiles,
        _iterator3,
        _isArray3,
        _i3,
        _ref5,
        binFile,
        binPath,
        binName,
        actualBinFileRelative,
        actualBinFile,
        binFileRelativeToNodeModules,
        pathParts,
        _pkgName,
        workspaceBinPath,
        _iterator4,
        _isArray4,
        _i4,
        _ref6,
        _dependency,
        depBinFiles,
        _binName,
        _src,
        _dest,
        _loop,
        _iterator5,
        _isArray5,
        _i5,
        _ref10,
        _ref9,
        _binName2,
        _binPath;

      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                projectDeps = project.pkg.getAllDependencies();
                pkgDependencies = project.pkg.getAllDependencies();
                _context2.next = 4;
                return project.getPackages();

              case 4:
                packages = _context2.sent;
                _context2.next = 7;
                return project.getDependencyGraph(packages);

              case 7:
                _ref2 = _context2.sent;
                dependencyGraph = _ref2.graph;
                dependencyGraphValid = _ref2.valid;
                pkgName = pkg.config.getName();
                // get all the dependencies that are internal workspaces in this project

                internalDeps =
                  (dependencyGraph.get(pkgName) || {}).dependencies || [];
                directoriesToCreate = [];
                symlinksToCreate = [];
                valid = true;

                /*********************************************************************
                 * Calculate all the external dependencies that need to be symlinked *
                 **********************************************************************/

                directoriesToCreate.push(pkg.nodeModules, pkg.nodeModulesBin);

                (_iterator = dependencies),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 17:
                if (!_isArray) {
                  _context2.next = 23;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context2.next = 20;
                  break;
                }

                return _context2.abrupt('break', 49);

              case 20:
                _ref3 = _iterator[_i++];
                _context2.next = 27;
                break;

              case 23:
                _i = _iterator.next();

                if (!_i.done) {
                  _context2.next = 26;
                  break;
                }

                return _context2.abrupt('break', 49);

              case 26:
                _ref3 = _i.value;

              case 27:
                depName = _ref3;
                versionInProject = project.pkg.getDependencyVersionRange(
                  depName
                );
                versionInPkg = pkg.getDependencyVersionRange(depName);

                // If dependency is internal we can ignore it (we symlink below)

                if (!dependencyGraph.has(depName)) {
                  _context2.next = 32;
                  break;
                }

                return _context2.abrupt('continue', 47);

              case 32:
                if (versionInProject) {
                  _context2.next = 36;
                  break;
                }

                valid = false;
                logger.error(
                  messages.depMustBeAddedToProject(
                    pkg.config.getName(),
                    depName
                  )
                );
                return _context2.abrupt('continue', 47);

              case 36:
                if (versionInPkg) {
                  _context2.next = 40;
                  break;
                }

                valid = false;
                logger.error(
                  messages.couldntSymlinkDependencyNotExists(
                    pkg.config.getName(),
                    depName
                  )
                );
                return _context2.abrupt('continue', 47);

              case 40:
                if (!(versionInProject !== versionInPkg)) {
                  _context2.next = 44;
                  break;
                }

                valid = false;
                logger.error(
                  messages.depMustMatchProject(
                    pkg.config.getName(),
                    depName,
                    versionInProject,
                    versionInPkg
                  )
                );
                return _context2.abrupt('continue', 47);

              case 44:
                src = _path2.default.join(project.pkg.nodeModules, depName);
                dest = _path2.default.join(pkg.nodeModules, depName);

                symlinksToCreate.push({ src, dest, type: 'junction' });

              case 47:
                _context2.next = 17;
                break;

              case 49:
                (_iterator2 = internalDeps),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 50:
                if (!_isArray2) {
                  _context2.next = 56;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context2.next = 53;
                  break;
                }

                return _context2.abrupt('break', 67);

              case 53:
                _ref4 = _iterator2[_i2++];
                _context2.next = 60;
                break;

              case 56:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context2.next = 59;
                  break;
                }

                return _context2.abrupt('break', 67);

              case 59:
                _ref4 = _i2.value;

              case 60:
                dependency = _ref4;
                depWorkspace = dependencyGraph.get(dependency) || {};
                src = depWorkspace.pkg.dir;
                dest = _path2.default.join(pkg.nodeModules, dependency);

                symlinksToCreate.push({ src, dest, type: 'junction' });

              case 65:
                _context2.next = 50;
                break;

              case 67:
                if (!(!dependencyGraphValid || !valid)) {
                  _context2.next = 69;
                  break;
                }

                throw new _errors.BoltError(
                  'Cannot symlink invalid set of dependencies.'
                );

              case 69:
                _context2.next = 71;
                return fs.readdirSafe(project.pkg.nodeModulesBin);

              case 71:
                projectBinFiles = _context2.sent;
                (_iterator3 = projectBinFiles),
                  (_isArray3 = Array.isArray(_iterator3)),
                  (_i3 = 0),
                  (_iterator3 = _isArray3
                    ? _iterator3
                    : (0, _getIterator3.default)(_iterator3));

              case 73:
                if (!_isArray3) {
                  _context2.next = 79;
                  break;
                }

                if (!(_i3 >= _iterator3.length)) {
                  _context2.next = 76;
                  break;
                }

                return _context2.abrupt('break', 100);

              case 76:
                _ref5 = _iterator3[_i3++];
                _context2.next = 83;
                break;

              case 79:
                _i3 = _iterator3.next();

                if (!_i3.done) {
                  _context2.next = 82;
                  break;
                }

                return _context2.abrupt('break', 100);

              case 82:
                _ref5 = _i3.value;

              case 83:
                binFile = _ref5;
                binPath = _path2.default.join(
                  project.pkg.nodeModulesBin,
                  binFile
                );
                binName = _path2.default.basename(binPath);

                // read the symlink to find the actual bin file (path will be relative to the symlink)

                _context2.next = 88;
                return fs.readlink(binPath);

              case 88:
                actualBinFileRelative = _context2.sent;

                if (actualBinFileRelative) {
                  _context2.next = 91;
                  break;
                }

                throw new _errors.BoltError(`${binName} is not a symlink`);

              case 91:
                actualBinFile = _path2.default.join(
                  project.pkg.nodeModulesBin,
                  actualBinFileRelative
                );

                // To find the name of the dep that created the bin we'll get its path from node_modules and
                // use the first one or two parts (two if the package is scoped)

                binFileRelativeToNodeModules = _path2.default.relative(
                  project.pkg.nodeModules,
                  actualBinFile
                );
                pathParts = binFileRelativeToNodeModules.split(
                  _path2.default.sep
                );
                _pkgName = pathParts[0];

                if (_pkgName.startsWith('@')) {
                  _pkgName += '/' + pathParts[1];
                }

                workspaceBinPath = _path2.default.join(
                  pkg.nodeModulesBin,
                  binName
                );

                symlinksToCreate.push({
                  src: binPath,
                  dest: workspaceBinPath,
                  type: 'exec'
                });

              case 98:
                _context2.next = 73;
                break;

              case 100:
                (_iterator4 = internalDeps),
                  (_isArray4 = Array.isArray(_iterator4)),
                  (_i4 = 0),
                  (_iterator4 = _isArray4
                    ? _iterator4
                    : (0, _getIterator3.default)(_iterator4));

              case 101:
                if (!_isArray4) {
                  _context2.next = 107;
                  break;
                }

                if (!(_i4 >= _iterator4.length)) {
                  _context2.next = 104;
                  break;
                }

                return _context2.abrupt('break', 144);

              case 104:
                _ref6 = _iterator4[_i4++];
                _context2.next = 111;
                break;

              case 107:
                _i4 = _iterator4.next();

                if (!_i4.done) {
                  _context2.next = 110;
                  break;
                }

                return _context2.abrupt('break', 144);

              case 110:
                _ref6 = _i4.value;

              case 111:
                _dependency = _ref6;
                depWorkspace = dependencyGraph.get(_dependency) || {};
                depBinFiles =
                  depWorkspace.pkg &&
                  depWorkspace.pkg.config &&
                  depWorkspace.pkg.config.getBin();

                if (depBinFiles) {
                  _context2.next = 116;
                  break;
                }

                return _context2.abrupt('continue', 142);

              case 116:
                if ((0, _arrayIncludes2.default)(dependencies, _dependency)) {
                  _context2.next = 118;
                  break;
                }

                return _context2.abrupt('continue', 142);

              case 118:
                if (!(typeof depBinFiles === 'string')) {
                  _context2.next = 124;
                  break;
                }

                // package may be scoped, name will only be the second part
                _binName = _dependency.split('/').pop();
                _src = _path2.default.join(depWorkspace.pkg.dir, depBinFiles);
                _dest = _path2.default.join(pkg.nodeModulesBin, _binName);

                symlinksToCreate.push({ src: _src, dest: _dest, type: 'exec' });
                return _context2.abrupt('continue', 142);

              case 124:
                _loop = function _loop(_binName2, _binPath) {
                  var src = _path2.default.join(
                    depWorkspace.pkg.dir,
                    String(_binPath)
                  );
                  var dest = _path2.default.join(pkg.nodeModulesBin, _binName2);

                  // Just in case the symlink is already added (it might have already existed in the projects bin/)
                  if (
                    !symlinksToCreate.find(function(symlink) {
                      return symlink.dest === dest;
                    })
                  ) {
                    symlinksToCreate.push({ src, dest, type: 'exec' });
                  }
                };

                (_iterator5 = (0, _entries2.default)(depBinFiles)),
                  (_isArray5 = Array.isArray(_iterator5)),
                  (_i5 = 0),
                  (_iterator5 = _isArray5
                    ? _iterator5
                    : (0, _getIterator3.default)(_iterator5));

              case 126:
                if (!_isArray5) {
                  _context2.next = 132;
                  break;
                }

                if (!(_i5 >= _iterator5.length)) {
                  _context2.next = 129;
                  break;
                }

                return _context2.abrupt('break', 142);

              case 129:
                _ref10 = _iterator5[_i5++];
                _context2.next = 136;
                break;

              case 132:
                _i5 = _iterator5.next();

                if (!_i5.done) {
                  _context2.next = 135;
                  break;
                }

                return _context2.abrupt('break', 142);

              case 135:
                _ref10 = _i5.value;

              case 136:
                _ref9 = _ref10;
                _binName2 = _ref9[0];
                _binPath = _ref9[1];

                _loop(_binName2, _binPath);

              case 140:
                _context2.next = 126;
                break;

              case 142:
                _context2.next = 101;
                break;

              case 144:
                _context2.next = 146;
                return yarn.runIfExists(pkg, 'preinstall');

              case 146:
                _context2.next = 148;
                return _promise2.default.all(
                  directoriesToCreate.map(function(dirName) {
                    return fs.mkdirp(dirName);
                  })
                );

              case 148:
                _context2.next = 150;
                return _promise2.default.all(
                  symlinksToCreate.map(
                    (function() {
                      var _ref8 = (0, _asyncToGenerator3.default)(
                        _regenerator2.default.mark(function _callee(_ref7) {
                          var src = _ref7.src,
                            dest = _ref7.dest,
                            type = _ref7.type;
                          return _regenerator2.default.wrap(
                            function _callee$(_context) {
                              while (1) {
                                switch ((_context.prev = _context.next)) {
                                  case 0:
                                    _context.next = 2;
                                    return fs.symlink(src, dest, type);

                                  case 2:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            },
                            _callee,
                            _this
                          );
                        })
                      );

                      return function(_x4) {
                        return _ref8.apply(this, arguments);
                      };
                    })()
                  )
                );

              case 150:
                _context2.next = 152;
                return yarn.runIfExists(pkg, 'postinstall');

              case 152:
                _context2.next = 154;
                return yarn.runIfExists(pkg, 'prepublish');

              case 154:
                _context2.next = 156;
                return yarn.runIfExists(pkg, 'prepare');

              case 156:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        this
      );
    })
  );

  function symlinkPackageDependencies(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return symlinkPackageDependencies;
})();
