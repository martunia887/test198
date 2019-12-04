const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const JWTModule = require('jsonwebtoken');
const {
  jwtSecret,
  jwtExpiry,
  googleCallbackUrl,
  googleClientId,
  googleClientSecret,
} = require('../constants');

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: googleCallbackUrl,
    },
    (
      accessToken,
      refreshToken,
      { name, displayName, photos, ...rest },
      done,
    ) => {
      // on successful google oAuth2.0 validation
      // we hash the necessary but not sensitive parts of the retrieved google profile
      // into a signed JWT
      // and set the expiry to 1d.
      const profile = { displayName, photos };
      const token = JWTModule.sign(profile, jwtSecret, {
        expiresIn: jwtExpiry,
      });
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
      // on successful decryption of the JWT token
      // we pass the payload (the users google displayName and photo)
      // to passport to attach to req.user
      return done(null, { displayName, photos });
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
