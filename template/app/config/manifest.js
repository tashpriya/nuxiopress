// manifest configuration for nuxt.config.js
require('dotenv').config();

export default {
  name: process.env.APP_NAME,
  short_name: process.env.APP_SHORT_NAME,
  start_url: process.env.APP_URL,
  description: process.env.APP_DESCRIPTION,
  theme_color: process.env.THEME_COLOR,
  icons: [
    {
      src: '/images/icons/48.png',
      sizes: '48x48',
      type: 'image/png'
    },
    {
      src: '/images/icons/72.png',
      sizes: '72x72',
      type: 'image/png'
    },
    {
      src: '/images/icons/96.png',
      sizes: '96x96',
      type: 'image/png'
    },
    {
      src: '/images/icons/144.png',
      sizes: '144x144',
      type: 'image/png'
    },
    {
      src: '/images/icons/168.png',
      sizes: '168x168',
      type: 'image/png'
    },
    {
      src: '/images/icons/192.png',
      sizes: '192x192',
      type: 'image/png'
    }
  ]
  // Google Play Store Link if Available
  /* related_applications: [{
    platform: 'play',
    url: 'https://play.google.com/store/apps/details?id='
  }] */
};
