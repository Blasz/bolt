'use strict';

exports.__esModule = true;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = async function getWorkspaces(opts = {}) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();

  let filtered = project.filterPackages(packages, {
    only: opts.only,
    ignore: opts.ignore,
    onlyFs: opts.onlyFs,
    ignoreFs: opts.ignoreFs
  });

  return filtered.map(pkg => ({
    dir: pkg.dir,
    name: pkg.getName(),
    config: pkg.config.json
  }));
};
