'use strict';

exports.__esModule = true;
exports.promiseWrapper = promiseWrapper;
exports.promiseWrapperSuccess = promiseWrapperSuccess;
function promiseWrapper(promiseFunc) {
  return function() {
    return promiseFunc.apply(undefined, arguments).then(
      function(result) {
        return { result, status: 'success' };
      },
      function(error) {
        return { error, status: 'error' };
      }
    );
  };
}

function promiseWrapperSuccess(promiseFunc) {
  return function() {
    return promiseFunc.apply(undefined, arguments).then(function(result) {
      return { result, status: 'success' };
    });
  };
}
