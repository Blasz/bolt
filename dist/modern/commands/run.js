'use strict';

exports.__esModule = true;
exports.toRunOptions = toRunOptions;
exports.run = run;

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _yarn = require('../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _errors = require('../utils/errors');

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

function toRunOptions(args, flags) {
  /**
   * Unfortunately, in run commands, we are unable to use meow's parsed flags and args as we really
   * want to be able to pass all args and flags to yarn without modification. For example, we could
   * get a flag called `t` and we wont know if `t` was passed in with `--t` or `-t` and could pass it in
   * incorrectly. The only other alternative would be to pass in all flags using the `--` separator
   * and args on the other side e.g `bolt run test src/* -- --watch --bail` which is further away from
   * how yarn handles things and is more complicated for the consumer.
   */
  let [script] = args;
  const scriptArgIdx = process.argv.indexOf(script);
  // the flags that we'll be passing in as args start after the script name, and we'll pass them all directly
  const scriptArgs = process.argv.slice(scriptArgIdx + 1);

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    script,
    scriptArgs
  };
}
async function run(opts) {
  let cwd = opts.cwd || process.cwd();
  let pkg = await _Package2.default.closest(cwd);
  let script = await yarn.getScript(pkg, opts.script);

  if (script) {
    logger.cmd(script, opts.scriptArgs);
    await yarn.run(pkg, opts.script, opts.scriptArgs);
  } else {
    throw new _errors.BoltError(
      `Package at "${pkg.dir}" does not have a script named "${opts.script}"`
    );
  }
}
