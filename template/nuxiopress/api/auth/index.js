const { Router } = require('express');
const router = Router();
const passport = require('passport');
const Local = require('./local');
require('./stratigies');

router.get('/exp', (req, res) => {
  res.send('Express Test!');
});

router.get(
  '/auth/social/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  })
);

router.get(
  '/auth/social-callback/google',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    await Local.authenticate(req.user, function(ssnId) {
      res.send(
        '<script>' +
          'if (window.opener !== null && !window.opener.closed) {' +
          'window.opener.sessionStorage.setItem("ssnId", "' +
          ssnId +
          '");' +
          'window.close();' +
          '}' +
          '</script>'
      );
    });
  }
);

router.get('/auth/social/facebook', passport.authenticate('facebook'));

router.get(
  '/auth/social-callback/facebook',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  async (req, res) => {
    await Local.authenticate(req.user, function(ssnId) {
      res.send(
        '<script>' +
          'if (window.opener !== null && !window.opener.closed) {' +
          'window.opener.sessionStorage.setItem("ssnId", "' +
          ssnId +
          '");' +
          'window.close();' +
          '}' +
          '</script>'
      );
    });
  }
);

router.get('/auth/social/github', passport.authenticate('github'));

router.get(
  '/auth/social-callback/github',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    await Local.authenticate(req.user, function(ssnId) {
      res.send(
        '<script>' +
          'if (window.opener !== null && !window.opener.closed) {' +
          'window.opener.sessionStorage.setItem("ssnId", "' +
          ssnId +
          '");' +
          'window.close();' +
          '}' +
          '</script>'
      );
    });
  }
);

module.exports = router;
