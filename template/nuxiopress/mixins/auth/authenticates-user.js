import EventEmitter from 'events';
import authConfig from '~/config/auth';

class AuthenticatesUser extends EventEmitter {
  /**
   * Nuxt context property
   * @type {Object}
   */
  context = undefined;
  /**
   * Configuration for auth
   * @type {Object}
   */
  config = undefined;
  /**
   * This define if login got an error
   * @type {boolean}
   */
  formHasError = false;

  constructor({ context }) {
    super();
    if (!context) {
      console.error('Nuxt context not provided!');
    }
    this.context = context;
    this.config = authConfig;
    if (typeof this['handleLoginEvent'] === 'function') {
      this.addListener('loginEvent', this['handleLoginEvent']);
    }
  }

  async init() {
    let auth = this.context.app.$getCookie('loggedIn', { json: true });

    if (auth && auth.token) {
      this.context.store.commit('auth/SET_BEARER', auth.token);
      if (new Date(Date.now()).getTime() < new Date(parseInt(auth.expires))) {
        await this.context.store.dispatch('auth/fetchUser');
      } else {
        await this.renewToken();
      }
    }
  }

  check() {
    return (
      this.context.store.state.auth.loggedIn &&
      typeof this.context.store.state.auth.user === 'object'
    );
  }

  /**
   * Login with email & password
   * @param {String} email
   * @param {String} password
   * @returns {Promise<T>}
   */
  async login(email, password) {
    return new Promise((resolve, reject) => {
      this.context.store
        .dispatch('auth/login', {
          email: email,
          password: password
        })
        .then(response => {
          resolve(response.userData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Login with email & password
   * @param {Object} data
   * @returns {Promise<T>}
   */
  async register(data) {
    return new Promise((resolve, reject) => {
      this.context.store
        .dispatch('auth/register', data)
        .then(response => {
          resolve(response.userData);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /**
   * Login with email & password
   * @param {String} provider
   * @returns {Promise<T>}
   */
  async loginSocial(provider) {
    await this.context.store.dispatch('auth/social', provider).then(
      // eslint-disable-next-line no-unused-vars
      res => {
        this.context.app.$toast.success('Login Successful!');
        this.context.redirect('/home');
      },
      // eslint-disable-next-line no-unused-vars
      err => {
        this.context.app.$toast.error(
          'Something Went Wrong! Please Try Again!!'
        );
      }
    );
  }

  async renewToken() {
    await this.context.store.dispatch('auth/renewAccessToken');
  }

  async logout() {
    await this.context.store.dispatch('auth/logout');
    this.context.redirect('/');
  }
}

export default AuthenticatesUser;
