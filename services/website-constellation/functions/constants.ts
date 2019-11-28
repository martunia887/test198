const constellationUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.CONSTELLATION_ORIGIN
    : 'http://localhost:8888';
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const contentfulUrl = `https://cdn.contentful.com/spaces/${spaceId}?access_token=${accessToken}`;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiry = process.env.JWT_EXPIRY;

module.exports.constellationUrl = constellationUrl;
module.exports.contentfulUrl = contentfulUrl;
module.exports.jwtSecret = jwtSecret;
module.exports.jwtExpiry = jwtExpiry;
