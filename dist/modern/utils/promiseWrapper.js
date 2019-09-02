'use strict';

exports.__esModule = true;
exports.promiseWrapper = promiseWrapper;
exports.promiseWrapperSuccess = promiseWrapperSuccess;
function promiseWrapper(promiseFunc) {
  return (...args) => {
    return promiseFunc(...args).then(
      result => ({ result, status: 'success' }),
      error => ({ error, status: 'error' })
    );
  };
}

function promiseWrapperSuccess(promiseFunc) {
  return (...args) => {
    return promiseFunc(...args).then(result => ({ result, status: 'success' }));
  };
}
