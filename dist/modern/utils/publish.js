'use strict';

exports.__esModule = true;

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.publish = publish;

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _options = require('./options');

var options = _interopRequireWildcard(_options);

var _errors = require('./errors');

var _logger = require('./logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('./messages');

var messages = _interopRequireWildcard(_messages);

var _locks = require('./locks');

var locks = _interopRequireWildcard(_locks);

var _npm = require('./npm');

var npm = _interopRequireWildcard(_npm);

var _Project = require('../Project');

var _Project2 = _interopRequireDefault(_Project);

var _Package = require('../Package');

var _Package2 = _interopRequireDefault(_Package);

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

async function getUnpublishedPackages(packages) {
  let results = await _promise2.default.all(
    packages.map(async pkg => {
      let config = pkg.config;
      let response = await npm.infoAllow404(config.getName());

      return {
        name: config.getName(),
        localVersion: config.getVersion(),
        isPublished: response.published,
        publishedVersion: response.pkgInfo.version || ''
      };
    })
  );

  let packagesToPublish = [];

  for (let pkgInfo of results) {
    let { name, isPublished, localVersion, publishedVersion } = pkgInfo;
    if (!isPublished) {
      packagesToPublish.push(pkgInfo);
    } else if (_semver2.default.gt(localVersion, publishedVersion)) {
      packagesToPublish.push(pkgInfo);
      logger.info(
        messages.willPublishPackage(localVersion, publishedVersion, name)
      );
    } else if (_semver2.default.lt(localVersion, publishedVersion)) {
      // If the local version is behind npm, something is wrong, we warn here, and by not getting published later, it will fail
      logger.warn(
        messages.willNotPublishPackage(localVersion, publishedVersion, name)
      );
    }
  }

  return packagesToPublish;
}
async function publish(opts = (0, _freeze2.default)({})) {
  let cwd = opts.cwd || process.cwd();
  let spawnOpts = opts.spawnOpts || {};
  let project = await _Project2.default.init(cwd);
  let packages = await project.getPackages();
  let publicPackages = packages.filter(pkg => !pkg.config.getPrivate());
  let publishedPackages = [];

  try {
    // TODO: Re-enable once locking issues are sorted out
    // await locks.lock(packages);
    let unpublishedPackagesInfo = await getUnpublishedPackages(publicPackages);
    let unpublishedPackages = publicPackages.filter(pkg => {
      return unpublishedPackagesInfo.some(p => pkg.getName() === p.name);
    });

    if (unpublishedPackagesInfo.length === 0) {
      logger.warn(messages.noUnpublishedPackagesToPublish());
    }

    await project.runPackageTasks(unpublishedPackages, spawnOpts, async pkg => {
      let name = pkg.config.getName();
      let version = pkg.config.getVersion();
      logger.info(messages.publishingPackage(name, version));

      let publishDir = pkg.dir;

      if (opts.prePublish) {
        publishDir =
          (await opts.prePublish({
            name,
            pkg
          })) || pkg.dir;
      }

      let publishConfirmation = await npm.publish(name, {
        cwd: publishDir,
        access: opts.access
      });

      publishedPackages.push({
        name,
        newVersion: version,
        published: publishConfirmation && publishConfirmation.published
      });
    });

    return publishedPackages;

    // TODO: Re-enable once locking issues are sorted out
    // await locks.unlock(packages);
  } catch (err) {
    logger.error(err.message);
    throw new _errors.BoltError('Failed to publish');
  }
}
