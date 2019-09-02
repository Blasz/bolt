'use strict';

exports.__esModule = true;
exports.toString = toString;
exports.toMessage = toMessage;
exports.packageMustDependOnCurrentVersion = packageMustDependOnCurrentVersion;
exports.depMustBeAddedToProject = depMustBeAddedToProject;
exports.depMustMatchProject = depMustMatchProject;
exports.projectCannotDependOnWorkspace = projectCannotDependOnWorkspace;
exports.invalidBoltVersion = invalidBoltVersion;
exports.unableToUpdateDepVersion = unableToUpdateDepVersion;
exports.addedPackageDependency = addedPackageDependency;
exports.updatedPackageDependency = updatedPackageDependency;
exports.removedPackageDependency = removedPackageDependency;
exports.unableToNormalizeVersionRanges = unableToNormalizeVersionRanges;
exports.dependencyNotInstalled = dependencyNotInstalled;
exports.cannotRemoveDependencyDependendOnByWorkspaces = cannotRemoveDependencyDependendOnByWorkspaces;
exports.externalDepsPassedToUpdatePackageVersions = externalDepsPassedToUpdatePackageVersions;
exports.runWorkspacesRemoveDependency = runWorkspacesRemoveDependency;
exports.couldntRemoveDependencies = couldntRemoveDependencies;
exports.couldntSymlinkDependencyNotExists = couldntSymlinkDependencyNotExists;
exports.doneInSeconds = doneInSeconds;
exports.boltVersion = boltVersion;
exports.nodeVersion = nodeVersion;
exports.helpContent = helpContent;
exports.noPackagesMatchFilters = noPackagesMatchFilters;
exports.removedDependencies = removedDependencies;
exports.npmPackageCouldNotBeFound = npmPackageCouldNotBeFound;
exports.notDistTagFound = notDistTagFound;
exports.npmDistTagRm = npmDistTagRm;
exports.npmDistTagAdd = npmDistTagAdd;
exports.npmPublish = npmPublish;
exports.npmInfo = npmInfo;
exports.npmInfo404 = npmInfo404;
exports.lockingAllPackages = lockingAllPackages;
exports.validatingProject = validatingProject;
exports.installingProjectDependencies = installingProjectDependencies;
exports.linkingWorkspaceDependencies = linkingWorkspaceDependencies;
exports.linkingWorkspaceBinaries = linkingWorkspaceBinaries;
exports.publishingPackage = publishingPackage;
exports.noUnpublishedPackagesToPublish = noUnpublishedPackagesToPublish;
exports.willPublishUnpublishedPackage = willPublishUnpublishedPackage;
exports.willPublishPackage = willPublishPackage;
exports.willNotPublishPackage = willNotPublishPackage;
exports.successfullyPublishedPackage = successfullyPublishedPackage;
exports.failedToPublishPackage = failedToPublishPackage;
exports.couldNotBeNormalized = couldNotBeNormalized;
exports.installedAndLinkedWorkspaces = installedAndLinkedWorkspaces;
exports.cannotInstallWorkspaceInProject = cannotInstallWorkspaceInProject;
exports.cannotUpgradeWorkspaceDependencyInProject = cannotUpgradeWorkspaceDependencyInProject;
exports.errorParsingJSON = errorParsingJSON;
exports.invalidBoltWorkspacesFromUpdate = invalidBoltWorkspacesFromUpdate;
exports.unableToInstall = unableToInstall;
exports.cannotInitConfigMissingPkgJSON = cannotInitConfigMissingPkgJSON;
exports.unsafeCycles = unsafeCycles;
exports.linkInternalPackage = linkInternalPackage;
exports.unlinkInternalPackage = unlinkInternalPackage;
exports.errorWorkspaceUpgrade = errorWorkspaceUpgrade;
exports.errorWorkspacesUpgrade = errorWorkspacesUpgrade;
exports.noNeedToSymlinkInternalDependency = noNeedToSymlinkInternalDependency;
exports.taskRunningAcrossCINodes = taskRunningAcrossCINodes;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/*::
export opaque type Message = string;
*/

function toString(message) {
  return message.toString();
}

function toMessage(str) {
  return str;
}

function normalPkg(str) {
  return _chalk2.default.cyan(`"${str}"`);
}

function goodVer(str) {
  return _chalk2.default.green(`"${str}"`);
}

function badVer(str) {
  return _chalk2.default.red(`"${str}"`);
}

function cmd(str) {
  return _chalk2.default.bgBlack.magenta(`\`${str}\``);
}

var importantSeparator = _chalk2.default.red(
  '===============================IMPORTANT!==============================='
);

function packageMustDependOnCurrentVersion(name, depName, expected, actual) {
  return `Package ${normalPkg(
    name
  )} must depend on the current version of ${normalPkg(depName)}: ${goodVer(
    expected
  )} vs ${badVer(actual)}`;
}

