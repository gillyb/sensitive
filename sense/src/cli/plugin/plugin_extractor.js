'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = extractArchive;
var zipExtract = require('./extractors/zip');
var tarGzExtract = require('./extractors/tar_gz');

function extractArchive(settings, logger, archiveType) {
  switch (archiveType) {
    case '.zip':
      return zipExtract(settings, logger);
      break;
    case '.tar.gz':
      return tarGzExtract(settings, logger);
      break;
    default:
      throw new Error('Unsupported archive format.');
  }
}

;
module.exports = exports['default'];
