'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var zlib = require('zlib');
var fs = require('fs');
var tar = require('tar');

function extractArchive(settings) {
  return _regeneratorRuntime.async(function extractArchive$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
          var gunzip = zlib.createGunzip();
          var tarExtract = new tar.Extract({ path: settings.workingPath, strip: 1 });
          var readStream = fs.createReadStream(settings.tempArchiveFile);

          readStream.on('error', reject);
          gunzip.on('error', reject);
          tarExtract.on('error', reject);

          readStream.pipe(gunzip).pipe(tarExtract);

          tarExtract.on('finish', resolve);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

exports['default'] = function extractTarball(settings, logger) {
  return _regeneratorRuntime.async(function extractTarball$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;

        logger.log('Extracting plugin archive');

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(extractArchive(settings));

      case 4:

        logger.log('Extraction complete');
        context$1$0.next = 11;
        break;

      case 7:
        context$1$0.prev = 7;
        context$1$0.t0 = context$1$0['catch'](0);

        logger.error(context$1$0.t0);
        throw new Error('Error extracting plugin archive');

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 7]]);
};

module.exports = exports['default'];
