const axios = require('axios');
const { logger } = require('../utils');
const { constellationUrl, contentfulUrl } = require('../constants');
function api(app, passport) {
  app.get(
    '/.netlify/functions/auth/google',
    passport.authenticate('google', {
      scope: ['profile'],
      prompt: 'consent',
    }),
  );

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
      res.cookie('constellation_token', req.user.token, {
        httpOnly: true,
        signed: true,
      });
      res.redirect();
    },
  );
}

module.exports = api;
