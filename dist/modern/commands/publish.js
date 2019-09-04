'use strict';

exports.__esModule = true;
exports.toPublishOptions = toPublishOptions;
exports.publish = publish;

var _options = require('../utils/options');

var options = _interopRequireWildcard(_options);

var _logger = require('../utils/logger');

var logger = _interopRequireWildcard(_logger);

var _messages = require('../utils/messages');

var messages = _interopRequireWildcard(_messages);

var _publish = require('../utils/publish');

var _errors = require('../utils/errors');

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

function toPublishOptions(args, flags) {
  return {
    cwd: options.string(flags.cwd, 'cwd'),
    access: options.string(flags.access, 'access')
  };
}

function partition(collection, predicate = x => x) {
  return collection.reduce(
    ([a, b], value) => {
      (predicate(value) ? a : b).push(value);
      return [a, b];
    },
    [[], []]
  );
}

async function publish(opts) {
  const response = await (0, _publish.publish)(opts);

  const [successful, unsuccessful] = partition(response, p => p.published);

  for (const pkg of successful) {
    logger.success(
      messages.successfullyPublishedPackage(pkg.name, pkg.newVersion)
    );
  }

  for (const pkg of unsuccessful) {
    logger.error(messages.failedToPublishPackage(pkg.name));
  }

  if (unsuccessful.length > 0) {
    throw new _errors.BoltError(
      `Failed to publish ${unsuccessful.length} ${
        unsuccessful.length === 1 ? 'package' : 'packages'
      }`
    );
  }
}
