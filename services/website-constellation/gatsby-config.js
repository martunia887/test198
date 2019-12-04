// @flow
const constellationInitialPackages = require('./constellation-package-list');

module.exports = {
  siteMetadata: {
    siteName: `Constellation`,
    siteUrl: `https://atlassian.design`,
    description: `Help us lol`,
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: `@atlaskit/gatsby-theme-brisk`,
      options: {
        packages: constellationInitialPackages,
        docsFolder: 'constellation',
      },
    },
  ],
};
