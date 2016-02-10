'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _this = this;

module.exports = function callee$0$0(kbnServer, server, config) {
  var _require, defaults, Boom, formatUrl, _require2, resolve, readFile, fromRoot, UiExports, UiBundle, UiBundleCollection, UiBundlerEnv, loadingGif, uiExports, bundlerEnv, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, plugin, bundles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, app, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, gen, bundle, defaultInjectedVars;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _require = require('lodash');
        defaults = _require.defaults;
        Boom = require('boom');
        formatUrl = require('url').format;
        _require2 = require('path');
        resolve = _require2.resolve;
        readFile = require('fs').readFileSync;
        fromRoot = require('../utils/fromRoot');
        UiExports = require('./UiExports');
        UiBundle = require('./UiBundle');
        UiBundleCollection = require('./UiBundleCollection');
        UiBundlerEnv = require('./UiBundlerEnv');
        loadingGif = readFile(fromRoot('src/ui/public/loading.gif'), { encoding: 'base64' });
        uiExports = kbnServer.uiExports = new UiExports({
          urlBasePath: config.get('server.basePath')
        });
        bundlerEnv = new UiBundlerEnv(config.get('optimize.bundleDir'));

        bundlerEnv.addContext('env', config.get('env.name'));
        bundlerEnv.addContext('urlBasePath', config.get('server.basePath'));
        bundlerEnv.addContext('sourceMaps', config.get('optimize.sourceMaps'));
        bundlerEnv.addContext('kbnVersion', config.get('pkg.version'));
        bundlerEnv.addContext('buildNum', config.get('pkg.buildNum'));
        uiExports.addConsumer(bundlerEnv);

        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 24;
        for (_iterator = _getIterator(kbnServer.plugins); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          plugin = _step.value;

          uiExports.consumePlugin(plugin);
        }

        context$1$0.next = 32;
        break;

      case 28:
        context$1$0.prev = 28;
        context$1$0.t0 = context$1$0['catch'](24);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 32:
        context$1$0.prev = 32;
        context$1$0.prev = 33;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 35:
        context$1$0.prev = 35;

        if (!_didIteratorError) {
          context$1$0.next = 38;
          break;
        }

        throw _iteratorError;

      case 38:
        return context$1$0.finish(35);

      case 39:
        return context$1$0.finish(32);

      case 40:
        bundles = kbnServer.bundles = new UiBundleCollection(bundlerEnv, config.get('optimize.bundleFilter'));
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 44;

        for (_iterator2 = _getIterator(uiExports.getAllApps()); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          app = _step2.value;

          bundles.addApp(app);
        }

        context$1$0.next = 52;
        break;

      case 48:
        context$1$0.prev = 48;
        context$1$0.t1 = context$1$0['catch'](44);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t1;

      case 52:
        context$1$0.prev = 52;
        context$1$0.prev = 53;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 55:
        context$1$0.prev = 55;

        if (!_didIteratorError2) {
          context$1$0.next = 58;
          break;
        }

        throw _iteratorError2;

      case 58:
        return context$1$0.finish(55);

      case 59:
        return context$1$0.finish(52);

      case 60:
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 63;
        _iterator3 = _getIterator(uiExports.getBundleProviders());

      case 65:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 74;
          break;
        }

        gen = _step3.value;
        context$1$0.next = 69;
        return _regeneratorRuntime.awrap(gen(UiBundle, bundlerEnv, uiExports.getAllApps()));

      case 69:
        bundle = context$1$0.sent;

        if (bundle) bundles.add(bundle);

      case 71:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 65;
        break;

      case 74:
        context$1$0.next = 80;
        break;

      case 76:
        context$1$0.prev = 76;
        context$1$0.t2 = context$1$0['catch'](63);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t2;

      case 80:
        context$1$0.prev = 80;
        context$1$0.prev = 81;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 83:
        context$1$0.prev = 83;

        if (!_didIteratorError3) {
          context$1$0.next = 86;
          break;
        }

        throw _iteratorError3;

      case 86:
        return context$1$0.finish(83);

      case 87:
        return context$1$0.finish(80);

      case 88:

        // render all views from the ui/views directory
        server.setupViews(resolve(__dirname, 'views'));
        server.exposeStaticFile('/loading.gif', resolve(__dirname, 'public/loading.gif'));

        server.route({
          path: '/app/{id}',
          method: 'GET',
          handler: function handler(req, reply) {
            var id = req.params.id;
            var app = uiExports.apps.byId[id];
            if (!app) return reply(Boom.notFound('Unknown app ' + id));

            if (kbnServer.status.isGreen()) {
              return reply.renderApp(app);
            } else {
              return reply.renderStatusPage();
            }
          }
        });

        defaultInjectedVars = {};

        if (config.has('kibana')) {
          defaultInjectedVars.kbnIndex = config.get('kibana.index');
        }
        if (config.has('elasticsearch')) {
          defaultInjectedVars.esShardTimeout = config.get('elasticsearch.shardTimeout');
          defaultInjectedVars.esApiVersion = config.get('elasticsearch.apiVersion');
        }

        server.decorate('reply', 'renderApp', function (app) {
          var payload = {
            app: app,
            nav: uiExports.apps,
            version: kbnServer.version,
            buildNum: config.get('pkg.buildNum'),
            buildSha: config.get('pkg.buildSha'),
            basePath: config.get('server.basePath'),
            vars: defaults(app.getInjectedVars(), defaultInjectedVars)
          };

          return this.view(app.templateName, {
            app: app,
            loadingGif: loadingGif,
            kibanaPayload: payload,
            bundlePath: config.get('server.basePath') + '/bundles'
          });
        });

      case 95:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this, [[24, 28, 32, 40], [33,, 35, 39], [44, 48, 52, 60], [53,, 55, 59], [63, 76, 80, 88], [81,, 83, 87]]);
};
