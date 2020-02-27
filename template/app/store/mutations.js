export default {
  SET_BEARER(state, accessToken) {
    this.$axios.setToken(accessToken, 'Bearer');
  },

  // Updates user info in state and localstorage
  UPDATE_USER_INFO(state, payload) {
    // Get Data localStorage
    this.$setLocal('user_data', payload, true);
  }
};
