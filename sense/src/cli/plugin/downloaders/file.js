'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _require = require('fs');

var createWriteStream = _require.createWriteStream;
var createReadStream = _require.createReadStream;
var unlinkSync = _require.unlinkSync;
var statSync = _require.statSync;

var getProgressReporter = require('../progress_reporter');

function openSourceFile(_ref) {
  var sourcePath = _ref.sourcePath;

  try {
    var fileInfo = statSync(sourcePath);

    var readStream = createReadStream(sourcePath);

    return { readStream: readStream, fileInfo: fileInfo };
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('ENOTFOUND');
    }

    throw err;
  }
}

function copyFile(_ref2) {
  var readStream = _ref2.readStream;
  var writeStream = _ref2.writeStream;
  var progressReporter = _ref2.progressReporter;
  return _regeneratorRuntime.async(function copyFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
          // if either stream errors, fail quickly
          readStream.on('error', reject);
          writeStream.on('error', reject);

          // report progress as we transfer
          readStream.on('data', function (chunk) {
            progressReporter.progress(chunk.length);
          });

          // write the download to the file system
          readStream.pipe(writeStream);

          // when the write is done, we are done
          writeStream.on('finish', resolve);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getArchiveTypeFromFilename(path) {
  if (/\.zip$/i.test(path)) {
    return '.zip';
  }
  if (/\.tar\.gz$/i.test(path)) {
    return '.tar.gz';
  }
}

/*
// Responsible for managing local file transfers
*/

exports['default'] = function copyLocalFile(logger, sourcePath, targetPath) {
  var _openSourceFile, readStream, fileInfo, writeStream, progressReporter, archiveType;

  return _regeneratorRuntime.async(function copyLocalFile$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        _openSourceFile = openSourceFile({ sourcePath: sourcePath });
        readStream = _openSourceFile.readStream;
        fileInfo = _openSourceFile.fileInfo;
        writeStream = createWriteStream(targetPath);
        context$1$0.prev = 5;
        progressReporter = getProgressReporter(logger);

        progressReporter.init(fileInfo.size);

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(copyFile({ readStream: readStream, writeStream: writeStream, progressReporter: progressReporter }));

      case 10:

        progressReporter.complete();
        context$1$0.next = 18;
        break;

      case 13:
        context$1$0.prev = 13;
        context$1$0.t0 = context$1$0['catch'](5);

        readStream.close();
        writeStream.close();
        throw context$1$0.t0;

      case 18:
        archiveType = getArchiveTypeFromFilename(sourcePath);
        return context$1$0.abrupt('return', { archiveType: archiveType });

      case 22:
        context$1$0.prev = 22;
        context$1$0.t1 = context$1$0['catch'](0);

        logger.error(context$1$0.t1);
        throw context$1$0.t1;

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 22], [5, 13]]);
};

module.exports = exports['default'];

// all is well, return our archive type
