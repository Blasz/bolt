'use strict';

exports.__esModule = true;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

exports.getPackageVersionCommits = getPackageVersionCommits;

var _Repository = require('../Repository');

var _Repository2 = _interopRequireDefault(_Repository);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _git = require('../utils/git');

var git = _interopRequireWildcard(_git);

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

async function getLastVersionCommitForPackage(repo, pkg) {
  let cwd = repo.dir;
  let filePath = pkg.config.filePath;
  let commits = await git.getCommitsToFile(filePath, { cwd });
  let matchedCommit = null;

  for (let commit of commits) {
    let parentCommit = await git.getCommitParent(commit.hash, { cwd });
    if (!parentCommit) continue;

    let before = await git.showFileAtCommit(filePath, parentCommit, {
      cwd
    });
    let after = await git.showFileAtCommit(filePath, commit.hash, { cwd });

    let jsonBefore = JSON.parse(before);
    let jsonAfter = JSON.parse(after);

    if (jsonAfter.version !== jsonBefore.version) {
      matchedCommit = commit;
      break;
    }
  }

  return matchedCommit;
}
async function getPackageVersionCommits(repo, packages) {
  let versionCommits = new _map2.default();

  for (let pkg of packages) {
    let commit = await getLastVersionCommitForPackage(repo, pkg);
    versionCommits.set(pkg, commit);
  }

  return versionCommits;
}
