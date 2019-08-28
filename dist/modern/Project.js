'use strict';

exports.__esModule = true;

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _Package = require('./Package');

var _Package2 = _interopRequireDefault(_Package);

var _Config = require('./Config');

var _Config2 = _interopRequireDefault(_Config);

var _fs = require('./utils/fs');

var fs = _interopRequireWildcard(_fs);

var _logger = require('./utils/logger');

var logger = _interopRequireWildcard(_logger);

var _promiseWrapper = require('./utils/promiseWrapper');

var _messages = require('./utils/messages');

var messages = _interopRequireWildcard(_messages);

var _errors = require('./utils/errors');

var _globs = require('./utils/globs');

var globs = _interopRequireWildcard(_globs);

var _taskGraphRunner = require('task-graph-runner');

var _taskGraphRunner2 = _interopRequireDefault(_taskGraphRunner);

var _minimatch = require('minimatch');

var _minimatch2 = _interopRequireDefault(_minimatch);

var _env = require('./utils/env');

var env = _interopRequireWildcard(_env);

var _chunkd = require('chunkd');

var _chunkd2 = _interopRequireDefault(_chunkd);

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

function taskWrapper(task, bail) {
  if (bail === undefined || bail) {
    return (0, _promiseWrapper.promiseWrapperSuccess)(task);
  } else {
    return (0, _promiseWrapper.promiseWrapper)(task);
  }
}
class Project {
  constructor(pkg) {
    this.pkg = pkg;
  }

  static async init(cwd) {
    let filePath = await _Config2.default.getProjectConfig(cwd);
    if (!filePath)
      throw new _errors.BoltError(`Unable to find root of project in ${cwd}`);
    let pkg = await _Package2.default.init(filePath);
    return new Project(pkg);
  }

  async getPackages() {
    let queue = [this.pkg];
    let packages = [];

    for (let item of queue) {
      let cwd = path.dirname(item.filePath);
      let patterns = item.getWorkspacesConfig();
      let matchedPaths = await globs.findWorkspaces(cwd, patterns);

      for (let matchedPath of matchedPaths) {
        let dir = path.join(cwd, matchedPath);
        let stats = await fs.stat(dir);
        if (!stats.isDirectory()) continue;

        let filePath = path.join(dir, 'package.json');
        let pkg;
        try {
          pkg = await _Package2.default.init(filePath);
        } catch (err) {
          if (err instanceof _errors.BoltError) {
            // skip cases where unable to initialize package and bolt error was throw
            // this is typically because the package.json was not found
            continue;
          }
          throw err;
        }

        queue.push(pkg);
        packages.push(pkg);
      }
    }

    return packages;
  }

  async getDependencyGraph(packages, excludedDependencyTypes) {
    let graph = new _map2.default();
    let queue = [this.pkg];
    let packagesByName = { [this.pkg.getName()]: this.pkg };
    let valid = true;

    for (let pkg of packages) {
      queue.push(pkg);
      packagesByName[pkg.getName()] = pkg;
    }

    for (let pkg of queue) {
      let name = pkg.config.getName();
      let dependencies = [];
      let allDependencies = pkg.getAllDependencies(excludedDependencyTypes);

      for (let [depName, depVersion] of allDependencies) {
        let match = packagesByName[depName];
        if (!match) continue;

        let actual = depVersion;
        let expected = match.config.getVersion();

        // Workspace dependencies only need to semver satisfy, not '==='
        if (!_semver2.default.satisfies(expected, depVersion)) {
          valid = false;
          logger.error(
            messages.packageMustDependOnCurrentVersion(
              name,
              depName,
              expected,
              depVersion
            )
          );
          continue;
        }

        dependencies.push(depName);
      }

      graph.set(name, { pkg, dependencies });
    }

    return { graph, valid };
  }

