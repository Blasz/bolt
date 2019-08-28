'use strict';

exports.__esModule = true;
exports.handleAllSignals = handleAllSignals;

// cleanUp function must be synchronus
function handleAllSignals(cleanUp) {
  process.on('exit', code => {
    cleanUp();
  });
  process.on('SIGTERM', code => {
    cleanUp();
    process.exit(code);
  });
  process.on('SIGINT', code => {
    cleanUp();
    process.exit(code);
  });
  process.on('unhandledRejection', err => {
    cleanUp();
    process.exit(1);
  });
  process.on('uncaughtException', err => {
    cleanUp();
    process.exit(1);
  });
}
