'use strict';

var _ = require('lodash');

module.exports = _.once(function (kbnServer) {
  var uiExports = kbnServer.uiExports;
  var config = kbnServer.config;

  // user configured default route
  var defaultConfig = config.get('server.defaultRoute');
  if (defaultConfig) return defaultConfig;

  return config.get('server.basePath') + '/app/kibana';
});
