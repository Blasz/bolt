'use strict';

exports.__esModule = true;
exports.string = string;
exports.boolean = boolean;
exports.number = number;
exports.toSpawnOpts = toSpawnOpts;
exports.toFilterOpts = toFilterOpts;
exports.toDependency = toDependency;
exports.toYarnInit = toYarnInit;
function string(val, name) {
  if (typeof val !== 'undefined' && typeof val !== 'string') {
    throw new Error(`Flag "${name}" must be string`);
  } else {
    return val;
  }
}
function boolean(val, name) {
  if (typeof val !== 'undefined' && typeof val !== 'boolean') {
    throw new Error(`Flag "${name}" must be boolean`);
  } else {
    return val;
  }
}

function number(val, name) {
  if (typeof val !== 'undefined' && typeof val !== 'number') {
    throw new Error(`Flag "${name}" must be number`);
  } else {
    return val;
  }
}

function toSpawnOpts(flags) {
  var spawnOpts = {};

  if ((flags.parallelNodes || flags.parallel) && flags.serial) {
    throw new Error('Commands cannot be run both serially and in parallel');
  }

  if (flags.parallelNodes) spawnOpts.orderMode = 'parallel-nodes';
  if (flags.parallel) spawnOpts.orderMode = 'parallel';
  if (flags.serial) spawnOpts.orderMode = 'serial';
  if (flags.bail) spawnOpts.bail = boolean(flags.bail, 'bail');
  // TODO:
  // if (flags.concurrency) spawnOpts.maxConcurrent = number(flags.concurrency, 'concurrency');

  return spawnOpts;
}

function toFilterOpts(flags) {
  var filterOpts = {};

  if (flags.only) filterOpts.only = string(flags.only, 'only');
  if (flags.onlyFs) filterOpts.onlyFs = string(flags.onlyFs, 'onlyFs');
  if (flags.ignore) filterOpts.ignore = string(flags.ignore, 'ignore');
  if (flags.ignoreFs) filterOpts.ignoreFs = string(flags.ignoreFs, 'ignoreFs');

  return filterOpts;
}

/**
 * Takes a string in one of the following forms:
 *  "pkgName", "pkgName@version", "@scope/pkgName", "@scope/pkgName@version"
 * and returns an object with the package name and version (if passed)
 */
function toDependency(dependencyString) {
  var _dependencyString$spl = dependencyString
      .split('@')
      .filter(function(part) {
        return part !== '';
      }),
    name = _dependencyString$spl[0],
    version = _dependencyString$spl[1];

  if (name.includes('/')) {
    name = '@' + name;
  }
  return version ? { name, version } : { name };
}

function toYarnInit(flags) {
  var flagOpts = {};

  if (flags.yes || flags.y) flagOpts.yes = true;
  if (flags.private || flags.p) flagOpts.private = true;

  return flagOpts;
}
