const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const JWTModule = require('jsonwebtoken');
const { jwtSecret, expiry } = require('../constants');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (
      accessToken,
      refreshToken,
      { name, displayName, photos, ...rest },
      done,
    ) => {
      const profile = { displayName, photos };
      const token = JWTModule.sign(profile, jwtSecret, { expiresIn: expiry });
      return done(null, { profile, token });
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest(req) {
        if (!req.signedCookies) {
          throw new Error('Missing cookie-parser middleware');
        }
        return req.signedCookies.constellation_token || null;
      },
      secretOrKey: jwtSecret,
    },
    ({ displayName, photos }, done) => {
      try {
        const token = JWTModule.sign({ displayName, photos }, jwtSecret, {
          expiresIn: expiry,
        });
        return done(null, { displayName, photos, token });
      } catch (e) {
        return done(e);
      }
    },
  ),
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

module.exports = {
  passport,
};
