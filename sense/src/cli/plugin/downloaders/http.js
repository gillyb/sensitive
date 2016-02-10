'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _require = require('bluebird');

var fn = _require.fromNode;

var _require2 = require('fs');

var createWriteStream = _require2.createWriteStream;
var unlinkSync = _require2.unlinkSync;

var Wreck = require('wreck');
var getProgressReporter = require('../progress_reporter');

function sendRequest(_ref) {
  var sourceUrl = _ref.sourceUrl;
  var timeout = _ref.timeout;

  var maxRedirects = 11; //Because this one goes to 11.
  return fn(function (cb) {
    var req = Wreck.request('GET', sourceUrl, { timeout: timeout, redirects: maxRedirects }, function (err, resp) {
      if (err) {
        if (err.code === 'ECONNREFUSED') {
          err = new Error('ENOTFOUND');
        }

        return cb(err);
      }

      if (resp.statusCode >= 400) {
        return cb(new Error('ENOTFOUND'));
      }

      cb(null, { req: req, resp: resp });
    });
  });
}

function downloadResponse(_ref2) {
  var resp = _ref2.resp;
  var targetPath = _ref2.targetPath;
  var progressReporter = _ref2.progressReporter;

  return new _Promise(function (resolve, reject) {
    var writeStream = createWriteStream(targetPath);

    // if either stream errors, fail quickly
    resp.on('error', reject);
    writeStream.on('error', reject);

    // report progress as we download
    resp.on('data', function (chunk) {
      progressReporter.progress(chunk.length);
    });

    // write the download to the file system
    resp.pipe(writeStream);

    // when the write is done, we are done
    writeStream.on('finish', resolve);
  });
}

function getArchiveTypeFromResponse(resp, sourceUrl) {
  var contentType = resp.headers['content-type'] || '';

  switch (contentType.toLowerCase()) {
    case 'application/zip':
      return '.zip';
    case 'application/x-gzip':
      return '.tar.gz';
    default:
      //If we can't infer the archive type from the content-type header,
      //fall back to checking the extension in the url
      if (/\.zip$/i.test(sourceUrl)) {
        return '.zip';
      }
      if (/\.tar\.gz$/i.test(sourceUrl)) {
        return '.tar.gz';
      }
      break;
  }
}

/*
Responsible for managing http transfers
*/

exports['default'] = function downloadUrl(logger, sourceUrl, targetPath, timeout) {
  var _ref3, req, resp, totalSize, progressReporter, archiveType;

  return _regeneratorRuntime.async(function downloadUrl$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(sendRequest({ sourceUrl: sourceUrl, timeout: timeout }));

      case 3:
        _ref3 = context$1$0.sent;
        req = _ref3.req;
        resp = _ref3.resp;
        context$1$0.prev = 6;
        totalSize = parseFloat(resp.headers['content-length']) || 0;
        progressReporter = getProgressReporter(logger);

        progressReporter.init(totalSize);

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(downloadResponse({ resp: resp, targetPath: targetPath, progressReporter: progressReporter }));

      case 12:

        progressReporter.complete();
        context$1$0.next = 19;
        break;

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](6);

        req.abort();
        throw context$1$0.t0;

      case 19:
        archiveType = getArchiveTypeFromResponse(resp, sourceUrl);
        return context$1$0.abrupt('return', { archiveType: archiveType });

      case 23:
        context$1$0.prev = 23;
        context$1$0.t1 = context$1$0['catch'](0);

        if (context$1$0.t1.message !== 'ENOTFOUND') {
          logger.error(context$1$0.t1);
        }
        throw context$1$0.t1;

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 23], [6, 15]]);
};

module.exports = exports['default'];

// all is well, return our archive type
