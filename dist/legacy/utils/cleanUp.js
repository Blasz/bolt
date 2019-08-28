'use strict';

exports.__esModule = true;
exports.handleAllSignals = handleAllSignals;

// cleanUp function must be synchronus
function handleAllSignals(cleanUp) {
  process.on('exit', function(code) {
    cleanUp();
  });
  process.on('SIGTERM', function(code) {
    cleanUp();
    process.exit(code);
  });
  process.on('SIGINT', function(code) {
    cleanUp();
    process.exit(code);
  });
  process.on('unhandledRejection', function(err) {
    cleanUp();
    process.exit(1);
  });
  process.on('uncaughtException', function(err) {
    cleanUp();
    process.exit(1);
  });
}
