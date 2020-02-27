// eslint-disable-next-line no-unused-vars
export default function({ app, store, $axios, isDev, redirect }) {
  if (process.env.API_KEY_NAME && process.env.API_KEY_VALUE) {
    $axios.setHeader(process.env.API_KEY_NAME, process.env.API_KEY_VALUE);
  }
  if (process.env.API_SECRET_NAME && process.env.API_SECRET_VALUE) {
    $axios.setHeader(process.env.API_SECRET_NAME, process.env.API_SECRET_VALUE);
  }

  if (store.state.auth.loggedIn) {
    let auth = app.$getCookie('loggedIn', { json: true });
    $axios.setToken(auth.token, 'Bearer');
  }

  $axios.onRequest(config => {
    /*if (store.getters['auth/check']) {
      $axios.setHeader('Authorization', store.getters['auth/token']);
      $axios.setHeader('X-Authorization', store.getters['auth/token']);
    }*/
    if (isDev) {
      console.log('Making request to: ' + config.url);
    }
  });

  $axios.onError(error => {
    if (isDev) {
      console.log(error.response);
    }
  });
}
