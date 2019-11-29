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
module.exports.googleClientId =
  '198662005519-fllpbeelnsrb39r8u2fo3noku1h62rm2.apps.googleusercontent.com';
module.exports.googleClientSecret = 'AoYdvSQNicMEB8Nn0T9UI9Pu';
module.exports.constellationUrl = constellationUrl;
module.exports.contentfulUrl = contentfulUrl;
module.exports.jwtSecret = 'super-secret-key';
module.exports.jwtExpiry = '120000';
module.exports.cookieSecret = 'super-secret-cookie';
