// @flow

const constellationInitialPackages = [
  '@atlaskit/radio',
  '@atlaskit/button',
  '@atlaskit/select',
];

module.exports = {
  plugins: [
    {
      resolve: '@manypkg/gatsby-source-workspace',
      options: {
        workspaceFilter: ws => constellationInitialPackages.includes(ws.name),
      },
    },
  ],
};