  async getDependentsGraph(packages, excludedDepTypes) {
    let graph = new _map2.default();
    let { valid, graph: dependencyGraph } = await this.getDependencyGraph(
      packages,
      excludedDepTypes
    );

    let dependentsLookup = {};

    packages.forEach(pkg => {
      dependentsLookup[pkg.config.getName()] = {
        pkg,
        dependents: []
      };
    });

    packages.forEach(pkg => {
      let dependent = pkg.getName();
      let valFromDependencyGraph = dependencyGraph.get(dependent) || {};
      let dependencies = valFromDependencyGraph.dependencies || [];

      dependencies.forEach(dependency => {
        dependentsLookup[dependency].dependents.push(dependent);
      });
    });

    // can't use Object.entries here as the flow type for it is Array<[string, mixed]>;
    (0, _keys2.default)(dependentsLookup).forEach(key => {
      graph.set(key, dependentsLookup[key]);
    });

    return { valid, graph };
  }

  async runPackageTasks(packages, spawnOpts, task) {
    const wrappedTask = taskWrapper(task, spawnOpts.bail);
    let results;
    if (spawnOpts.orderMode === 'serial') {
      results = await this.runPackageTasksSerial(packages, wrappedTask);
    } else if (spawnOpts.orderMode === 'parallel') {
      results = await this.runPackageTasksParallel(packages, wrappedTask);
    } else if (spawnOpts.orderMode === 'parallel-nodes') {
      results = await this.runPackageTasksParallelNodes(packages, wrappedTask);
    } else {
      results = await this.runPackageTasksGraphParallel(packages, wrappedTask);
    }

    results.forEach(r => {
      if (r.status === 'error') {
        throw r.error;
      }
    });
  }

  async runPackageTasksSerial(packages, task) {
    const results = [];
    for (let pkg of packages) {
      results.push(await task(pkg));
    }
    return results;
  }

  runPackageTasksParallel(packages, task) {
    return _promise2.default.all(packages.map(pkg => task(pkg)));
  }

  async runPackageTasksParallelNodes(packages, task) {
    packages = packages.sort((a, b) => {
      return a.filePath.localeCompare(b.filePath, [], { numeric: true });
    });

    let index = env.get('CI_NODE_INDEX');
    let total = env.get('CI_NODE_TOTAL');

    if (typeof index === 'number' && typeof total === 'number') {
      let all = packages.length;
      packages = (0, _chunkd2.default)(packages, index, total);
      logger.info(
        messages.taskRunningAcrossCINodes(total, packages.length, all)
      );
    }

    return this.runPackageTasksParallel(packages, task);
  }

  async runPackageTasksGraphParallel(packages, task) {
    let { graph: dependentsGraph, valid } = await this.getDependencyGraph(
      packages,
      ['devDependencies']
    );

    let graph = new _map2.default();

    for (let [pkgName, pkgInfo] of dependentsGraph) {
      graph.set(pkgName, pkgInfo.dependencies);
    }

    let { safe, values } = await (0, _taskGraphRunner2.default)({
      graph,
      force: true,
      task: async pkgName => {
        let pkg = this.getPackageByName(packages, pkgName);
        if (pkg) {
          return task(pkg);
        }
      }
    });

    if (!safe) {
      logger.warn(messages.unsafeCycles());
    }
    return (0, _values2.default)(values);
  }

  getPackageByName(packages, pkgName) {
    return packages.find(pkg => pkg.getName() === pkgName);
  }

  filterPackages(packages, opts) {
    let relativeDir = pkg => path.relative(this.pkg.dir, pkg.dir);

    let packageNames = packages.map(pkg => pkg.getName());
    let packageDirs = packages.map(pkg => relativeDir(pkg));

    let filteredByName = globs.matchOnlyAndIgnore(
      packageNames,
      opts.only,
      opts.ignore
    );

    let filteredByDir = globs.matchOnlyAndIgnore(
      packageDirs,
      opts.onlyFs,
      opts.ignoreFs
    );

    let filteredPackages = packages.filter(
      pkg =>
        (0, _arrayIncludes2.default)(filteredByName, pkg.getName()) &&
        (0, _arrayIncludes2.default)(filteredByDir, relativeDir(pkg))
    );

    if (filteredPackages.length === 0) {
      logger.warn(messages.noPackagesMatchFilters());
    }

    return filteredPackages;
  }
}
exports.default = Project;
