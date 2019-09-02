'use strict';

exports.__esModule = true;
exports.ChildProcessError = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

exports.handleSignals = handleSignals;
exports.spawn = spawn;

var _crossSpawn = require('cross-spawn');

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _cleanUp = require('./cleanUp');

var cleanUp = _interopRequireWildcard(_cleanUp);

var _pLimit = require('p-limit');

var _pLimit2 = _interopRequireDefault(_pLimit);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

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

const limit = (0, _pLimit2.default)(_os2.default.cpus().length);
const processes = new _set2.default();

function handleSignals() {
  cleanUp.handleAllSignals(() => {
    for (let child of processes) {
      child.kill('SIGTERM');
    }
    processes.clear();
  });
}

class ChildProcessError extends Error {
  constructor(code, stdout, stderr) {
    super(stderr);

    Error.captureStackTrace(this, this.constructor);

    this.code = code;
    this.stdout = stdout;
    this.stderr = stderr;
  }
}

exports.ChildProcessError = ChildProcessError;
function spawn(cmd, args, opts = {}) {
  return limit(
    () =>
      new _promise2.default((resolve, reject) => {
        let stdoutBuf = Buffer.from('');
        let stderrBuf = Buffer.from('');
        let isTTY = process.stdout.isTTY && opts.tty;
        let cmdDisplayName = opts.useBasename
          ? _path2.default.basename(cmd)
          : cmd;

        let cmdStr = cmdDisplayName + ' ' + args.join(' ');

        let spawnOpts = {
          cwd: opts.cwd,
          env: opts.env || process.env
        };

        if (isTTY) {
          spawnOpts.shell = true;
          spawnOpts.stdio = 'inherit';
        }

        let child = (0, _crossSpawn2.default)(cmd, args, spawnOpts);

        processes.add(child);

        if (child.stdout) {
          child.stdout.on('data', data => {
            if (!opts.silent) {
              logger.stdout(cmdStr, data, opts.pkg);
            }

            stdoutBuf = Buffer.concat([stdoutBuf, data]);
          });
        }

        if (child.stderr) {
          child.stderr.on('data', data => {
            if (!opts.silent) {
              logger.stderr(cmdStr, data, opts.pkg);
            }
            stderrBuf = Buffer.concat([stderrBuf, data]);
          });
        }

        child.on('error', reject);

        child.on('close', code => {
          let stdout = stdoutBuf.toString();
          let stderr = stderrBuf.toString();

          processes.delete(child);

          if (code === 0) {
            resolve({ code, stdout, stderr });
          } else {
            reject(new ChildProcessError(code, stdout, stderr));
          }
        });
      })
  );
}