function depMustBeAddedToProject(pkgName, depName) {
  return `Package ${normalPkg(pkgName)} dependency ${normalPkg(
    depName
  )} must be added to project dependencies.`;
}

function depMustMatchProject(pkgName, depName, expected, actual) {
  return `Package ${normalPkg(pkgName)} dependency ${normalPkg(
    depName
  )} must match version in project dependencies. ${goodVer(
    expected
  )} vs ${badVer(actual)}`;
}

function projectCannotDependOnWorkspace(depName) {
  return `Project cannot depend on workspace Package ${normalPkg(depName)}`;
}

function invalidBoltVersion(actualVersion, expectedVersion) {
  return `Project expects a bolt version of ${goodVer(
    expectedVersion
  )} but found ${badVer(actualVersion)}
run \`yarn global add "bolt@${expectedVersion}"\` to resolve`;
}

function unableToUpdateDepVersion(pkgName, depName, version) {
  return `Unable to update package ${normalPkg(pkgName)} dependency ${normalPkg(
    depName
  )} to version ${goodVer(version)}`;
}

function addedPackageDependency(pkgName, depName, versionRange) {
  return `Added package ${normalPkg(pkgName)} dependency ${normalPkg(
    depName
  )} at version ${goodVer(versionRange)}`;
}

function updatedPackageDependency(
  pkgName,
  depName,
  versionRange,
  prevVersionRange
) {
  return `Updated package ${normalPkg(pkgName)} dependency ${normalPkg(
    depName
  )} to version ${goodVer(versionRange)} from ${badVer(prevVersionRange)}`;
}

function removedPackageDependency(pkgName, depName) {
  return `Removed package ${normalPkg(pkgName)} dependency ${normalPkg(
    depName
  )}`;
}

function unableToNormalizeVersionRanges(depName, versionDetails) {
  return `Unable to normalize ${normalPkg(
    depName
  )} for version ranges: ${versionDetails}`;
}

function dependencyNotInstalled(depName) {
  return `You do not have a dependency named ${normalPkg(depName)} installed.`;
}

function cannotRemoveDependencyDependendOnByWorkspaces(depName, packages) {
  return `Cannot remove dependency ${normalPkg(
    depName
  )} that is depended on by some workspaces:\n${packages
    .map(function(pkg) {
      return ` - ${normalPkg(pkg.getName())}`;
    })
    .join('\n')}`;
}
function externalDepsPassedToUpdatePackageVersions(externalDeps) {
  return `Attempted to pass external dependencies to updatePackageVersions:\n${externalDeps.join(
    ', '
  )}`;
}

function runWorkspacesRemoveDependency(depName) {
  return `Run ${cmd(
    `bolt workspaces remove ${depName}`
  )} to remove from all workspaces`;
}

function couldntRemoveDependencies(deps) {
  return `Could not remove dependencies:\n${deps
    .map(function(depName) {
      return ` - ${normalPkg(depName)}`;
    })
    .join('\n')}`;
}

function couldntSymlinkDependencyNotExists(pkgName, depName) {
  return `Could not symlink ${depName} in ${pkgName} as no dependency exists`;
}

function doneInSeconds(rounded) {
  return `Done in ${rounded}s.`;
}

function boltVersion(version) {
  return `bolt v${version}`;
}

function nodeVersion(version) {
  return `(node v${version})`;
}

function helpContent() {
  return `
    usage
      $ bolt [command] <...args> <...opts>

    commands
      init         init a bolt project
      install      install a bolt project
      add          add a dependency to a bolt project
      upgrade      upgrade a dependency in a bolt project
      remove       remove a dependency from a bolt project
      exec         execute a command in a bolt project
      run          run a script in a bolt project
      publish      publish all the packages in a bolt project
      workspaces   run a bolt command inside all workspaces
      workspace    run a bolt command inside a specific workspace
      help         get help with bolt commands
  `;
}

function noPackagesMatchFilters() {
  return 'No packages match the filters provided';
}

function removedDependencies() {
  return 'Removed dependencies';
}

function npmPackageCouldNotBeFound(pkgName) {
  return `Package named ${normalPkg(
    pkgName
  )} could not be found, this could mean you have not published this package yet`;
}

function notDistTagFound(tagName, pkgName) {
  return `No dist tag ${normalPkg(tagName)} found for package ${normalPkg(
    pkgName
  )}`;
}

function npmDistTagRm(tagName, pkgName) {
  return `npm dist-tag rm ${pkgName} ${tagName}`;
}

function npmDistTagAdd(pkgName, pkgVersion, tagName) {
  return `npm dist-tag add ${pkgName}@${pkgVersion} ${tagName}`;
}

function npmPublish(pkgName) {
  return `npm publish ${pkgName}`;
}

