'use strict';

exports.__esModule = true;
exports.toWorkspacesRemoveOptions = toWorkspacesRemoveOptions;
exports.workspacesRemove = workspacesRemove;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _removeDependenciesFromPackages = require('../../utils/removeDependenciesFromPackages');

var _removeDependenciesFromPackages2 = _interopRequireDefault(
  _removeDependenciesFromPackages
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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

function toWorkspacesRemoveOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    deps: args,
    spawnOpts: options.toSpawnOpts(flags),
    filterOpts: options.toFilterOpts(flags)
  };
}

async function workspacesRemove(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let filteredPackages = project.filterPackages(packages, opts.filterOpts);

  await (0, _removeDependenciesFromPackages2.default)(
    project,
    packages,
    filteredPackages,
    opts.deps,
    opts.spawnOpts
  );
}
