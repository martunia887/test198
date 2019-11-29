require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { passport } = require('./passport');
const routes = require('./routes');
const { constellationUrl, cookieSecret } = require('./constants');

app.use(
  cors({
    origin: constellationUrl,
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('cookie-parser')(cookieSecret));

app.use(passport.initialize());

routes(app, passport);
module.exports.handler = serverless(app);
