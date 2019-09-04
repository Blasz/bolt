'use strict';

exports.__esModule = true;
exports.getPackageVersionCommits = undefined;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getLastVersionCommitForPackage = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(repo, pkg) {
      var cwd,
        filePath,
        commits,
        matchedCommit,
        _iterator,
        _isArray,
        _i,
        _ref2,
        commit,
        parentCommit,
        before,
        after,
        jsonBefore,
        jsonAfter;

      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = repo.dir;
                filePath = pkg.config.filePath;
                _context.next = 4;
                return git.getCommitsToFile(filePath, { cwd });

              case 4:
                commits = _context.sent;
                matchedCommit = null;
                (_iterator = commits),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 7:
                if (!_isArray) {
                  _context.next = 13;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt('break', 36);

              case 10:
                _ref2 = _iterator[_i++];
                _context.next = 17;
                break;

              case 13:
                _i = _iterator.next();

                if (!_i.done) {
                  _context.next = 16;
                  break;
                }

                return _context.abrupt('break', 36);

              case 16:
                _ref2 = _i.value;

              case 17:
                commit = _ref2;
                _context.next = 20;
                return git.getCommitParent(commit.hash, { cwd });

              case 20:
                parentCommit = _context.sent;

                if (parentCommit) {
                  _context.next = 23;
                  break;
                }

                return _context.abrupt('continue', 34);

              case 23:
                _context.next = 25;
                return git.showFileAtCommit(filePath, parentCommit, {
                  cwd
                });

              case 25:
                before = _context.sent;
                _context.next = 28;
                return git.showFileAtCommit(filePath, commit.hash, { cwd });

              case 28:
                after = _context.sent;
                jsonBefore = JSON.parse(before);
                jsonAfter = JSON.parse(after);

                if (!(jsonAfter.version !== jsonBefore.version)) {
                  _context.next = 34;
                  break;
                }

                matchedCommit = commit;
                return _context.abrupt('break', 36);

              case 34:
                _context.next = 7;
                break;

              case 36:
                return _context.abrupt('return', matchedCommit);

              case 37:
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

  return function getLastVersionCommitForPackage(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var getPackageVersionCommits = (exports.getPackageVersionCommits = (function() {
  var _ref3 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(repo, packages) {
      var versionCommits, _iterator2, _isArray2, _i2, _ref4, pkg, commit;

      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                versionCommits = new _map2.default();
                (_iterator2 = packages),
                  (_isArray2 = Array.isArray(_iterator2)),
                  (_i2 = 0),
                  (_iterator2 = _isArray2
                    ? _iterator2
                    : (0, _getIterator3.default)(_iterator2));

              case 2:
                if (!_isArray2) {
                  _context2.next = 8;
                  break;
                }

                if (!(_i2 >= _iterator2.length)) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('break', 19);

              case 5:
                _ref4 = _iterator2[_i2++];
                _context2.next = 12;
                break;

              case 8:
                _i2 = _iterator2.next();

                if (!_i2.done) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('break', 19);

              case 11:
                _ref4 = _i2.value;

              case 12:
                pkg = _ref4;
                _context2.next = 15;
                return getLastVersionCommitForPackage(repo, pkg);

              case 15:
                commit = _context2.sent;

                versionCommits.set(pkg, commit);

              case 17:
                _context2.next = 2;
                break;

              case 19:
                return _context2.abrupt('return', versionCommits);

              case 20:
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

  return function getPackageVersionCommits(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})());

var _Repository = require('../Repository');

var _Repository2 = _interopRequireDefault(_Repository);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _git = require('../utils/git');

var git = _interopRequireWildcard(_git);

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
