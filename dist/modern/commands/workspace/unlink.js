'use strict';

exports.__esModule = true;
exports.toWorkspaceUnlinkOptions = toWorkspaceUnlinkOptions;
exports.workspaceUnlink = workspaceUnlink;

var _unlink = require('../unlink');

var unlink = _interopRequireWildcard(_unlink);

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _yarn = require('../../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../../utils/errors');

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

function toWorkspaceUnlinkOptions(args, flags) {
  let [pkgName, ...packagesToUnlink] = args;
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pkgName,
    packagesToUnlink
  };
}
async function workspaceUnlink(opts) {
  let cwd = opts.cwd || process.cwd();
  let packagesToUnlink = opts.packagesToUnlink;
  let pkgName = opts.pkgName;
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let pkg = await project.getPackageByName(packages, opts.pkgName);

  if (!pkg) {
    throw new _errors.BoltError(
      `Could not find a workspace named "${opts.pkgName}" from "${cwd}"`
    );
  }

  // If there are packages to link then we can link then in the Project
  // as dependencies are symlinked
  if (packagesToUnlink && packagesToUnlink.length) {
    await unlink.unlink(
      await unlink.toUnlinkOptions(packagesToUnlink, { '--': [] })
    );
  } else {
    await yarn.cliCommand(pkg.dir, 'unlink');
  }
}
