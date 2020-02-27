export default {
  redirect: {
    login: '/login',
    logout: '/',
    home: '/',
    callback: '/login'
  },
  // -- Cookie Store --
  cookie: {
    prefix: '_nuxiopress_auth.',
    options: {
      path: '/'
    }
  },
  // -- localStorage Store --
  localStorage: {
    prefix: '_nuxiopress_auth.'
  },

  strategies: {
    local: {
      endpoints: {
        login: {
          url: '/nuxiopress/auth/login',
          method: 'post',
          propertyName: 'token'
        },
        logout: { url: '/api/auth/logout', method: 'post' },
        user: {
          url: '/api/auth/user',
          method: 'get',
          propertyName: 'user'
        }
      }
    }
  }
};
