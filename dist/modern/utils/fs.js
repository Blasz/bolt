'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.readFile = readFile;
exports.writeFile = writeFile;
exports.mkdirp = mkdirp;
exports.rimraf = rimraf;
exports.stat = stat;
exports.lstat = lstat;
exports.realpath = realpath;
exports.symlink = symlink;
exports.readdir = readdir;
exports.readdirSafe = readdirSafe;
exports.readlink = readlink;
exports.dirExists = dirExists;
exports.symlinkExists = symlinkExists;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cmdShim2 = require('cmd-shim');

var _cmdShim3 = _interopRequireDefault(_cmdShim2);

var _readCmdShim2 = require('read-cmd-shim');

var _readCmdShim3 = _interopRequireDefault(_readCmdShim2);

var _typeablePromisify = require('typeable-promisify');

var _typeablePromisify2 = _interopRequireDefault(_typeablePromisify);

var _makeDir = require('make-dir');

var _makeDir2 = _interopRequireDefault(_makeDir);

var _rimraf2 = require('rimraf');

var _rimraf3 = _interopRequireDefault(_rimraf2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function readFile(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.readFile(filePath, cb)
  );
} // Parts of this source are modified from npm and lerna:
// npm: https://github.com/npm/npm/blob/master/LICENSE
// lerna: https://github.com/lerna/lerna/blob/master/LICENSE

function writeFile(filePath, fileContents) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.writeFile(filePath, fileContents, cb)
  );
}

function mkdirp(filePath) {
  return (0, _makeDir2.default)(filePath);
}

function rimraf(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    (0, _rimraf3.default)(filePath, cb)
  );
}

function stat(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.stat(filePath, cb)
  );
}

function lstat(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.lstat(filePath, cb)
  );
}

function unlink(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.unlink(filePath, cb)
  );
}

function realpath(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.realpath(filePath, cb)
  );
}

function _symlink(src, dest, type) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.symlink(src, dest, type, cb)
  );
}

function stripExtension(filePath) {
  return _path2.default.join(
    _path2.default.dirname(filePath),
    _path2.default.basename(filePath, _path2.default.extname(filePath))
  );
}

async function cmdShim(src, dest) {
  const currentShimTarget = _path2.default.resolve(
    _path2.default.dirname(src),
    await readCmdShim(src)
  );
  await (0, _typeablePromisify2.default)(cb =>
    (0, _cmdShim3.default)(currentShimTarget, stripExtension(dest), cb)
  );
}

async function createSymbolicLink(src, dest, type) {
  try {
    await lstat(dest);
    await rimraf(dest);
  } catch (err) {
    if (err.code === 'EPERM') throw err;
  }
  await _symlink(src, dest, type);
}

async function createPosixSymlink(origin, dest, type) {
  if (type === 'exec') {
    type = 'file';
  }

  let src = _path2.default.relative(_path2.default.dirname(dest), origin);

  return await createSymbolicLink(src, dest, type);
}

async function createWindowsSymlink(src, dest, type) {
  if (type === 'exec') {
    return await cmdShim(src, dest);
  } else {
    return await createSymbolicLink(src, dest, type);
  }
}

async function symlink(src, dest, type) {
  if (dest.includes(_path2.default.sep)) {
    await mkdirp(_path2.default.dirname(dest));
  }

  if (process.platform === 'win32') {
    return await createWindowsSymlink(src, dest, type);
  } else {
    return await createPosixSymlink(src, dest, type);
  }
}

async function readdir(dir) {
  return (0, _typeablePromisify2.default)(cb => _fs2.default.readdir(dir, cb));
}

// Return an empty array if a directory doesnt exist (but still throw if errof if dir is a file)
async function readdirSafe(dir) {
  return stat(dir)
    .catch(err => _promise2.default.resolve([]))
    .then(statsOrArray => {
      if (statsOrArray instanceof Array) return statsOrArray;
      if (!statsOrArray.isDirectory())
        throw new Error(dir + ' is not a directory');
      return readdir(dir);
    });
}

function readCmdShim(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    (0, _readCmdShim3.default)(filePath, cb)
  );
}

function _readlink(filePath) {
  return (0, _typeablePromisify2.default)(cb =>
    _fs2.default.readlink(filePath, cb)
  );
}

// Copied from:
// https://github.com/npm/npm/blob/d081cc6c8d73f2aa698aab36605377c95e916224/lib/utils/gently-rm.js#L280-L297
async function readlink(filePath) {
  let stat = await lstat(filePath);
  let result = null;

  if (stat.isSymbolicLink()) {
    result = await _readlink(filePath);
  } else {
    try {
      result = await readCmdShim(filePath);
    } catch (err) {
      if (err.code !== 'ENOTASHIM' && err.code !== 'EISDIR') {
        throw err;
      }
    }
  }

  return result;
}

async function dirExists(dir) {
  try {
    let _stat = await stat(dir);
    return _stat.isDirectory();
  } catch (err) {
    return false;
  }
}

async function symlinkExists(filePath) {
  try {
    let stat = await lstat(filePath);
    return stat.isSymbolicLink();
  } catch (err) {
    return false;
  }
}
