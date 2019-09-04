'use strict';

exports.__esModule = true;
exports.toWorkspacesRunOptions = toWorkspacesRunOptions;
exports.workspacesRun = workspacesRun;

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _yarn = require('../../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

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

function toWorkspacesRunOptions(args, flags) {
  let [script, ...scriptArgs] = args;
  const flagArgs = flags['--'] || [];

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    script,
    // for ws run commands we pass in all flags that are added after the `--`
    scriptArgs: [...scriptArgs, ...flagArgs],
    spawnOpts: options.toSpawnOpts(flags),
    filterOpts: options.toFilterOpts(flags)
  };
}

async function workspacesRun(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let filteredPackages = project.filterPackages(packages, opts.filterOpts);

  await project.runPackageTasks(
    filteredPackages,
    opts.spawnOpts,
    // no need to error if script doesn't exist
    async pkg => await yarn.runIfExists(pkg, opts.script, opts.scriptArgs)
  );
}
