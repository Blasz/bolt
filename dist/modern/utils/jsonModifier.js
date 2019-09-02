'use strict';

exports.__esModule = true;

exports.default = async function addWorkspacesToJson(json) {
  let workspaces = ['packages/*'];
  json.bolt = {
    workspaces
  };
  return json;
};
