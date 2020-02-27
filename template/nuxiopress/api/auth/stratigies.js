const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
import authConfig from '../../../app/config/auth';

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(object, cb) {
  cb(null, object);
});

passport.use(
  new GoogleStrategy(authConfig.google, function(
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    cb(null, profile);
  })
);

passport.use(
  new FacebookStrategy(authConfig.facebook, function(
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    cb(null, profile);
  })
);

passport.use(
  new GitHubStrategy(authConfig.github, function(
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    cb(null, profile);
  })
);
