'use strict';

exports.__esModule = true;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.get = get;
exports.__override = __override;
exports.__reset = __reset;

var _ciParallelVars = require('ci-parallel-vars');

var _ciParallelVars2 = _interopRequireDefault(_ciParallelVars);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var VARS = {
  CI_NODE_TOTAL: _ciParallelVars2.default
    ? _ciParallelVars2.default.total
    : null,
  CI_NODE_INDEX: _ciParallelVars2.default
    ? _ciParallelVars2.default.index
    : null
};

var OVERRIDES = new _map2.default();

function get(name) {
  return OVERRIDES.has(name) ? OVERRIDES.get(name) : VARS[name];
}

function __override(name, value) {
  OVERRIDES.set(name, value);
}

function __reset() {
  OVERRIDES.clear();
}
