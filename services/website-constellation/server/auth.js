const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const serverless = require('serverless-http');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { passport } = require('./passport');
const routes = require('./routes');
const { constellationUrl, cookieSecret } = require('./constants');

const app = express();
app.use(
  cors({
    origin: constellationUrl,
    credentials: true,
  }),
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));

app.use(passport.initialize());

routes(app, passport);
module.exports.handler = serverless(app);
