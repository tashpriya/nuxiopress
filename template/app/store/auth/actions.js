import config from '../../config/auth';

export default {
  async login({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(config.jwt.url.login, payload)
        .then(response => {
          // If there's user data in response
          if (response.data.userData) {
            dispatch('setUserInfo', response.data);
            resolve(response.data.userData);
          } else {
            reject({ message: 'Wrong Email or Password' });
          }
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  // eslint-disable-next-line no-unused-vars
  async register({ commit, dispatch }, data) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(config.jwt.url.register, data)
        .then(response => {
          // If there's user data in response
          if (response.data.userData) {
            dispatch('setUserInfo', response.data);
            resolve(response.data.userData);
          }
        })
        .catch(error => {
          reject(error.response);
        });
    });
  },

  async renewAccessToken({ dispatch }) {
    await this.$axios
      .post(config.jwt.url.refresh)
      .then(response => {
        if (response.data.accessToken) {
          dispatch('setUserInfo', response.data);
        } else {
          dispatch('setUserInfo', { userData: null, accessToken: null });
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        dispatch('setUserInfo', { userData: null, accessToken: null });
      });
  },

  async social(context, provider) {
    return new Promise((resolve, reject) => {
      if (process.client) {
        let socialLoginWindow = window.open(
          '/nuxiopress/auth/social/' + provider,
          'popup',
          'toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=400,width=650,height=450'
        );

        let socialInt = window.setInterval(async () => {
          if (socialLoginWindow.closed) {
            let authToken = sessionStorage.getItem('ssnId');

            if (authToken !== undefined) {
              console.log(authToken);
              await this.$axios
                .post(config.jwt.url.refresh, null, {
                  headers: { Authorization: 'Bearer ' + authToken }
                })
                .then(response => {
                  if (response.data.accessToken) {
                    context.dispatch('setUserInfo', response.data);
                  } else {
                    context.dispatch('setUserInfo', {
                      userData: null,
                      accessToken: null
                    });
                  }
                  resolve(true);
                  clearInterval(socialInt);
                })
                // eslint-disable-next-line no-unused-vars
                .catch(error => {
                  sessionStorage.removeItem('ssnId');
                  reject(false);
                  clearInterval(socialInt);
                });
            }
          }
        }, 1000);
      }
    });
  },

  async fetchUser({ dispatch }) {
    await this.$axios
      .get(config.jwt.url.user)
      .then(res => {
        dispatch('setUserInfo', { userData: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  },

  async logout({ dispatch }) {
    // eslint-disable-next-line no-unused-vars
    await this.$axios.$post(config.jwt.url.logout);
    dispatch('setUserInfo', { userData: null, accessToken: null });
  },

  setUserInfo({ commit }, { userData, accessToken, expiresIn }) {
    // Update user details
    if (typeof userData !== 'undefined') commit('UPDATE_USER_INFO', userData);
    // Set bearer token in axios
    if (typeof accessToken !== 'undefined') {
      commit('UPDATE_AUTH_COOKIE', { accessToken, expiresIn });
      commit('SET_BEARER', accessToken);
    }
  }
};
