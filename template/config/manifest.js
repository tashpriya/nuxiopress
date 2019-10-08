// manifest configuration for nuxt.config.js
export default {
  name: 'nuxiopress',
  short_name: 'nuxiopress',
  // start_url: 'https://nuxiopress.io',
  description:
    'A Nuxt PWA starter template with Encrypted Cookies, Express.js, Axios, Vue Router, Passport.js.',
  theme_color: '#41B883',
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
