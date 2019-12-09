// @flow
const constellationUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.CONSTELLATION_ORIGIN
    : 'http://localhost:8888';
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const contentfulUrl = `https://cdn.contentful.com/spaces/${spaceId}?access_token=${accessToken}`;
module.exports.googleCallbackUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.GOOGLE_CALLBACK_URL
    : 'http://localhost:8888/.netlify/functions/auth/callback';
module.exports.googleClientId = process.env.GOOGLE_CLIENT_ID;
module.exports.googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
module.exports.constellationUrl = constellationUrl;
module.exports.contentfulUrl = contentfulUrl;
module.exports.jwtSecret = process.env.JWT_SECRET;
module.exports.jwtExpiry = process.env.JWT_EXPIRY;
module.exports.cookieSecret = process.env.COOKIE_SECRET;
