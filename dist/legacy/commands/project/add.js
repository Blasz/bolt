'use strict';

exports.__esModule = true;
exports.projectAdd = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var projectAdd = (exports.projectAdd = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return (0, _add.add)(opts);

              case 2:
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

  return function projectAdd(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toProjectAddOptions = toProjectAddOptions;

var _addDependenciesToPackages = require('../../utils/addDependenciesToPackages');

var _addDependenciesToPackages2 = _interopRequireDefault(
  _addDependenciesToPackages
);

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _logger = require('../../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _constants = require('../../constants');

var _add = require('../add');

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

function toProjectAddOptions(args, flags) {
  var depsArgs = [];
  var type = 'dependencies';

  // args is each of our dependencies we are adding which may have "@version" parts to them
  args.forEach(function(dep) {
    depsArgs.push(options.toDependency(dep));
  });

  (0, _keys2.default)(_constants.DEPENDENCY_TYPE_FLAGS_MAP).forEach(function(
    depTypeFlag
  ) {
    if (flags[depTypeFlag]) {
      type = _constants.DEPENDENCY_TYPE_FLAGS_MAP[depTypeFlag];
      // check if value of dependency flag is a package name and then push to dependency arguments
      if (typeof flags[depTypeFlag] === 'string') {
        depsArgs.push(options.toDependency(flags[depTypeFlag]));
      }
    }
  });

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    deps: depsArgs,
    type
  };
}
