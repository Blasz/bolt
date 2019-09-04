'use strict';

exports.__esModule = true;
exports.ChildProcessError = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(
  _possibleConstructorReturn2
);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

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

var limit = (0, _pLimit2.default)(_os2.default.cpus().length);
var processes = new _set2.default();

function handleSignals() {
  cleanUp.handleAllSignals(function() {
    for (
      var _iterator = processes,
        _isArray = Array.isArray(_iterator),
        _i = 0,
        _iterator = _isArray
          ? _iterator
          : (0, _getIterator3.default)(_iterator);
      ;

    ) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var child = _ref;

      child.kill('SIGTERM');
    }
    processes.clear();
  });
}

var ChildProcessError = (exports.ChildProcessError = (function(_Error) {
  (0, _inherits3.default)(ChildProcessError, _Error);

  function ChildProcessError(code, stdout, stderr) {
    (0, _classCallCheck3.default)(this, ChildProcessError);

    var _this = (0, _possibleConstructorReturn3.default)(
      this,
      _Error.call(this, stderr)
    );

    Error.captureStackTrace(_this, _this.constructor);

    _this.code = code;
    _this.stdout = stdout;
    _this.stderr = stderr;
    return _this;
  }

  return ChildProcessError;
})(Error));

function spawn(cmd, args) {
  var opts =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return limit(function() {
    return new _promise2.default(function(resolve, reject) {
      var stdoutBuf = Buffer.from('');
      var stderrBuf = Buffer.from('');
      var isTTY = process.stdout.isTTY && opts.tty;
      var cmdDisplayName = opts.useBasename
        ? _path2.default.basename(cmd)
        : cmd;

      var cmdStr = cmdDisplayName + ' ' + args.join(' ');

      var spawnOpts = {
        cwd: opts.cwd,
        env: opts.env || process.env
      };

      if (isTTY) {
        spawnOpts.shell = true;
        spawnOpts.stdio = 'inherit';
      }

      var child = (0, _crossSpawn2.default)(cmd, args, spawnOpts);

      processes.add(child);

      if (child.stdout) {
        child.stdout.on('data', function(data) {
          if (!opts.silent) {
            logger.stdout(cmdStr, data, opts.pkg);
          }

          stdoutBuf = Buffer.concat([stdoutBuf, data]);
        });
      }

      if (child.stderr) {
        child.stderr.on('data', function(data) {
          if (!opts.silent) {
            logger.stderr(cmdStr, data, opts.pkg);
          }
          stderrBuf = Buffer.concat([stderrBuf, data]);
        });
      }

      child.on('error', reject);

      child.on('close', function(code) {
        var stdout = stdoutBuf.toString();
        var stderr = stderrBuf.toString();

        processes.delete(child);

        if (code === 0) {
          resolve({ code, stdout, stderr });
        } else {
          reject(new ChildProcessError(code, stdout, stderr));
        }
      });
    });
  });
}
