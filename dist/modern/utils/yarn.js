'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.install = install;
exports.add = add;
exports.upgrade = upgrade;
exports.run = run;
exports.runIfExists = runIfExists;
exports.getScript = getScript;
exports.remove = remove;
exports.cliCommand = cliCommand;
exports.info = info;
exports.userAgent = userAgent;
exports.globalCli = globalCli;

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

var _projectBinPath = require('project-bin-path');

var _projectBinPath2 = _interopRequireDefault(_projectBinPath);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _processes = require('./processes');

var processes = _interopRequireWildcard(_processes);

var _fs = require('../utils/fs');

var fs = _interopRequireWildcard(_fs);

var logger = _interopRequireWildcard(_fs);

var _constants = require('../constants');

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

function getLocalBinPath() {
  return (0, _projectBinPath2.default)(__dirname);
}

function depTypeToFlag(depType) {
  let flag = (0, _keys2.default)(_constants.DEPENDENCY_TYPE_FLAGS_MAP).find(
    key => _constants.DEPENDENCY_TYPE_FLAGS_MAP[key] === depType
  );

  return flag ? `--${flag}` : flag;
}

async function install(cwd, lockfileMode = 'default') {
  let localYarn = path.join(await getLocalBinPath(), 'yarn');
  let installFlags = [];

  switch (lockfileMode) {
    case 'frozen':
      installFlags.push('--frozen-lockfile');
      break;
    case 'pure':
      installFlags.push('--pure-lockfile');
      break;
    default:
      break;
  }

  let yarnUserAgent = await userAgent();
  let boltUserAgent = `bolt/${_constants.BOLT_VERSION} ${yarnUserAgent}`;

  await processes.spawn(localYarn, ['install', ...installFlags], {
    cwd,
    tty: true,
    env: (0, _extends3.default)({}, process.env, {
      npm_config_user_agent: boltUserAgent,
      bolt_config_user_agent: boltUserAgent
    }),
    useBasename: true
  });
}

async function add(pkg, dependencies, type) {
  let localYarn = path.join(await getLocalBinPath(), 'yarn');
  let spawnArgs = ['add'];
  if (!dependencies.length) return;

  dependencies.forEach(dep => {
    if (dep.version) {
      spawnArgs.push(`${dep.name}@${dep.version}`);
    } else {
      spawnArgs.push(dep.name);
    }
  });

  if (type) {
    let flag = depTypeToFlag(type);
    if (flag) spawnArgs.push(flag);
  }

  await processes.spawn(localYarn, spawnArgs, {
    cwd: pkg.dir,
    pkg: pkg,
    tty: true
  });
}

async function upgrade(pkg, dependencies = [], flags = []) {
  let localYarn = path.join(await getLocalBinPath(), 'yarn');
  let spawnArgs = ['upgrade'];

  if (dependencies.length) {
    dependencies.forEach(dep => {
      if (dep.version) {
        spawnArgs.push(`${dep.name}@${dep.version}`);
      } else {
        spawnArgs.push(dep.name);
      }
    });
  }

  await processes.spawn(localYarn, [...spawnArgs, ...flags], {
    cwd: pkg.dir,
    pkg: pkg,
    tty: true
  });
}

async function run(pkg, script, args = []) {
  let project = await _Project2.default.init(pkg.dir);
  let localYarn = path.join(await getLocalBinPath(), 'yarn');
  // We use a relative path because the absolute paths are very long and noisy in logs
  let localYarnRelative = path.relative(pkg.dir, localYarn);
  let spawnArgs = ['run', '-s', script];

  if (args.length) {
    spawnArgs = spawnArgs.concat(args);
  }
  await processes.spawn(localYarnRelative, spawnArgs, {
    cwd: pkg.dir,
    pkg: pkg,
    tty: true,
    useBasename: true
  });
}

async function runIfExists(pkg, script, args = []) {
  let scriptExists = await getScript(pkg, script);
  if (scriptExists) {
    await run(pkg, script, args);
  }
}

async function getScript(pkg, script) {
  let result = null;
  let scripts = pkg.config.getScripts();

  if (scripts && scripts[script]) {
    result = scripts[script];
  }

  if (!result) {
    let bins = await fs.readdirSafe(pkg.nodeModulesBin);

    if ((0, _arrayIncludes2.default)(bins, script)) {
      result = script;
    }
  }

  return result;
}

async function remove(dependencies, cwd) {
  let localYarn = path.join(await getLocalBinPath(), 'yarn');
  await processes.spawn(localYarn, ['remove', ...dependencies], {
    cwd,
    tty: true
  });
}

async function cliCommand(cwd, command = '', spawnArgs = []) {
  let localYarn = path.join(await getLocalBinPath(), 'yarn');

  return await processes.spawn(localYarn, [command, ...spawnArgs], {
    cwd,
    tty: true,
    useBasename: true
  });
}

async function info(cwd, spawnArgs = []) {
  let localYarn = path.join(await getLocalBinPath(), 'yarn');
  await processes.spawn(localYarn, ['info', ...spawnArgs], {
    cwd,
    tty: true
  });
}

async function userAgent() {
  let localYarn = path.join(await getLocalBinPath(), 'yarn');

  let { stdout: yarnUserAgent } = await processes.spawn(
    localYarn,
    ['config', 'get', 'user-agent'],
    {
      tty: false
    }
  );

  return yarnUserAgent.replace(/\n/g, '');
}

async function globalCli(command = '', dependencies) {
  let spawnArgs = ['global', command];
  if (!dependencies.length) return;

  dependencies.forEach(dep => {
    if (dep.version) {
      spawnArgs.push(`${dep.name}@${dep.version}`);
    } else {
      spawnArgs.push(dep.name);
    }
  });

  await processes.spawn('yarn', spawnArgs, {
    tty: true
  });
}
