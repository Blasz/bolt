'use strict';

exports.__esModule = true;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.toUpgradeOptions = toUpgradeOptions;
exports.upgrade = upgrade;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _errors = require('../utils/errors');

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _upgradeDependenciesInPackages = require('../utils/upgradeDependenciesInPackages');

var _upgradeDependenciesInPackages2 = _interopRequireDefault(
  _upgradeDependenciesInPackages
);

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

// TODO: pass flags individially, upgrade has many flags this is here for testing
function toScriptFlags(flags) {
  let scriptFlags = [];

  (0, _keys2.default)(flags).map(flag => {
    if (flag === '--') return;
    if (typeof flags[flag] === 'string') {
      scriptFlags.push(`--${flag}=${flags[flag]}`);
    } else {
      scriptFlags.push(`--${flag}`);
    }
  });

  return scriptFlags;
}
function toUpgradeOptions(args, flags) {
  let depsArgs = [];

  args.forEach(dep => {
    depsArgs.push(options.toDependency(dep));
  });

  return {
    cwd: options.string(flags.cwd, 'cwd'),
    deps: depsArgs,
    flags: toScriptFlags(flags)
  };
}

async function upgrade(opts) {
  let cwd = opts.cwd || process.cwd();
  let project = await _Project2.default.init(cwd);
  let pkg = await _Package2.default.closest(cwd);

  try {
    await (0, _upgradeDependenciesInPackages2.default)(
      project,
      pkg,
      opts.deps,
      opts.flags
    );
  } catch (err) {
    throw new _errors.BoltError(`upgrading dependencies failed due to ${err}`);
  }
}
