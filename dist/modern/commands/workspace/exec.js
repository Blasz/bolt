'use strict';

exports.__esModule = true;
exports.toWorkspaceExecOptions = toWorkspaceExecOptions;
exports.workspaceExec = workspaceExec;

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../../utils/errors');

var _execCommand = require('../../utils/execCommand');

var _execCommand2 = _interopRequireDefault(_execCommand);

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

function toWorkspaceExecOptions(args, flags) {
  let [pkgName] = args;
  let [command, ...commandArgs] = flags['--'] || [];
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pkgName,
    command,
    commandArgs
  };
}

async function workspaceExec(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let pkg = await project.getPackageByName(packages, opts.pkgName);

  if (!pkg) {
    throw new _errors.BoltError(
      `Could not find a workspace named "${opts.pkgName}" from "${cwd}"`
    );
  }

  await (0, _execCommand2.default)(
    project,
    pkg,
    opts.command,
    opts.commandArgs
  );
}
