'use strict';

exports.__esModule = true;
exports.BOLT_VERSION = exports.DEPENDENCY_TYPE_FLAGS_MAP = exports.DEPENDENCY_TYPES = undefined;

var _pkgUp = require('pkg-up');

var _pkgUp2 = _interopRequireDefault(_pkgUp);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var boltPkgPath = _pkgUp2.default.sync(__dirname);

// $FlowFixMe

var boltPkg = require(boltPkgPath);

var DEPENDENCY_TYPES = (exports.DEPENDENCY_TYPES = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'bundledDependencies',
  'optionalDependencies'
]);

var DEPENDENCY_TYPE_FLAGS_MAP = (exports.DEPENDENCY_TYPE_FLAGS_MAP = {
  dev: 'devDependencies',
  peer: 'peerDependencies',
  optional: 'optionalDependencies',
  D: 'devDependencies',
  P: 'peerDependencies',
  O: 'optionalDependencies'
});

var BOLT_VERSION = (exports.BOLT_VERSION = boltPkg.version);
