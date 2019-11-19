// @flow

module.exports = {
  plugins: [
    // {
    //   resolve: '@manypkg/gatsby-source-workspace',
    //   options: {
    //     extraFields: [
    //       {
    //         name: 'maintainers',
    //         definition: `String`,
    //       },
    //     ],
    //   },
    // },
    {
      resolve: require.resolve('@brisk-docs/gatsby-plugin'),
    },
  ],
};
