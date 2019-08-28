'use strict';

exports.__esModule = true;
exports.isWorkspaceNeeded = isWorkspaceNeeded;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

async function isWorkspaceNeeded() {
  let question = await _inquirer2.default.prompt([
    {
      type: 'confirm',
      name: 'workspaces',
      message: 'create workspaces?',
      default: false,
      prefix: 'question'
    }
  ]);

  return question.workspaces;
}
