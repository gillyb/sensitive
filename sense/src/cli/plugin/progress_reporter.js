/*
Generates file transfer progress messages
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createProgressReporter;

function createProgressReporter(logger) {
  var dotCount = 0;
  var runningTotal = 0;
  var totalSize = 0;

  function init(size) {
    totalSize = size;
    var totalDesc = totalSize || 'unknown number of';

    logger.log('Transferring ' + totalDesc + ' bytes', true);
  }

  //Should log a dot for every 5% of progress
  function progress(size) {
    if (!totalSize) return;

    runningTotal += size;
    var newDotCount = Math.round(runningTotal / totalSize * 100 / 5);
    if (newDotCount > 20) newDotCount = 20;
    for (var i = 0; i < newDotCount - dotCount; i++) {
      logger.log('.', true);
    }
    dotCount = newDotCount;
  }

  function complete() {
    logger.log('Transfer complete', false);
  }

  return {
    init: init,
    progress: progress,
    complete: complete
  };
}

;
module.exports = exports['default'];
