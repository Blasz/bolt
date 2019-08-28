'use strict';

exports.__esModule = true;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.title = title;
exports.info = info;
exports.warn = warn;
exports.error = error;
exports.success = success;
exports.stdout = stdout;
exports.stderr = stderr;
exports.cmd = cmd;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _messages = require('./messages');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function fmt(str) {
  var opts =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var result = (0, _messages.toString)(str);

  var prefix = opts.prefix || '';

  if (opts.emoji) {
    prefix = `${opts.emoji}  ${prefix}`;
  }

  if (prefix) {
    result = result
      .trimRight()
      .split('\n')
      .map(function(line) {
        return `${prefix} ${line}`;
      })
      .join('\n');
  }

  return result;
}

function prompt(pkg) {
  return (pkg ? '(' + pkg.config.getName() + ') ' : '') + '$ ';
}

function write(message) {
  var opts =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var err =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (err) {
    console.error(fmt(message, opts));
  } else {
    console.log(fmt(message, opts));
  }
}

function title(title, subtitle) {
  var opts =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var str = _chalk2.default.bold(title);
  if (subtitle) str += ' ' + _chalk2.default.dim(subtitle);
  write(str, opts);
}

var INFO_PREFIX = _chalk2.default.cyan('info');
var WARN_PREFIX = _chalk2.default.yellow('warn');
var ERROR_PREFIX = _chalk2.default.red('error');
var SUCCESS_PREFIX = _chalk2.default.green('success');

function info(message) {
  var opts =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  write(message, (0, _extends3.default)({ prefix: INFO_PREFIX }, opts), true);
}

function warn(message) {
  var opts =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  write(message, (0, _extends3.default)({ prefix: WARN_PREFIX }, opts), true);
}

function error(message) {
  var opts =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  write(message, (0, _extends3.default)({ prefix: ERROR_PREFIX }, opts), true);
}

function success(message) {
  var opts =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  write(
    message,
    (0, _extends3.default)({ prefix: SUCCESS_PREFIX }, opts),
    true
  );
}

function stdout(cmd, data, pkg) {
  var opts =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var prefix = _chalk2.default.cyan(prompt(pkg) + cmd);
  write(data, (0, _extends3.default)({ prefix }, opts), false);
}

function stderr(cmd, data, pkg) {
  var opts =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var prefix = _chalk2.default.red(prompt(pkg) + cmd);
  write(data, (0, _extends3.default)({ prefix }, opts), true);
}

function cmd(cmd, args) {
  var opts =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var msg = _chalk2.default.dim(prompt() + cmd);
  if (args.length) {
    msg += ' ';
    msg += _chalk2.default.magenta(args.join(' '));
  }
  write(msg, {}, true);
}
