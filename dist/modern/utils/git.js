'use strict';

exports.__esModule = true;
exports.MAGIC_EMPTY_STATE_HASH = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.initRepository = initRepository;
exports.getRootDirectory = getRootDirectory;
exports.status = status;
exports.addAll = addAll;
exports.addFiles = addFiles;
exports.commit = commit;
exports.getAllCommits = getAllCommits;
exports.listTags = listTags;
exports.addTag = addTag;
exports.removeTag = removeTag;
exports.getCommitsToFile = getCommitsToFile;
exports.getCommitParent = getCommitParent;
exports.showFileAtCommit = showFileAtCommit;
exports.getDiffForPathSinceCommit = getDiffForPathSinceCommit;

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _processes = require('./processes');

var processes = _interopRequireWildcard(_processes);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _pLimit = require('p-limit');

var _pLimit2 = _interopRequireDefault(_pLimit);

var _slash = require('slash');

var _slash2 = _interopRequireDefault(_slash);

var _tempWrite = require('temp-write');

var _tempWrite2 = _interopRequireDefault(_tempWrite);

var _os = require('os');

var os = _interopRequireWildcard(_os);

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

// We should never run more than one git command at a time, git enforces this
// for a lot of commands and will error.
const gitCommandLimit = (0, _pLimit2.default)(1); // Parts of this source are modified from lerna:
// lerna: https://github.com/lerna/lerna/blob/master/LICENSE

const GIT_LOG_LINE_FORMAT_FLAG = '--pretty=format:%H %s';
const GIT_LOG_LINE_FORMAT_SPLITTER = /^([a-zA-Z0-9]+) (.*)/;

function git(args, opts) {
  return gitCommandLimit(() => {
    return processes.spawn(
      'git',
      args,
      (0, _extends3.default)({ silent: true }, opts)
    );
  });
}

function toGitPath(cwd, filePath) {
  return (0, _slash2.default)(path.relative(cwd, filePath));
}

function isGitFatalError(err) {
  return err.code === 128;
}

function linesToArray(lines) {
  return lines === '' ? [] : lines.split(os.EOL);
}

function formattedLogLinesToArray(lines) {
  return linesToArray(lines).map(line => {
    let [, hash, message] = GIT_LOG_LINE_FORMAT_SPLITTER.exec(line);
    return { hash, message };
  });
}

async function initRepository(opts) {
  await git(['init'], { cwd: opts.cwd });
}

async function getRootDirectory(opts) {
  try {
    let { stdout } = await git(['rev-parse', '--show-toplevel'], {
      cwd: opts.cwd
    });
    return stdout.trim();
  } catch (err) {
    if (!isGitFatalError(err)) {
      throw err;
    }
  }
  return null;
}

async function status(opts) {
  let { stdout } = await git(['status', '--porcelain'], {
    cwd: opts.cwd
  });
  return stdout.trim();
}

async function addAll(opts) {
  await git(['add', '-A'], { cwd: opts.cwd });
}

async function addFiles(filePaths, opts) {
  let gitPaths = filePaths.map(filePath => toGitPath(opts.cwd, filePath));
  await git(['add', ...gitPaths], { cwd: opts.cwd });
}

async function commit(message, opts) {
  let args = ['commit'];

  if (message.includes(os.EOL)) {
    args.push('-F', await (0, _tempWrite2.default)(message, 'bolt-commit.txt'));
  } else {
    args.push('-m', message);
  }

  await git(args, { cwd: opts.cwd });
}

async function getAllCommits(opts) {
  try {
    let { stdout } = await git(['log', '--pretty=format:%H %s'], {
      cwd: opts.cwd
    });
    return formattedLogLinesToArray(stdout.trim());
  } catch (err) {
    if (!isGitFatalError(err)) {
      throw err;
    }
  }
  return [];
}

async function listTags(opts) {
  try {
    let { stdout } = await git(['tag'], { cwd: opts.cwd });
    return linesToArray(stdout.trim());
  } catch (err) {
    if (!isGitFatalError(err)) {
      throw err;
    }
  }
  return [];
}

async function addTag(tagName, opts) {
  await git(['tag', tagName, '-m', tagName], { cwd: opts.cwd });
}

async function removeTag(tagName, opts) {
  await git(['tag', '-d', tagName], { cwd: opts.cwd });
}

async function getCommitsToFile(filePath, opts) {
  let gitPath = toGitPath(opts.cwd, filePath);
  try {
    let { stdout } = await git(
      ['log', GIT_LOG_LINE_FORMAT_FLAG, '--follow', gitPath],
      {
        cwd: opts.cwd
      }
    );
    return formattedLogLinesToArray(stdout.trim());
  } catch (err) {
    if (!isGitFatalError(err)) {
      throw err;
    }
  }
  return [];
}

async function getCommitParent(commitHash, opts) {
  try {
    let { stdout } = await git(['rev-parse', `${commitHash}^`], {
      cwd: opts.cwd
    });
    return stdout.trim();
  } catch (err) {
    if (!isGitFatalError(err)) {
      throw err;
    }
  }
  return null;
}

async function showFileAtCommit(filePath, commitHash, opts) {
  let gitPath = toGitPath(opts.cwd, filePath);
  let { stdout } = await git(['show', `${commitHash}:${gitPath}`], {
    cwd: opts.cwd
  });
  return stdout;
}

const MAGIC_EMPTY_STATE_HASH = (exports.MAGIC_EMPTY_STATE_HASH =
  '4b825dc642cb6eb9a060e54bf8d69288fbee4904');

async function getDiffForPathSinceCommit(filePath, commitHash, opts) {
  let gitPath = toGitPath(opts.cwd, filePath);
  let { stdout } = await git(
    ['diff', commitHash, '--color=always', '--', filePath],
    {
      cwd: opts.cwd
    }
  );
  return stdout.trim();
}
