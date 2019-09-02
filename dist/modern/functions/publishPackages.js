'use strict';

exports.__esModule = true;

var _publish = require('../utils/publish');

exports.default = async function publishPackages(opts) {
  return (0, _publish.publish)(opts);
};
