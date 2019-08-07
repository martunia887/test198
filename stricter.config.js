// @flow
module.exports = {
  root: 'packages',
  rulesDir: './build/stricter-rules',
  plugins: ['tangerine'],
  exclude: [/node_modules/, /__fixtures__/, /monorepo-tooling/],
  rules: {
    // We need to update the rule to be applicable to Atlaskit.
    //   'tangerine/project-structure': ({ packages }) => packages.map(pkg => ({
    //     level: 'error',
    //     config: {
    //       rootPath: pkg,
    //       definitions:{
    //         '.':{
    //           'package.json': {type: 'file'}
    //         }
    //       }
    //     },
    // })),
    'no-unused-dependencies': {
      level: 'error',
      config: {},
    },
  },
};
