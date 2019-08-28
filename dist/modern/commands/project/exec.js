'use strict';

exports.__esModule = true;
exports.toProjectExecOptions = toProjectExecOptions;
exports.projectExec = projectExec;

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

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

function toProjectExecOptions(args, flags) {
  let [command, ...commandArgs] = flags['--'] || [];
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    command,
    commandArgs
  };
}
async function projectExec(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  await (0, _execCommand2.default)(
    project,
    project.pkg,
    opts.command,
    opts.commandArgs
  );
}
