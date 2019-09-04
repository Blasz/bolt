'use strict';

exports.__esModule = true;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _pkgUp = require('pkg-up');

var _pkgUp2 = _interopRequireDefault(_pkgUp);

var _detectIndent = require('detect-indent');

var _detectIndent2 = _interopRequireDefault(_detectIndent);

var _detectNewline = require('detect-newline');

var _detectNewline2 = _interopRequireDefault(_detectNewline);

var _parseJson = require('parse-json');

var _parseJson2 = _interopRequireDefault(_parseJson);

var _fs = require('./utils/fs');

var fs = _interopRequireWildcard(_fs);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _globs = require('./utils/globs');

var globs = _interopRequireWildcard(_globs);

var _logger = require('./utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./utils/messages');

var messages = _interopRequireWildcard(_messages);

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

async function getPackageStack(cwd) {
  let stack = [];
  let searching = cwd;

  while (searching) {
    let filePath = await Config.findConfigFile(searching);

    if (filePath) {
      let config = await Config.init(filePath);
      stack.unshift({ filePath, config });
      searching = path.dirname(path.dirname(filePath));
    } else {
      searching = null;
    }
  }

  return stack;
}

function toArrayOfStrings(value, message) {
  if (!Array.isArray(value)) {
    throw new _errors.BoltError(message);
  }

  return value.map(item => {
    if (typeof item !== 'string') {
      throw new _errors.BoltError(message);
    } else {
      return item;
    }
  });
}

function toObject(value, message) {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new _errors.BoltError(message);
  } else {
    return value;
  }
}

function toObjectOfStrings(value, message) {
  let safeRef = toObject(value, message);
  let safeCopy = {};

  (0, _keys2.default)(safeRef).forEach(k => {
    if (typeof safeRef[k] !== 'string') {
      throw new _errors.BoltError(message);
    } else {
      safeCopy[k] = safeRef[k];
    }
  });

  return safeCopy;
}

class Config {
  constructor(filePath, fileContents) {
    this.filePath = filePath;
    this.fileContents = fileContents;
    try {
      this.indent = (0, _detectIndent2.default)(fileContents).indent || '  ';
      this.newline =
        (0, _detectNewline2.default)(fileContents) || _os2.default.EOL;
      this.json = (0, _parseJson2.default)(fileContents);
    } catch (e) {
      if (e.name === 'JSONError') {
        logger.error(messages.errorParsingJSON(filePath), {
          emoji: '💥',
          prefix: false
        });
      }
      throw e;
    }
  }

  static async findConfigFile(filePath) {
    return await (0, _pkgUp2.default)(filePath);
  }

  static async init(filePath) {
    let fileContents;
    try {
      fileContents = await fs.readFile(filePath);
    } catch (e) {
      if (e.code === 'ENOENT') {
        throw new _errors.BoltError(
          messages.cannotInitConfigMissingPkgJSON(filePath)
        );
      }
      throw e;
    }
    return new Config(filePath, fileContents.toString());
  }

  async write(json) {
    let fileContents =
      (0, _stringify2.default)(json, null, this.indent).replace(
        /\n/g,
        this.newline
      ) + this.newline;
    await fs.writeFile(this.filePath, fileContents);
    this.fileContents = fileContents;
    this.json = json;
  }

  static async getProjectConfig(cwd) {
    let stack = await getPackageStack(cwd);
    if (stack.length === 0) return null;

    let highest = stack.pop();
    let matches = [highest];

    while (stack.length) {
      let current = stack.pop();
      let patterns = current.config.getWorkspaces();

      if (patterns) {
        let filePaths = matches.map(match => {
          return path.relative(
            path.dirname(current.filePath),
            path.dirname(match.filePath)
          );
        });

        let found = globs.matchWorkspaces(filePaths, patterns);

        if (found.length) {
          matches.push(current);
          highest = current;
        }
      }
    }

    return highest.filePath;
  }

  getConfig() {
    if (this.invalid) {
      throw new _errors.BoltError(
        `You need to refresh the Config object for ${this.filePath}`
      );
    }
    let config = this.json;

    if (
      typeof config !== 'object' ||
      config === null ||
      Array.isArray(config)
    ) {
      throw new _errors.BoltError(
        `package.json must be an object. See: "${this.filePath}"`
      );
    }

    return config;
  }

  invalidate() {
    this.invalid = true;
  }

  getDescriptor() {
    if (this.json && typeof this.json.name === 'string') {
      return this.json.name;
    } else {
      return this.filePath;
    }
  }

  getName() {
    let config = this.getConfig();
    let name = config.name;
    if (typeof name !== 'string') {
      throw new _errors.BoltError(
        `package.json#name must be a string. See "${this.filePath}"`
      );
    }
    return name;
  }

  getVersion() {
    let config = this.getConfig();
    let version = config.version;
    if (typeof version !== 'string') {
      throw new _errors.BoltError(
        `package.json#version must be a string. See "${this.filePath}"`
      );
    }
    return version;
  }

  getPrivate() {
    let config = this.getConfig();
    let priv = config.private;
    if (typeof priv !== 'undefined' && typeof priv !== 'boolean') {
      throw new _errors.BoltError(
        `package.json#private must be a boolean. See "${this.filePath}"`
      );
    }
    return priv;
  }

  getBoltConfig() {
    let config = this.getConfig();
    let boltConfig = config.bolt;
    if (typeof boltConfig === 'undefined') return;
    return toObject(
      boltConfig,
      `package.json#bolt must be an object. See "${this.filePath}"`
    );
  }

  getBoltConfigVersion() {
    let config = this.getBoltConfig();
    let boltVersion = config && config.version;
    if (typeof boltVersion === 'string') {
      return boltVersion;
    }
    return;
  }

  getWorkspaces() {
    let boltConfig = this.getBoltConfig();
    if (typeof boltConfig === 'undefined') return;
    let workspaces = boltConfig.workspaces;
    if (typeof workspaces === 'undefined') return;
    return toArrayOfStrings(
      workspaces,
      `package.json#bolt.workspaces must be an array of globs. See "${this.filePath}"`
    );
  }

  getDeps(depType) {
    let config = this.getConfig();
    let deps = config[depType];
    if (typeof deps === 'undefined') return;
    return toObjectOfStrings(
      deps,
      `package.json#${depType} must be an object of strings. See "${this.filePath}"`
    );
  }

  getScripts() {
    let config = this.getConfig();
    let scripts = config.scripts;
    if (typeof scripts === 'undefined') return;
    return toObjectOfStrings(
      scripts,
      `package.json#scripts must be an object of strings. See "${this.filePath}"`
    );
  }

  getBin() {
    let config = this.getConfig();
    let bin = config.bin;
    if (typeof bin === 'undefined') return;
    if (typeof bin === 'string') return bin;
    return toObjectOfStrings(
      bin,
      `package.json#bin must be an object of strings or a string. See "${this.filePath}"`
    );
  }
}
exports.default = Config;
