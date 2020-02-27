import Vue from 'vue';

Vue.prototype.$showToast = (msg, data) => {
  let options = typeof data === 'object' ? data : {};
  options.icon = !options.icon ? 'info' : options.icon;

  msg = typeof msg !== 'string' || msg.length <= 0 ? 'Hello There!' : msg;
  $nuxt.$toast.show(msg, options);
};

Vue.prototype.$showErrorToast = (msg, data) => {
  let options = typeof data === 'object' ? data : {};
  options.icon = !options.icon ? 'error_outline' : options.icon;

  msg =
    typeof msg !== 'string' || msg.length <= 0
      ? 'Oops..! Something wrong!'
      : msg;
  $nuxt.$toast.error(msg, options);
};

Vue.prototype.$showSuccessToast = (msg, data) => {
  let options = typeof data === 'object' ? data : {};
  options.icon = !options.icon ? 'done_all' : options.icon;

  msg = typeof msg !== 'string' || msg.length <= 0 ? 'Successful!' : msg;
  $nuxt.$toast.success(msg, options);
};

Vue.prototype.$showInvalidToast = data => {
  let options = typeof data === 'object' ? data : {};
  options.icon = !options.icon ? 'error_outline' : options.icon;
  $nuxt.$toast.error('Oops! Invalid Data!', options);
};
