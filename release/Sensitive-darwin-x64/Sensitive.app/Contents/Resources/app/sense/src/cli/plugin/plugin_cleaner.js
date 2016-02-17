'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createPluginCleaner;
var rimraf = require('rimraf');
var fs = require('fs');

function createPluginCleaner(settings, logger) {
  function cleanPrevious() {
    return new _Promise(function (resolve, reject) {
      try {
        fs.statSync(settings.workingPath);

        logger.log('Found previous install attempt. Deleting...');
        try {
          rimraf.sync(settings.workingPath);
        } catch (e) {
          return reject(e);
        }
        return resolve();
      } catch (e) {
        if (e.code !== 'ENOENT') return reject(e);

        return resolve();
      }
    });
  }

  function cleanError() {
    // delete the working directory.
    // At this point we're bailing, so swallow any errors on delete.
    try {
      rimraf.sync(settings.workingPath);
      rimraf.sync(settings.pluginPath);
    } catch (e) {} // eslint-disable-line no-empty
  }

  return {
    cleanPrevious: cleanPrevious,
    cleanError: cleanError
  };
}

;
module.exports = exports['default'];
