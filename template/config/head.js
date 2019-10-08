// head configuration for nuxt.config.js
export default {
  title:
    'NuxioPress :: A Nuxt PWA starter template with Encrypted Cookies, Express.js, Axios, Vue Router, Passport.js.',
  titleTemplate: '%s - NuxioPress',
  htmlAttrs: {
    lang: process.env.APP_LOCALE
  },
  meta: [
    { hid: 'charset', charset: 'utf-8' },
    { hid: 'http-equiv', 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    {
      hid: 'viewport',
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    {
      hid: 'description',
      name: 'description',
      content:
        'A Nuxt PWA starter template with Encrypted Cookies, Express.js, Axios, Vue Router, Passport.js.'
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content:
        'Nuxt.js, Vue.js, Nuxt Starter, Nuxt PWA, Express.js, Vue Router, Vue SSR, Node, Axios, Starter Template'
    },
    { hid: 'copyright', name: 'copyright', content: 'RightBrainTechBD' },
    { hid: 'language', name: 'language', content: process.env.APP_LOCALE },
    { hid: 'robots', name: 'robots', content: 'index,follow' },
    { hid: 'googlebot', name: 'googlebot', content: 'index,follow' },
    { hid: 'Classification', name: 'Classification', content: '' },
    { hid: 'designer', name: 'designer', content: 'RightBrainTechBD' },
    { hid: 'reply-to', name: 'reply-to', content: 'info@rightbraintechbd.com' },
    { hid: 'category', name: 'category', content: 'Template' },
    {
      hid: 'og:title',
      name: 'og:title',
      property: 'og:title',
      content:
        'NuxioPress - A Nuxt PWA starter template with Encrypted Cookies, Express.js, Axios, Vue Router, Passport.js'
    },
    {
      hid: 'og:description',
      name: 'og:description',
      property: 'og:description',
      content:
        'A Nuxt PWA starter template with Encrypted Cookies, Express.js, Axios, Vue Router, Passport.js.'
    }
  ],
  script: [
    { src: 'https://cdn.polyfill.io/v2/polyfill.min.js' },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    {
      rel: 'stylesheet',
      href:
        'https://fonts.googleapis.com/css?family=Quicksand:400,500,600,700&display=swap'
    }
  ]
};
