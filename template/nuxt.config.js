require('dotenv').config()
import webpack from 'webpack'

// nuxt configurations
import head from './config/head'
import manifest from './config/manifest'

module.exports = {
  /*
  ** Server configuration
  */
  server: {
    port: 3000
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    'nuxt-user-agent',
    'bootstrap-vue/nuxt'
    // '@nuxtjs/sitemap'
  ],
  /*
  ** Modules
  */
  buildModules: [
    '@nuxtjs/router'
  ],
  /*
  ** Plugins
  */
  plugins: [
    { src: '~/plugins/bootstrap', ssr: false }
  ],
  /*
  ** Router configuration
  */
  router: {
    middleware: []
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
  serverMiddleware: [],
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery',
        '_': 'lodash'
      })
    ]
  },
  /*
  ** Server middleware
  */
  css: [

  ],
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: head,
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#41B883' },
  /*
  ** Customize app manifest
  */
  manifest: manifest
}
