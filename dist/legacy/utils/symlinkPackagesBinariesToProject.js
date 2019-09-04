'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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
    _regenerator2.default.mark(function _callee(project) {
      var projectBinPath,
        packages,
        _ref2,
        dependencyGraph,
        symlinksToCreate,
        _iterator,
        _isArray,
        _i,
        _ref3,
        pkg,
        pkgBins,
        _iterator2,
        _isArray2,
        _i2,
        _ref5,
        pkgBin,
        binName,
        src,
        dest;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                projectBinPath = project.pkg.nodeModulesBin;
                _context.next = 3;
                return project.getPackages();

              case 3:
                packages = _context.sent;
                _context.next = 6;
                return project.getDependencyGraph(packages);

              case 6:
                _ref2 = _context.sent;
                dependencyGraph = _ref2.graph;
                symlinksToCreate = [];
                (_iterator = packages),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 10:
                if (!_isArray) {
                  _context.next = 16;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt('break', 46);

              case 13:
                _ref3 = _iterator[_i++];
                _context.next = 20;
                break;

              case 16:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 19;
                  break;
                }

                return _context.abrupt('break', 46);

              case 19:
                _ref3 = _i.value;

              case 20:
                pkg = _ref3;
                _context.next = 23;
                return pkg.getBins();

              case 23:
                pkgBins = _context.sent;

                if (!(pkgBins.length === 0)) {
                  _context.next = 26;
                  break;
                }

                return _context.abrupt('continue', 44);

              case 26:
                (_iterator2 = pkgBins),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 27:
                if (!_isArray2) {
                  _context.next = 33;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context.next = 30;
                  break;
                }

                return _context.abrupt('break', 44);

              case 30:
                _ref5 = _iterator2[_i2++];
                _context.next = 37;
                break;

              case 33:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context.next = 36;
                  break;
                }

                return _context.abrupt('break', 44);

              case 36:
                _ref5 = _i2.value;

              case 37:
                pkgBin = _ref5;
                binName = pkgBin.name.split('/').pop();
                src = pkgBin.filePath;
                dest = _path2.default.join(projectBinPath, binName);

                symlinksToCreate.push({ src, dest, type: 'exec' });

              case 42:
                _context.next = 27;
                break;

              case 44:
                _context.next = 10;
                break;

              case 46:
                _context.next = 48;
                return _promise2.default.all(
                  symlinksToCreate.map(function(_ref4) {
                    var src = _ref4.src,
                      dest = _ref4.dest,
                      type = _ref4.type;
                    return fs.symlink(src, dest, type);
                  })
                );

              case 48:
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

  function symlinkPackagesBinaries(_x) {
    return _ref.apply(this, arguments);
  }

  return symlinkPackagesBinaries;
})();
