'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _git = require('./utils/git');

var git = _interopRequireWildcard(_git);

var _errors = require('./utils/errors');

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

var Repository = (function() {
  function Repository(dir) {
    (0, _classCallCheck3.default)(this, Repository);

    this.dir = dir;
  }

  Repository.init = (function() {
    var _ref = (0, _asyncToGenerator3.default)(
      _regenerator2.default.mark(function _callee(cwd) {
        var dir;
        return _regenerator2.default.wrap(
          function _callee$(_context) {
            while (1) {
              switch ((_context.prev = _context.next)) {
                case 0:
                  _context.next = 2;
                  return git.getRootDirectory({ cwd });

                case 2:
                  dir = _context.sent;

                  if (dir) {
                    _context.next = 5;
                    break;
                  }

                  throw new _errors.BoltError(
                    `There is no git repository in the current working directory`
                  );

                case 5:
                  return _context.abrupt('return', new Repository(dir));

                case 6:
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

    function init(_x) {
      return _ref.apply(this, arguments);
    }

    return init;
  })();

  return Repository;
})();

exports.default = Repository;
