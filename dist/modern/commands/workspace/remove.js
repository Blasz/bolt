'use strict';

exports.__esModule = true;
exports.toWorkspaceRemoveOptions = toWorkspaceRemoveOptions;
exports.workspaceRemove = workspaceRemove;

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../../Package');

var _Package2 = _interopRequireDefault(_Package);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _logger = require('../../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _removeDependenciesFromPackages = require('../../utils/removeDependenciesFromPackages');

var _removeDependenciesFromPackages2 = _interopRequireDefault(
  _removeDependenciesFromPackages
);

var _errors = require('../../utils/errors');

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

function toWorkspaceRemoveOptions(args, flags) {
  let [pkgName, ...deps] = args;
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pkgName,
    deps,
    spawnOpts: options.toSpawnOpts(flags)
  };
}

async function workspaceRemove(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let pkg = await project.getPackageByName(packages, opts.pkgName);

  if (!pkg) {
    throw new _errors.BoltError(
      `Could not find a workspace named "${opts.pkgName}" from "${cwd}"`
    );
  }

  await (0, _removeDependenciesFromPackages2.default)(
    project,
    packages,
    [pkg],
    opts.deps,
    opts.spawnOpts
  );
}
