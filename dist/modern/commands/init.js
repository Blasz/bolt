'use strict';

exports.__esModule = true;
exports.toInitOptions = toInitOptions;
exports.init = init;

var _errors = require('../utils/errors');

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _prompts = require('../utils/prompts');

var _jsonModifier = require('../utils/jsonModifier');

var _jsonModifier2 = _interopRequireDefault(_jsonModifier);

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

function toInitOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    args: options.toYarnInit(flags)
  };
}

async function init(opts) {
  let cwd = opts.cwd || process.cwd();
  let spawnArgs = ['-s'];

  if (opts.args.private) spawnArgs.push('-p');
  if (opts.args.yes) spawnArgs.push('-y');

  try {
    await yarn.cliCommand(cwd, 'init', spawnArgs);

    if (spawnArgs.indexOf('-y') === -1) {
      let addWorkspace = await (0, _prompts.isWorkspaceNeeded)();

      if (addWorkspace) {
        let pkg = await _Package2.default.closest(cwd);
        let config = pkg.config;
        let json = await (0, _jsonModifier2.default)(config.json);
        config.write(json);
      }
    }
  } catch (err) {
    throw new _errors.BoltError(`Unable to create new package due to: ${err}`);
  }
}
