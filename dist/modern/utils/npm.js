'use strict';

exports.__esModule = true;

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.info = info;
exports.infoAllow404 = infoAllow404;
exports.publish = publish;
exports.addTag = addTag;
exports.removeTag = removeTag;
exports.login = login;
exports.logout = logout;
exports.cliCommand = cliCommand;

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _processes = require('./processes');

var processes = _interopRequireWildcard(_processes);

var _pLimit = require('p-limit');

var _pLimit2 = _interopRequireDefault(_pLimit);

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

const npmRequestLimit = (0, _pLimit2.default)(40);

function getCorrectRegistry() {
  let registry =
    process.env.npm_config_registry === 'https://registry.yarnpkg.com'
      ? undefined
      : process.env.npm_config_registry;
  return registry;
}

function info(pkgName) {
  return npmRequestLimit(async () => {
    logger.info(messages.npmInfo(pkgName));

    // Due to a couple of issues with yarnpkg, we also want to override the npm registry when doing
    // npm info.
    // Issues: We sometimes get back cached responses, i.e old data about packages which causes
    // `publish` to behave incorrectly. It can also cause issues when publishing private packages
    // as they will always give a 404, which will tell `publish` to always try to publish.
    // See: https://github.com/yarnpkg/yarn/issues/2935#issuecomment-355292633
    const envOverride = {
      npm_config_registry: getCorrectRegistry()
    };

    let result = await processes.spawn('npm', ['info', pkgName, '--json'], {
      silent: true,
      env: (0, _assign2.default)({}, process.env, envOverride)
    });

    return JSON.parse(result.stdout);
  });
}

async function infoAllow404(pkgName) {
  try {
    let pkgInfo = await info(pkgName);
    return { published: true, pkgInfo };
  } catch (error) {
    let output = JSON.parse(error.stdout);
    if (output.error && output.error.code === 'E404') {
      logger.warn(messages.npmInfo404(pkgName));
      return { published: false, pkgInfo: {} };
    }
    throw error;
  }
}

function publish(pkgName, opts = {}) {
  return npmRequestLimit(async () => {
    logger.info(messages.npmPublish(pkgName));
    let publishFlags = opts.access ? ['--access', opts.access] : [];
    try {
      // Due to a super annoying issue in yarn, we have to manually override this env variable
      // See: https://github.com/yarnpkg/yarn/issues/2935#issuecomment-355292633
      const envOverride = {
        npm_config_registry: getCorrectRegistry()
      };
      await processes.spawn('npm', ['publish', ...publishFlags], {
        cwd: opts.cwd,
        env: (0, _assign2.default)({}, process.env, envOverride)
      });
      return { published: true };
    } catch (error) {
      // Publish failed
      return { published: false };
    }
  });
}

function addTag(pkgName, pkgVersion, tag) {
  return npmRequestLimit(async () => {
    logger.info(messages.npmDistTagAdd(pkgName, pkgVersion, tag));
    let pkgStr = `${pkgName}@${pkgVersion}`;
    let result = await processes.spawn('npm', ['dist-tag', 'add', pkgStr, tag]);
    // An existing tag will return a warning to stderr, but a 0 status code
    if (result.stderr) {
      throw new _errors.BoltError(
        `Could not add tag ${tag} to ${pkgStr} as one already exists`
      );
    }
    return result;
  });
}

function removeTag(pkgName, tag) {
  return npmRequestLimit(async () => {
    logger.info(messages.npmDistTagRm(pkgName, tag));

    try {
      return await processes.spawn('npm', ['dist-tag', 'rm', pkgName, tag], {
        silent: true
      });
    } catch (error) {
      // The dist tag not existing is unexpected, but shouldn't prevent execution
      if (error.code === 1 && error.stderr.includes('is not a dist-tag on')) {
        logger.warn(messages.notDistTagFound(tag, pkgName));
        return;
      } else if (
        error.stderr &&
        error.stderr.startsWith('npm ERR! code E404')
      ) {
        // the package does not exist yet, warn but dont error
        logger.warn(messages.npmPackageCouldNotBeFound(pkgName));
        return;
      }
      throw error;
    }
  });
}

async function login(cwd) {
  await processes.spawn('npm', ['login'], {
    cwd,
    tty: true
  });
}

async function logout(cwd) {
  await processes.spawn('npm', ['logout'], {
    cwd,
    tty: true
  });
}

async function cliCommand(cwd, command = '', spawnArgs = []) {
  return await processes.spawn('npm', [command, ...spawnArgs], {
    cwd,
    tty: true
  });
}
