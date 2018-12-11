// @flow
const { getBaseConfig } = require('jest-puppeteer-docker');

const baseConfig = getBaseConfig();
const customConfig = { ...baseConfig };

customConfig.connect.defaultViewport = {
  width: 500,
  height: 500,
};

customConfig.chromiumArgs = [
  '–ignore-certificate-errors',
  '--no-sandbox',
  '--disable-setuid-sandbox',
];

module.exports = customConfig;
