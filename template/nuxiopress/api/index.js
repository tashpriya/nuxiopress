const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const Cookies = require('cookies');
const cors = require('cors');
const passport = require('passport');
const app = express();

app.use(bodyParser.json());

app.use(Cookies.express());

// Sessions to create `req.session`
app.use(
  session({
    name: '_nuxiopress_session',
    store: new MemoryStore({
      checkPeriod: 180000 // prune expired entries 2 Min
    }),
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 180000
    },
    unset: 'destroy'
  })
);

app.use(passport.initialize());
app.use(passport.session());

router.use(cors());
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

const auth = require('./auth');
app.use(auth);

// Export the server middleware
module.exports = {
  path: '/nuxiopress',
  handler: app
};
