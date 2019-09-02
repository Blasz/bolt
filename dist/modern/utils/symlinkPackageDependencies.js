'use strict';

exports.__esModule = true;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _pathIsInside = require('path-is-inside');

var _pathIsInside2 = _interopRequireDefault(_pathIsInside);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

var _errors = require('./errors');

var _fs = require('./fs');

var fs = _interopRequireWildcard(_fs);

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _yarn = require('./yarn');

var yarn = _interopRequireWildcard(_yarn);

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

exports.default = async function symlinkPackageDependencies(
  project,
  pkg,
  dependencies
) {
  let projectDeps = project.pkg.getAllDependencies();
  let pkgDependencies = project.pkg.getAllDependencies();
  let packages = await project.getPackages();
  let {
    graph: dependencyGraph,
    valid: dependencyGraphValid
  } = await project.getDependencyGraph(packages);
  let pkgName = pkg.config.getName();
  // get all the dependencies that are internal workspaces in this project
  let internalDeps = (dependencyGraph.get(pkgName) || {}).dependencies || [];

  let directoriesToCreate = [];
  let symlinksToCreate = [];

  let valid = true;

  /*********************************************************************
   * Calculate all the external dependencies that need to be symlinked *
   **********************************************************************/

  directoriesToCreate.push(pkg.nodeModules, pkg.nodeModulesBin);

  for (let depName of dependencies) {
    let versionInProject = project.pkg.getDependencyVersionRange(depName);
    let versionInPkg = pkg.getDependencyVersionRange(depName);

    // If dependency is internal we can ignore it (we symlink below)
    if (dependencyGraph.has(depName)) {
      continue;
    }

    if (!versionInProject) {
      valid = false;
      logger.error(
        messages.depMustBeAddedToProject(pkg.config.getName(), depName)
      );
      continue;
    }

    if (!versionInPkg) {
      valid = false;
      logger.error(
        messages.couldntSymlinkDependencyNotExists(
          pkg.config.getName(),
          depName
        )
      );
      continue;
    }

    if (versionInProject !== versionInPkg) {
      valid = false;
      logger.error(
        messages.depMustMatchProject(
          pkg.config.getName(),
          depName,
          versionInProject,
          versionInPkg
        )
      );
      continue;
    }

    let src = _path2.default.join(project.pkg.nodeModules, depName);
    let dest = _path2.default.join(pkg.nodeModules, depName);

    symlinksToCreate.push({ src, dest, type: 'junction' });
  }

  /*********************************************************************
   * Calculate all the internal dependencies that need to be symlinked *
   **********************************************************************/

  for (let dependency of internalDeps) {
    let depWorkspace = dependencyGraph.get(dependency) || {};
    let src = depWorkspace.pkg.dir;
    let dest = _path2.default.join(pkg.nodeModules, dependency);

    symlinksToCreate.push({ src, dest, type: 'junction' });
  }

  if (!dependencyGraphValid || !valid) {
    throw new _errors.BoltError('Cannot symlink invalid set of dependencies.');
  }

  /********************************************************
   * Calculate all the bin files that need to be symlinked *
   *********************************************************/
  let projectBinFiles = await fs.readdirSafe(project.pkg.nodeModulesBin);

  // TODO: For now, we'll search through each of the bin files in the Project and find which ones are
  // dependencies we are symlinking. In the future, we should really be going through each dependency
  // and all of its dependencies and checking which ones expose bins so that all the transitive ones
  // are included too

  for (let binFile of projectBinFiles) {
    let binPath = _path2.default.join(project.pkg.nodeModulesBin, binFile);
    let binName = _path2.default.basename(binPath);

    // read the symlink to find the actual bin file (path will be relative to the symlink)
    let actualBinFileRelative = await fs.readlink(binPath);

    if (!actualBinFileRelative) {
      throw new _errors.BoltError(`${binName} is not a symlink`);
    }

    let actualBinFile = _path2.default.join(
      project.pkg.nodeModulesBin,
      actualBinFileRelative
    );

    // To find the name of the dep that created the bin we'll get its path from node_modules and
    // use the first one or two parts (two if the package is scoped)
    let binFileRelativeToNodeModules = _path2.default.relative(
      project.pkg.nodeModules,
      actualBinFile
    );
    let pathParts = binFileRelativeToNodeModules.split(_path2.default.sep);
    let pkgName = pathParts[0];

    if (pkgName.startsWith('@')) {
      pkgName += '/' + pathParts[1];
    }

    let workspaceBinPath = _path2.default.join(pkg.nodeModulesBin, binName);

    symlinksToCreate.push({
      src: binPath,
      dest: workspaceBinPath,
      type: 'exec'
    });
  }

  /*****************************************************************
   * Calculate all the internal bin files that need to be symlinked *
   ******************************************************************/

  // TODO: Same as above, we should really be making sure we get all the transitive bins as well

  for (let dependency of internalDeps) {
    let depWorkspace = dependencyGraph.get(dependency) || {};
    let depBinFiles =
      depWorkspace.pkg &&
      depWorkspace.pkg.config &&
      depWorkspace.pkg.config.getBin();

    if (!depBinFiles) {
      continue;
    }

    if (!(0, _arrayIncludes2.default)(dependencies, dependency)) {
      // dependency is not one we are supposed to symlink right now
      continue;
    }

    if (typeof depBinFiles === 'string') {
      // package may be scoped, name will only be the second part
      let binName = dependency.split('/').pop();
      let src = _path2.default.join(depWorkspace.pkg.dir, depBinFiles);
      let dest = _path2.default.join(pkg.nodeModulesBin, binName);

      symlinksToCreate.push({ src, dest, type: 'exec' });
      continue;
    }

    for (let [binName, binPath] of (0, _entries2.default)(depBinFiles)) {
      let src = _path2.default.join(depWorkspace.pkg.dir, String(binPath));
      let dest = _path2.default.join(pkg.nodeModulesBin, binName);

      // Just in case the symlink is already added (it might have already existed in the projects bin/)
      if (!symlinksToCreate.find(symlink => symlink.dest === dest)) {
        symlinksToCreate.push({ src, dest, type: 'exec' });
      }
    }
  }

  /**********************************
   * Create directories and symlinks *
   ***********************************/

  await yarn.runIfExists(pkg, 'preinstall');

  await _promise2.default.all(
    directoriesToCreate.map(dirName => {
      return fs.mkdirp(dirName);
    })
  );

  await _promise2.default.all(
    symlinksToCreate.map(async ({ src, dest, type }) => {
      await fs.symlink(src, dest, type);
    })
  );

  await yarn.runIfExists(pkg, 'postinstall');
  await yarn.runIfExists(pkg, 'prepublish');
  await yarn.runIfExists(pkg, 'prepare');
};
