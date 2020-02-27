require('dotenv').config();
const { resolve } = require('path');

// nuxt configurations
import head from './config/head';
import manifest from './config/manifest';

module.exports = {
  rootDir: resolve(__dirname, '../'),
  srcDir: resolve(__dirname, '../app'),
  buildDir: resolve(__dirname, '../.nuxiopress-dist'),
  dir: {
    static: '../app/static'
  },
  /*
   ** Server configuration
   */
  server: {
    port: 3000,
    host: 'localhost'
    // Uncomment https property for using https
    /*https: {
      key: fs.readFileSync(resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(resolve(__dirname, 'server.crt'))
    }*/
  },
  /*
   ** Modules
   */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/style-resources',
    'nuxt-user-agent',
    'nuxt-i18n',
    // 'bootstrap-vue/nuxt',
    ['@nuxtjs/dotenv', { path: resolve(__dirname, '../') }],
    [
      '@nuxtjs/component-cache',
      {
        max: 10000,
        maxAge: 1000 * 60 * 60
      }
    ]
    // '@nuxtjs/sitemap'
  ],
  toast: {
    theme: 'bubble',
    position: 'bottom-right',
    duration: 5000
  },
  /*
   ** Build Modules
   */
  buildModules: ['@nuxtjs/router'],
  /*
   ** Plugins
   */
  plugins: [
    '~~/nuxiopress/plugins/combined-inject',
    '~~/nuxiopress/plugins/ctx-inject',
    '~~/nuxiopress/plugins/vue-inject',
    '~~/nuxiopress/plugins/secure-storage',
    '~~/nuxiopress/plugins/universal-cookies',
    '~~/nuxiopress/plugins/vee-validate',
    '~~/nuxiopress/plugins/auth',
    '~/plugins/vee-validate',
    //{ src: '~~/nuxiopress/plugins/secure-storage', mode: 'client' },
    { src: '~~/nuxiopress/plugins/v-tooltip', ssr: false },
    { src: '~~/nuxiopress/plugins/axios', ssr: true },
    { src: '~~/nuxiopress/plugins/bootstrap', ssr: false },
    { src: '~~/nuxiopress/plugins/daemonite-material', ssr: false },
    { src: '~~/nuxiopress/plugins/vue-router-back-button', mode: 'client' }
  ],
  /*
   ** Router configuration
   */
  router: {
    middleware: ['user-agent', 'locale']
  },
  /*
   ** Axios Config
   */
  axios: {
    prefix: '/api/',
    proxy: true,
    retry: { retries: 5 }
  },
  proxy: {
    ['/api/']: {
      target: process.env.NUXIOPRESS_API,
      pathRewrite: { '/api/': '' }
    }
  },

  // Uncomment "generate" section, If you are using SPA mode
  /* generate: {
    routes: [
      '/'
    ]
  }, */

  /*
   ** Server middleware
   */
  serverMiddleware: ['~~nuxiopress/api/index.js'],

  globals: {
    id: '__nuxiopress',
    context: '__NUXIOPRESS__',
    pluginPrefix: '__NUXIOPRESS'
  },
  /*
   ** SCSS src
   */
  styleResources: {
    scss: ['~assets/sass/_variables.scss', '~assets/sass/_mixins.scss']
  },
  /*
   ** CSS src
   */
  css: [
    'daemonite-material/assets/scss/material.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~assets/sass/tooltip.scss',
    '~assets/sass/nuxiopress.scss'
  ],
  /**
   *  Transition
   */
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  /*
   ** Headers
   ** Common headers are already provided by @nuxtjs/pwa preset
   */
  head: head,
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#41B883', height: '5px', continuous: true },
  /*
   ** Customize app manifest
   */
  manifest: manifest
};
