'use strict';

exports.__esModule = true;
exports.projectRun = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var projectRun = (exports.projectRun = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, project, script;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                _context.next = 3;
                return _Project2.default.init(cwd);

              case 3:
                project = _context.sent;
                _context.next = 6;
                return yarn.getScript(project.pkg, opts.script);

              case 6:
                script = _context.sent;

                if (!script) {
                  _context.next = 13;
                  break;
                }

                logger.cmd(script, opts.scriptArgs);
                _context.next = 11;
                return yarn.run(project.pkg, opts.script, opts.scriptArgs);

              case 11:
                _context.next = 14;
                break;

              case 13:
                throw new _errors.BoltError(
                  `Package at "${project.pkg.dir}" does not have a script named "${opts.script}"`
                );

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        this
      );
    })
  );

  return function projectRun(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toProjectRunOptions = toProjectRunOptions;

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

var _yarn = require('../../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _logger = require('../../utils/logger');

var logger = _interopRequireWildcard(_logger);

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

function toProjectRunOptions(args, flags) {
  /**
   * Unfortunately, in run commands, we are unable to use meow's parsed flags and args as we really
   * want to be able to pass all args and flags to yarn without modification. For example, we could
   * get a flag called `t` and we wont know if `t` was passed in with `--t` or `-t` and could pass it in
   * incorrectly. The only other alternative would be to pass in all flags using the `--` separator
   * and args on the other side e.g `bolt run test src/* -- --watch --bail` which is further away from
   * how yarn handles things and is more complicated for the consumer.
   */
  var script = args[0];

  var scriptArgIdx = process.argv.indexOf(script);
  // the flags that we'll be passing in as args start after the script name, and we'll pass them all directly
  var scriptArgs = process.argv.slice(scriptArgIdx + 1);
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    script,
    scriptArgs
  };
}