function npmInfo(pkgName) {
  return `npm info ${pkgName}`;
}

function npmInfo404(pkgName) {
  return `Recieved 404 for npm info ${normalPkg(pkgName)}`;
}

function lockingAllPackages() {
  return 'Attempting to get locks for all packages';
}

function validatingProject() {
  return '[1/4] Validating project...';
}
function installingProjectDependencies() {
  return '[2/4] Installing project dependencies...';
}

function linkingWorkspaceDependencies() {
  return '[3/4] Linking workspace dependencies...';
}

function linkingWorkspaceBinaries() {
  return '[4/4] Linking workspace binaries...';
}

function publishingPackage(pkgName, pkgVersion) {
  return `Publishing ${normalPkg(pkgName)} at ${goodVer(pkgVersion)}`;
}

function noUnpublishedPackagesToPublish() {
  return 'No unpublished packages to publish';
}

function willPublishUnpublishedPackage(pkgName, pkgLocalVersion) {
  return `${pkgName} is being published at version ${pkgLocalVersion} because it is not yet published`;
}

function willPublishPackage(pkgLocalVersion, pkgPublishedVersion, pkgName) {
  return `${pkgName} is being published because our local version (${pkgLocalVersion}) is ahead of npm's (${pkgPublishedVersion})`;
}

function willNotPublishPackage(pkgLocalVersion, pkgPublishedVersion, pkgName) {
  return `${pkgName} is not being published because version ${pkgPublishedVersion} is already published on npm and we are trying to publish version ${pkgLocalVersion}`;
}

function successfullyPublishedPackage(pkgName, pkgVersion) {
  return `Successfully published ${pkgName}@${pkgVersion}`;
}

function failedToPublishPackage(pkgName) {
  return `Failed to publish ${pkgName}`;
}

function couldNotBeNormalized() {
  return 'The following packages could not be normalized:';
}

function installedAndLinkedWorkspaces() {
  return 'Installed and linked workspaces.';
}

function cannotInstallWorkspaceInProject(pkgName) {
  return `Cannot install workspace "${pkgName}" as a dependency of a project`;
}

function cannotUpgradeWorkspaceDependencyInProject(pkgName) {
  return `Cannot upgrade workspace "${pkgName}" as a dependency of a project.
  All the workspaces are symlinked, upgrading workspce dependency is invalid.`;
}

function errorParsingJSON(filePath) {
  return `Error parsing JSON in file:\n${filePath}`;
}

// TODO: This message actually only makes sense when using changeset commands, so should probably
// be rethought out once `bolt version`, etc is ready
function invalidBoltWorkspacesFromUpdate(name, depName, depRange, newVersion) {
  return `${importantSeparator}
  ${name} has a dependency on ${depName} at ${depRange}, however the new version of ${newVersion} leaves this range.
  You will need to make a new changeset that includes an update to ${name}
${importantSeparator}`;
}

function unableToInstall() {
  return `Project is invalid, bolt is unable to install`;
}

function cannotInitConfigMissingPkgJSON(filePath) {
  var basePath = filePath.replace(/.package\.json$/, '');
  return `This folder does not contain a package.json:\n${basePath}

  Sometimes this is caused by incomplete packages or switching branches.

  Try removing the directory or fixing the package and run bolt again.`;
}

function unsafeCycles() {
  return 'Task ran with unsafe dependency cycles in workspaces.';
}

function linkInternalPackage(internalPackageName) {
  return `Cannot link project package (${internalPackageName}), as these are already linked`;
}

function unlinkInternalPackage(internalPackageName) {
  return `Cannot unlink project package (${internalPackageName})`;
}

function errorWorkspaceUpgrade() {
  return `${_chalk2.default.red.bold(
    '[bolt workspace upgrade]'
  )} Unable to upgrade dependencies for a single workspace.

	In order to upgrade a dependency [across all the workspaces] please run ${cmd(
    '"bolt upgrade [...args]"'
  )} or ${cmd('"bolt workspaces upgrade [...args]"')}`;
}

function errorWorkspacesUpgrade(filterOpts) {
  return `${_chalk2.default.red.bold(
    '[bolt workspaces upgrade]'
  )} Unable to upgrade dependencies for a single or some workspace.
  Therefore, flags ${_chalk2.default.red.bold(
    filterOpts.join(' ')
  )} are not applicable here.
  In order to upgrade a dependency please run without filter flags - ${cmd(
    '"bolt upgrade [...args]"'
  )} or ${cmd('"bolt workspaces upgrade [...args]"')}`;
}

function noNeedToSymlinkInternalDependency() {
  return `Internal packages are symlinked, there is no need update them`;
}

function taskRunningAcrossCINodes(nodes, count, total) {
  return `Task is being split across ${nodes} nodes. Current node running across ${count} of ${total} workspaces`;
}
