'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _boom = require('boom');

exports['default'] = function (kbnServer, server, config) {
  var version = config.get('pkg.version');
  var disabled = config.get('server.xsrf.disableProtection');
  var header = 'kbn-version';

  server.ext('onPostAuth', function (req, reply) {
    var noHeaderGet = req.method === 'get' && !req.headers[header];
    if (disabled || noHeaderGet) return reply['continue']();

    var submission = req.headers[header];
    if (!submission) return reply((0, _boom.badRequest)('Missing ' + header + ' header'));
    if (submission !== version) {
      return reply((0, _boom.badRequest)('Browser client is out of date, please refresh the page', {
        expected: version,
        got: submission
      }));
    }

    return reply['continue']();
  });
};

module.exports = exports['default'];
