import Cookies from 'js-cookie';
import { reqCookies } from '../utils';
import { crypto } from '../utils/crypto';

// eslint-disable-next-line no-unused-vars
export default ({ app, req, res }, inject) => {
  /*
   * Set Cookie in Client
   */
  inject('setCookie', (name, value, options) => {
    name = '_nuxiopress_' + name;
    let cookieVal =
      typeof value === 'object'
        ? JSON.stringify(value)
        : value
        ? value.toString()
        : '';
    cookieVal = crypto('enc', cookieVal);

    if (process.server) {
      const cookies = reqCookies(req, res);
      let attributes = {
        path: typeof options.path === 'string' ? options.path : '/',
        expires:
          options.expires !== undefined
            ? new Date(Date.now() + options.expires * 24 * 60 * 60 * 1000)
            : undefined,
        secure: process.env.APP_ENV === 'production'
      };
      cookies.set(name, cookieVal, attributes);
    }

    if (process.client) {
      let attributes = {
        path: typeof options.path === 'string' ? options.path : '/',
        expires: options.expires !== undefined ? options.expires : undefined
        // secure: true
      };
      Cookies.set(name, cookieVal, attributes);
    }
  });

  /*
   * Get Cookie in Client & Server
   */
  inject('getCookie', (name, options = { json: false }) => {
    name = '_nuxiopress_' + name;
    if (process.server && req.headers.cookie) {
      const cookies = reqCookies(req, res);
      let cookieVal = cookies.get(name);
      if (cookieVal === undefined || cookieVal === null || cookieVal === '') {
        return null;
      }
      cookieVal = crypto('dec', cookies.get(name));
      return !options.json ? cookieVal : JSON.parse(cookieVal);
    }

    if (process.client) {
      let cookieVal = Cookies.get(name);
      if (cookieVal === undefined || cookieVal === null || cookieVal === '') {
        return null;
      }
      cookieVal = crypto('dec', Cookies.get(name));
      return !options.json ? cookieVal : JSON.parse(cookieVal);
    }
  });

  /*
   * Remove Cookie in Client
   */
  inject('removeCookie', (name, path = '/') => {
    name = '_nuxiopress_' + name;

    if (process.client) {
      Cookies.set(name, '', { path: path, expires: -1 });
    }

    if (process.server) {
      const cookies = reqCookies(req, res);
      cookies.set(name, '', {
        path: path,
        expires: new Date(Date.now() - 10000)
      });
    }
  });
};
