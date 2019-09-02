'use strict';

exports.__esModule = true;
exports.workspaceExec = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var workspaceExec = (exports.workspaceExec = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, project, packages, pkg;
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
                return project.getPackages();

              case 6:
                packages = _context.sent;
                _context.next = 9;
                return project.getPackageByName(packages, opts.pkgName);

              case 9:
                pkg = _context.sent;

                if (pkg) {
                  _context.next = 12;
                  break;
                }

                throw new _errors.BoltError(
                  `Could not find a workspace named "${opts.pkgName}" from "${cwd}"`
                );

              case 12:
                _context.next = 14;
                return (0, _execCommand2.default)(
                  project,
                  pkg,
                  opts.command,
                  opts.commandArgs
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

  return function workspaceExec(_x) {
    return _ref2.apply(this, arguments);
  };
})());

exports.toWorkspaceExecOptions = toWorkspaceExecOptions;

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
  var pkgName = args[0];

  var _ref = flags['--'] || [],
    command = _ref[0],
    commandArgs = _ref.slice(1);

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pkgName,
    command,
    commandArgs
  };
}
