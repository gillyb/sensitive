'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var crypto = require('crypto');

exports['default'] = function (server) {
  function updateMetadata(urlId, urlDoc) {
    var client;
    return _regeneratorRuntime.async(function updateMetadata$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          client = server.plugins.elasticsearch.client;
          context$2$0.prev = 1;
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(client.update({
            index: '.kibana',
            type: 'url',
            id: urlId,
            body: {
              doc: {
                'accessDate': new Date(),
                'accessCount': urlDoc._source.accessCount + 1
              }
            }
          }));

        case 4:
          context$2$0.next = 9;
          break;

        case 6:
          context$2$0.prev = 6;
          context$2$0.t0 = context$2$0['catch'](1);

          server.log('Warning: Error updating url metadata', context$2$0.t0);
          //swallow errors. It isn't critical if there is no update.

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this, [[1, 6]]);
  }

  function getUrlDoc(urlId) {
    var urlDoc;
    return _regeneratorRuntime.async(function getUrlDoc$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
            var client = server.plugins.elasticsearch.client;

            client.get({
              index: '.kibana',
              type: 'url',
              id: urlId
            }).then(function (response) {
              resolve(response);
            })['catch'](function (err) {
              resolve();
            });
          }));

        case 2:
          urlDoc = context$2$0.sent;
          return context$2$0.abrupt('return', urlDoc);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  function createUrlDoc(url, urlId) {
    var newUrlId;
    return _regeneratorRuntime.async(function createUrlDoc$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(new _Promise(function (resolve, reject) {
            var client = server.plugins.elasticsearch.client;

            client.index({
              index: '.kibana',
              type: 'url',
              id: urlId,
              body: {
                url: url,
                'accessCount': 0,
                'createDate': new Date(),
                'accessDate': new Date()
              }
            }).then(function (response) {
              resolve(response._id);
            })['catch'](function (err) {
              reject(err);
            });
          }));

        case 2:
          newUrlId = context$2$0.sent;
          return context$2$0.abrupt('return', newUrlId);

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  }

  function createUrlId(url) {
    var urlId = crypto.createHash('md5').update(url).digest('hex');

    return urlId;
  }

  return {
    generateUrlId: function generateUrlId(url) {
      var urlId, urlDoc;
      return _regeneratorRuntime.async(function generateUrlId$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            urlId = createUrlId(url);
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(getUrlDoc(urlId));

          case 3:
            urlDoc = context$2$0.sent;

            if (!urlDoc) {
              context$2$0.next = 6;
              break;
            }

            return context$2$0.abrupt('return', urlId);

          case 6:
            return context$2$0.abrupt('return', createUrlDoc(url, urlId));

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    },
    getUrl: function getUrl(urlId) {
      var urlDoc;
      return _regeneratorRuntime.async(function getUrl$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(getUrlDoc(urlId));

          case 3:
            urlDoc = context$2$0.sent;

            if (urlDoc) {
              context$2$0.next = 6;
              break;
            }

            throw new Error('Requested shortened url does note exist in kibana index');

          case 6:

            updateMetadata(urlId, urlDoc);

            return context$2$0.abrupt('return', urlDoc._source.url);

          case 10:
            context$2$0.prev = 10;
            context$2$0.t0 = context$2$0['catch'](0);
            return context$2$0.abrupt('return', '/');

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 10]]);
    }
  };
};

;
module.exports = exports['default'];
