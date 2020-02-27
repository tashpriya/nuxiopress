const Cookies = require('cookies');

export function reqCookies(req, res) {
  return new Cookies(req, res);
}

export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition;
  }

  let position = {};

  if (to.matched.length < 2) {
    position = { x: 0, y: 0 };
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    position = { x: 0, y: 0 };
  }
  if (to.hash) {
    position = { selector: to.hash };
  }

  return position;
}
