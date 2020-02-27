import AuthenticatesUser from '../mixins/auth/authenticates-user';

// eslint-disable-next-line no-unused-vars
export default (context, inject) => {
  inject('auth', new AuthenticatesUser({ context }));
};
