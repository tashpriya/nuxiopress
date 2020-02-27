export default {
  // url to where user will be redirect after successful login
  redirect: '/home',
  jwt: {
    /*
     * Expected Response for (login, register, refresh) => { userData, accessToken, expiresIn }
     * Expected Response for (user) => userData as Object
     */
    url: {
      login: '/auth/login',
      register: '/auth/register',
      refresh: '/auth/refresh',
      user: '/auth/me',
      logout: '/auth/logout'
    }
  },
  google: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:3000/nuxiopress/auth/social-callback/google'
  },
  facebook: {
    clientID: '',
    clientSecret: '',
    callbackURL:
      'http://localhost:3000/nuxiopress/auth/social-callback/facebook'
  },
  github: {
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:3000/nuxiopress/auth/social-callback/github'
  }
};
