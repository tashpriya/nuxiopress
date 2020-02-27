export default {
  UPDATE_AUTH_COOKIE(state, payload) {
    if (!payload.accessToken) {
      this.$removeCookie('loggedIn');
    } else {
      this.$setCookie(
        'loggedIn',
        {
          token: payload.accessToken,
          expires: new Date(Date.now()).getTime() + payload.expiresIn * 1000
        },
        {
          expires: 7 // days
        }
      );
    }
  },

  SET_BEARER(state, token) {
    if (!token) {
      this.$axios.setToken(false);
    } else {
      this.$axios.setToken(token, 'Bearer');
    }
  },

  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, user) {
    state.user = !user ? null : user;
    state.loggedIn = user !== undefined && user !== null;
  }
};
