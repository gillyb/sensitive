'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _ = require('lodash');
var utils = require('requirefrom')('src/utils');
var fromRoot = utils('fromRoot');
var pluginDownloader = require('./plugin_downloader');
var pluginCleaner = require('./plugin_cleaner');
var pluginExtractor = require('./plugin_extractor');
var KbnServer = require('../../server/KbnServer');
var readYamlConfig = require('../serve/read_yaml_config');

var _require = require('fs');

var statSync = _require.statSync;
var renameSync = _require.renameSync;

var Promise = require('bluebird');
var rimrafSync = require('rimraf').sync;
var mkdirp = Promise.promisify(require('mkdirp'));

exports['default'] = {
  install: install
};

function checkForExistingInstall(settings, logger) {
  try {
    statSync(settings.pluginPath);

    logger.error('Plugin ' + settings['package'] + ' already exists, please remove before installing a new version');
    process.exit(70); // eslint-disable-line no-process-exit
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
  }
}

function rebuildKibanaCache(settings, logger) {
  var serverConfig, kbnServer;
  return _regeneratorRuntime.async(function rebuildKibanaCache$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        logger.log('Optimizing and caching browser bundles...');
        serverConfig = _.merge(readYamlConfig(settings.config), {
          env: 'production',
          logging: {
            silent: settings.silent,
            quiet: !settings.silent,
            verbose: false
          },
          optimize: {
            useBundleCache: false
          },
          server: {
            autoListen: false
          },
          plugins: {
            initialize: false,
            scanDirs: [settings.pluginDir, fromRoot('src/plugins')]
          }
        });
        kbnServer = new KbnServer(serverConfig);
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(kbnServer.ready());

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(kbnServer.close());

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function install(settings, logger) {
  var cleaner, downloader, _ref, archiveType;

  return _regeneratorRuntime.async(function install$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        logger.log('Installing ' + settings['package']);

        cleaner = pluginCleaner(settings, logger);
        context$1$0.prev = 2;

        checkForExistingInstall(settings, logger);

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(cleaner.cleanPrevious());

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(mkdirp(settings.workingPath));

      case 8:
        downloader = pluginDownloader(settings, logger);
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(downloader.download());

      case 11:
        _ref = context$1$0.sent;
        archiveType = _ref.archiveType;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(pluginExtractor(settings, logger, archiveType));

      case 15:

        rimrafSync(settings.tempArchiveFile);

        renameSync(settings.workingPath, settings.pluginPath);

        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(rebuildKibanaCache(settings, logger));

      case 19:

        logger.log('Plugin installation complete');
        context$1$0.next = 27;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](2);

        logger.error('Plugin installation was unsuccessful due to error "' + context$1$0.t0.message + '"');
        cleaner.cleanError();
        process.exit(70); // eslint-disable-line no-process-exit

      case 27:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[2, 22]]);
}
module.exports = exports['default'];
