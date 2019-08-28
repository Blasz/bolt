'use strict';

exports.__esModule = true;
exports.publish = undefined;

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var getUnpublishedPackages = (function() {
  var _ref = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee2(packages) {
      var _this = this;

      var results,
        packagesToPublish,
        _iterator,
        _isArray,
        _i,
        _ref3,
        pkgInfo,
        _name,
        isPublished,
        localVersion,
        publishedVersion;

      return _regenerator2.default.wrap(
        function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                _context2.next = 2;
                return _promise2.default.all(
                  packages.map(
                    (function() {
                      var _ref2 = (0, _asyncToGenerator3.default)(
                        _regenerator2.default.mark(function _callee(pkg) {
                          var config, response;
                          return _regenerator2.default.wrap(
                            function _callee$(_context) {
                              while (1) {
                                switch ((_context.prev = _context.next)) {
                                  case 0:
                                    config = pkg.config;
                                    _context.next = 3;
                                    return npm.infoAllow404(config.getName());

                                  case 3:
                                    response = _context.sent;
                                    return _context.abrupt('return', {
                                      name: config.getName(),
                                      localVersion: config.getVersion(),
                                      isPublished: response.published,
                                      publishedVersion:
                                        response.pkgInfo.version || ''
                                    });

                                  case 5:
                                  case 'end':
                                    return _context.stop();
                                }
                              }
                            },
                            _callee,
                            _this
                          );
                        })
                      );

                      return function(_x2) {
                        return _ref2.apply(this, arguments);
                      };
                    })()
                  )
                );

              case 2:
                results = _context2.sent;
                packagesToPublish = [];
                (_iterator = results),
                  (_isArray = Array.isArray(_iterator)),
                  (_i = 0),
                  (_iterator = _isArray
                    ? _iterator
                    : (0, _getIterator3.default)(_iterator));

              case 5:
                if (!_isArray) {
                  _context2.next = 11;
                  break;
                }

                if (!(_i >= _iterator.length)) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('break', 20);

              case 8:
                _ref3 = _iterator[_i++];
                _context2.next = 15;
                break;

              case 11:
                _i = _iterator.next();

                if (!_i.done) {
                  _context2.next = 14;
                  break;
                }

                return _context2.abrupt('break', 20);

              case 14:
                _ref3 = _i.value;

              case 15:
                pkgInfo = _ref3;
                (_name = pkgInfo.name),
                  (isPublished = pkgInfo.isPublished),
                  (localVersion = pkgInfo.localVersion),
                  (publishedVersion = pkgInfo.publishedVersion);

                if (!isPublished) {
                  packagesToPublish.push(pkgInfo);
                } else if (
                  _semver2.default.gt(localVersion, publishedVersion)
                ) {
                  packagesToPublish.push(pkgInfo);
                  logger.info(
                    messages.willPublishPackage(
                      localVersion,
                      publishedVersion,
                      _name
                    )
                  );
                } else if (
                  _semver2.default.lt(localVersion, publishedVersion)
                ) {
                  // If the local version is behind npm, something is wrong, we warn here, and by not getting published later, it will fail
                  logger.warn(
                    messages.willNotPublishPackage(
                      localVersion,
                      publishedVersion,
                      _name
                    )
                  );
                }

              case 18:
                _context2.next = 5;
                break;

              case 20:
                return _context2.abrupt('return', packagesToPublish);

              case 21:
              case 'end':
                return _context2.stop();
            }
          }
        },
        _callee2,
        this
      );
    })
  );

  return function getUnpublishedPackages(_x) {
    return _ref.apply(this, arguments);
  };
})();

var publish = (exports.publish = (function() {
  var _ref4 = (0, _asyncToGenerator3.default)(
    _regenerator2.default.mark(function _callee4() {
      var _this2 = this;

      var opts =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : (0, _freeze2.default)({});
      var cwd,
        spawnOpts,
        project,
        packages,
        publicPackages,
        publishedPackages,
        unpublishedPackagesInfo,
        unpublishedPackages;
      return _regenerator2.default.wrap(
        function _callee4$(_context4) {
          while (1) {
            switch ((_context4.prev = _context4.next)) {
              case 0:
                cwd = opts.cwd || process.cwd();
                spawnOpts = opts.spawnOpts || {};
                _context4.next = 4;
                return _Project2.default.init(cwd);

              case 4:
                project = _context4.sent;
                _context4.next = 7;
                return project.getPackages();

              case 7:
                packages = _context4.sent;
                publicPackages = packages.filter(function(pkg) {
                  return !pkg.config.getPrivate();
                });
                publishedPackages = [];
                _context4.prev = 10;
                _context4.next = 13;
                return getUnpublishedPackages(publicPackages);

              case 13:
                unpublishedPackagesInfo = _context4.sent;
                unpublishedPackages = publicPackages.filter(function(pkg) {
                  return unpublishedPackagesInfo.some(function(p) {
                    return pkg.getName() === p.name;
                  });
                });

                if (unpublishedPackagesInfo.length === 0) {
                  logger.warn(messages.noUnpublishedPackagesToPublish());
                }

                _context4.next = 18;
                return project.runPackageTasks(
                  unpublishedPackages,
                  spawnOpts,
                  (function() {
                    var _ref5 = (0, _asyncToGenerator3.default)(
                      _regenerator2.default.mark(function _callee3(pkg) {
                        var name, version, publishDir, publishConfirmation;
                        return _regenerator2.default.wrap(
                          function _callee3$(_context3) {
                            while (1) {
                              switch ((_context3.prev = _context3.next)) {
                                case 0:
                                  name = pkg.config.getName();
                                  version = pkg.config.getVersion();

                                  logger.info(
                                    messages.publishingPackage(name, version)
                                  );

                                  publishDir = pkg.dir;

                                  if (!opts.prePublish) {
                                    _context3.next = 11;
                                    break;
                                  }

                                  _context3.next = 7;
                                  return opts.prePublish({
                                    name,
                                    pkg
                                  });

                                case 7:
                                  _context3.t0 = _context3.sent;

                                  if (_context3.t0) {
                                    _context3.next = 10;
                                    break;
                                  }

                                  _context3.t0 = pkg.dir;

                                case 10:
                                  publishDir = _context3.t0;

                                case 11:
                                  _context3.next = 13;
                                  return npm.publish(name, {
                                    cwd: publishDir,
                                    access: opts.access
                                  });

                                case 13:
                                  publishConfirmation = _context3.sent;

                                  publishedPackages.push({
                                    name,
                                    newVersion: version,
                                    published:
                                      publishConfirmation &&
                                      publishConfirmation.published
                                  });

                                case 15:
                                case 'end':
                                  return _context3.stop();
                              }
                            }
                          },
                          _callee3,
                          _this2
                        );
                      })
                    );

                    return function(_x4) {
                      return _ref5.apply(this, arguments);
                    };
                  })()
                );

              case 18:
                return _context4.abrupt('return', publishedPackages);

              case 21:
                _context4.prev = 21;
                _context4.t0 = _context4['catch'](10);

                logger.error(_context4.t0.message);
                throw new _errors.BoltError('Failed to publish');

              case 25:
              case 'end':
                return _context4.stop();
            }
          }
        },
        _callee4,
        this,
        [[10, 21]]
      );
    })
  );

  return function publish() {
    return _ref4.apply(this, arguments);
  };
})());

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
