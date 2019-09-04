'use strict';

exports.__esModule = true;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = async function runWorkspaceTasks(task, opts = {}) {
  let cwd = opts.cwd || process.cwd();
  let spawnOpts = opts.spawnOpts || {};
  let filterOpts = opts.filterOpts || {};
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let filteredPackages = project.filterPackages(packages, filterOpts);

  await project.runPackageTasks(filteredPackages, spawnOpts, pkg => {
    return task({
      dir: pkg.dir,
      config: pkg.config.json
    });
  });
};
