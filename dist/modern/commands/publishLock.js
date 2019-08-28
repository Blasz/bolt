'use strict';

exports.__esModule = true;
exports.toPublishLockOptions = toPublishLockOptions;
exports.publishLock = publishLock;

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _locks = require('../utils/locks');

var locks = _interopRequireWildcard(_locks);

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

function toPublishLockOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd')
  };
}
async function publishLock(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let publicPackages = packages.filter(pkg => !pkg.config.getPrivate());
  await locks.lock(publicPackages);
}
