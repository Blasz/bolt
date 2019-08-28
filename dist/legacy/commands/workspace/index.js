'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = (0, _extends3.default)(
  {},
  require('./add'),
  require('./exec'),
  require('./link'),
  require('./remove'),
  require('./run'),
  require('./unlink'),
  require('./upgrade')
);
