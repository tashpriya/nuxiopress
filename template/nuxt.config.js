require('dotenv').config();
import webpack from 'webpack';
const merge = require('deepmerge');

const baseConfig = require('./nuxiopress/base.config');
const nuxiopressConfig = require('./app/nuxiopress.config');

const nuxt = merge(baseConfig, nuxiopressConfig, {
  arrayMerge: (target, source, options) => {
    const destination = target.slice();

    source.forEach((item, index) => {
      if (typeof destination[index] === 'undefined') {
        destination[index] = options.cloneUnlessOtherwiseSpecified(
          item,
          options
        );
      } else if (options.isMergeableObject(item)) {
        destination[index] = merge(target[index], item, options);
      } else if (target.indexOf(item) === -1) {
        destination.push(item);
      }
    });
    return destination;
  }
});

/*
 ** Build configuration
 */
nuxt.build = {
  crossorigin: 'anonymous',
  publicPath: '/_nuxiopress/',
  extractCSS: true,
  babel: {
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }]
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      _: 'lodash',
      Popper: 'popper.js'
    })
  ],
  transpile: ['vee-validate'],
  // vendor: ['jquery', 'bootstrap', 'popper.js', 'daemonite-material'],
  extend(config, ctx) {
    if (ctx.isDev) {
      config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';
    }
    // Run ESLint on save
    if (ctx.isDev && ctx.isClient) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/
      });
    }
    config.node = {
      fs: 'empty'
    };
  },
  filenames: {
    chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[chunkhash].js')
  }
};

module.exports = nuxt;
