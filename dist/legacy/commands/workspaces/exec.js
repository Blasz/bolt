'use strict';

exports.__esModule = true;
exports.workspacesExec = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var workspacesExec = (exports.workspacesExec = (function() {
  var _ref2 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(opts) {
      var _this = this;

      var cwd, project, packages, filteredPackages;
      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                _context2.next = 3;
                return _Project2.default.init(cwd);

              case 3:
                project = _context2.sent;
                _context2.next = 6;
                return project.getPackages();

              case 6:
                packages = _context2.sent;
                filteredPackages = project.filterPackages(
                  packages,
                  opts.filterOpts
                );
                _context2.next = 10;
                return project.runPackageTasks(
                  filteredPackages,
                  opts.spawnOpts,
                  (function() {
                    var _ref3 = (0, _asyncToGenerator3.default)(
                      _regenerator2.default.mark(function _callee(pkg) {
                        return _regenerator2.default.wrap(
                          function _callee$(_context) {
                            while (1) {
                              switch ((_context.prev = _context.next)) {
                                case 0:
                                  _context.next = 2;
                                  return (0, _execCommand2.default)(
                                    project,
                                    pkg,
                                    opts.command,
                                    opts.commandArgs
                                  );

                                case 2:
                                  return _context.abrupt(
                                    'return',
                                    _context.sent
                                  );

                                case 3:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          },
                          _callee,
                          _this
                        );
                      })
                    );

                    return function(_x2) {
                      return _ref3.apply(this, arguments);
                    };
                  })()
                );

              case 10:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        this
      );
    })
  );

  return function workspacesExec(_x) {
    return _ref2.apply(this, arguments);
  };
})());

exports.toWorkspacesExecOptions = toWorkspacesExecOptions;

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

function toWorkspacesExecOptions(args, flags) {
  var _ref = flags['--'] || [],
    command = _ref[0],
    commandArgs = _ref.slice(1);

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    command,
    commandArgs,
    spawnOpts: options.toSpawnOpts(flags),
    filterOpts: options.toFilterOpts(flags)
  };
}
