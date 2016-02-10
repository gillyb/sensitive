'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = createPluginDownloader;
var _ = require('lodash');
var urlParse = require('url').parse;
var downloadHttpFile = require('./downloaders/http');
var downloadLocalFile = require('./downloaders/file');

function createPluginDownloader(settings, logger) {
  var archiveType = undefined;
  var sourceType = undefined;

  //Attempts to download each url in turn until one is successful
  function download() {
    var urls = settings.urls.slice(0);

    function tryNext() {
      var sourceUrl = urls.shift();
      if (!sourceUrl) {
        throw new Error('No valid url specified.');
      }

      logger.log('Attempting to transfer from ' + sourceUrl);

      return downloadSingle(sourceUrl)['catch'](function (err) {
        if (err.message === 'ENOTFOUND') {
          return tryNext();
        }
        throw err;
      });
    }

    return tryNext();
  }

  function downloadSingle(sourceUrl) {
    var urlInfo = urlParse(sourceUrl);
    var downloadPromise = undefined;

    if (/^file/.test(urlInfo.protocol)) {
      downloadPromise = downloadLocalFile(logger, urlInfo.path, settings.tempArchiveFile);
    } else {
      downloadPromise = downloadHttpFile(logger, sourceUrl, settings.tempArchiveFile, settings.timeout);
    }

    return downloadPromise;
  }

  return {
    download: download,
    _downloadSingle: downloadSingle
  };
}

;
module.exports = exports['default'];
