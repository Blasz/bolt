'use strict';

exports.__esModule = true;
exports.isWorkspaceNeeded = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var isWorkspaceNeeded = (exports.isWorkspaceNeeded = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee() {
      var question;
      return _regenerator2.default.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return _inquirer2.default.prompt([
                  {
                    type: 'confirm',
                    name: 'workspaces',
                    message: 'create workspaces?',
                    default: false,
                    prefix: 'question'
                  }
                ]);

              case 2:
                question = _context.sent;
                return _context.abrupt('return', question.workspaces);

              case 4:
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

  return function isWorkspaceNeeded() {
    return _ref.apply(this, arguments);
  };
})());

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
