require('dotenv').config();
// app manifest
import manifest from './config/manifest';
// nuxt-i18n configuration
import i18n from './config/i18n';

module.exports = {
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
    // '@nuxtjs/sitemap'
  ],
  /*
   ** Build Modules
   */
  buildModules: [
    // ex: '@nuxtjs/router'
  ],
  /*
   ** Plugins
   */
  plugins: [
    '~/plugins/combined-inject',
    '~/plugins/ctx-inject',
    '~/plugins/vue-inject',
    '~/plugins/fontawesome'
  ],
  /*
   ** Router configuration
   */
  router: {
    middleware: [
      // default: 'user-agent', 'auth'
    ]
  },
  /*
   * nuxt-i18n configuration
   */
  i18n: i18n,

  // Uncomment "generate" section, If you are using SPA mode
  /* generate: {
    routes: [
      '/'
    ]
  }, */

  // SCSS src
  styleResources: {
    scss: [
      // Your SCSS Resources
    ]
  },
  /*
   ** CSS src
   */
  css: [
    // Your CSS Sources
  ],
  /*
   ** Headers
   ** Common headers are already provided by @nuxtjs/pwa preset
   */
  head: {
    title:
      'A Nuxt PWA Boilerplate with Encrypted Cookies, Express.js, Axios, Vue Router, Vuex, Passport.js.',
    titleTemplate: '%s - NuxioPress',
    htmlAttrs: {
      lang: process.env.APP_LOCALE
    },
    // HTML Head Meta Tags
    meta: [
      { hid: 'charset', charset: 'utf-8' },
      {
        hid: 'http-equiv',
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      },
      {
        hid: 'viewport',
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#41B883', height: '5px' },
  /*
   ** Customize app manifest
   */
  manifest: manifest
};
