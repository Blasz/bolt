'use strict';

exports.__esModule = true;
exports.workspacelink = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var workspacelink = (exports.workspacelink = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee(opts) {
      var cwd, packagesToLink, pkgName, project, packages, pkg;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                packagesToLink = opts.packagesToLink;
                pkgName = opts.pkgName;
                _context.next = 5;
                return _Project2.default.init(cwd);

              case 5:
                project = _context.sent;
                _context.next = 8;
                return project.getPackages();

              case 8:
                packages = _context.sent;
                _context.next = 11;
                return project.getPackageByName(packages, opts.pkgName);

              case 11:
                pkg = _context.sent;

                if (pkg) {
                  _context.next = 14;
                  break;
                }

                throw new _errors.BoltError(
                  `Could not find a workspace named "${opts.pkgName}" from "${cwd}"`
                );

              case 14:
                if (!(packagesToLink && packagesToLink.length)) {
                  _context.next = 23;
                  break;
                }

                _context.t0 = link;
                _context.next = 18;
                return link.toLinkOptions(packagesToLink, { '--': [] });

              case 18:
                _context.t1 = _context.sent;
                _context.next = 21;
                return _context.t0.link.call(_context.t0, _context.t1);

              case 21:
                _context.next = 25;
                break;

              case 23:
                _context.next = 25;
                return yarn.cliCommand(pkg.dir, 'link');

              case 25:
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

  return function workspacelink(_x) {
    return _ref.apply(this, arguments);
  };
})());

exports.toWorkspacelinkOptions = toWorkspacelinkOptions;

var _link = require('../link');

var link = _interopRequireWildcard(_link);

var _Project = require('../../Project');

var _Project2 = _interopRequireDefault(_Project);

var _yarn = require('../../utils/yarn');

var yarn = _interopRequireWildcard(_yarn);

var _options = require('../../utils/options');

var options = _interopRequireWildcard(_options);

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

function toWorkspacelinkOptions(args, flags) {
  var pkgName = args[0],
    packagesToLink = args.slice(1);

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    pkgName,
    packagesToLink
  };
}
