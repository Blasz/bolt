'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.toAddOptions = toAddOptions;
exports.add = add;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _addDependenciesToPackages = require('../utils/addDependenciesToPackages');

var _addDependenciesToPackages2 = _interopRequireDefault(
  _addDependenciesToPackages
);

var _constants = require('../constants');

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

function toAddOptions(args, flags) {
  let depsArgs = [];
  let type = 'dependencies';

  // args is each of our dependencies we are adding which may have "@version" parts to them
  args.forEach(dep => {
    depsArgs.push(options.toDependency(dep));
  });

  (0, _keys2.default)(_constants.DEPENDENCY_TYPE_FLAGS_MAP).forEach(
    depTypeFlag => {
      if (flags[depTypeFlag]) {
        type = _constants.DEPENDENCY_TYPE_FLAGS_MAP[depTypeFlag];
        // check if value of dependency flag is a package name and then push to dependency arguments
        if (typeof flags[depTypeFlag] === 'string') {
          depsArgs.push(options.toDependency(flags[depTypeFlag]));
        }
      }
    }
  );

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    deps: depsArgs,
    type
  };
}

async function add(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let pkg = await _Package2.default.closest(cwd);
  await (0, _addDependenciesToPackages2.default)(
    project,
    pkg,
    opts.deps,
    opts.type
  );
}
