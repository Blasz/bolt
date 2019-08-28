'use strict';

exports.__esModule = true;

var _git = require('./utils/git');

var git = _interopRequireWildcard(_git);

var _errors = require('./utils/errors');

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

class Repository {
  constructor(dir) {
    this.dir = dir;
  }

  static async init(cwd) {
    let dir = await git.getRootDirectory({ cwd });

    if (!dir) {
      throw new _errors.BoltError(
        `There is no git repository in the current working directory`
      );
    }

    return new Repository(dir);
  }
}
exports.default = Repository;
