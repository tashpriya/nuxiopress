import Vue from 'vue';
import Storage from 'vue-ls';
import { crypto } from '../utils/crypto';

Vue.use(Storage, {
  namespace: 'nuxiopress__',
  name: 'ls',
  storage: process.server ? 'memory' : 'local'
});

Vue.prototype.$storage = {
  /**
   * @param {string} name
   * @param {string|object} value
   * @param {integer} expire
   */
  set(name, value, expire) {
    let data = {
      val: value
    };
    if (!expire) {
      expire = null;
    }
    Vue.ls.set(name, crypto('enc', JSON.stringify(data)), expire);
  },

  /**
   * @param {string} name
   * @returns {string|object}
   */
  get(name) {
    return Vue.ls.get(name)
      ? JSON.parse(crypto('dec', Vue.ls.get(name))).val
      : null;
  },

  /**
   * @param {string} name
   * @returns {boolean}
   */
  remove(name) {
    return Vue.ls.remove(name);
  },

  clear() {
    Vue.ls.clear();
  },

  /**
   * @param {string} name
   * @param {function} callback
   */
  on(name, callback) {
    Vue.ls.on(name, callback);
  },

  /**
   * @param {string} name
   * @param {function} callback
   */
  off(name, callback) {
    Vue.ls.off(name, callback);
  }
};
