// @flow
const axios = require('axios');
const { constellationUrl, contentfulUrl } = require('../constants');
function validateRedirect(redirectURI) {
  if (redirectURI == null) return '/';
  return redirectURI;
}
function api(app, passport) {
  app.get('/.netlify/functions/auth/google', (req, res, next) => {
    const redirectURI = validateRedirect(req.query.redirect);
    console.log(req.query);
    const authenticator = passport.authenticate('google', {
      scope: ['profile'],
      prompt: 'consent',
      state: req.query.redirect,
    });

    authenticator(req, res, next);
  });

  app.get(
    '/.netlify/functions/auth/user',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      res
        .status(200)
        .json({ displayName: req.user.displayName, photos: req.user.photos });
    },
  );

  app.get(
    '/.netlify/functions/auth/status',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      return res.status(200).json({ success: true });
    },
  );

  app.get(
    '/.netlify/functions/auth/contentful',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
      // TODO implement an actual contentful endpoint here.
      axios
        .get(contentfulUrl)
        .then(response => {
          res.json(response.data);
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.log(err);
          res.status(500);
        });
    },
  );

  app.get(
    '/.netlify/functions/auth/callback',
    passport.authenticate('google', {
      failureRedirect: constellationUrl,
    }),
    (req, res) => {
      console.log(req.query.state);
      // take the token from req.user (attached by passport)
      // and store it in a signed http only cookie.
      res.cookie('constellation_token', req.user.token, {
        httpOnly: true,
        signed: true,
      });
      res.redirect(`${constellationUrl}${req.query.state}`);
    },
  );
}

module.exports = api;
