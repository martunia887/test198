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
      exclude: [
        /^editor\/json-schema-generator\//,
        /^core\/single-select\//,
        /^core\/navigation\//,
        /^core\/multi-select\//,
      ],
      config: {
        exclude: ['@babel/runtime'],
        depTransforms: {
          '@atlaskit/icon': 'packages/core/icon/',
          '@atlaskit/icon-object': 'packages/core/icon-object/',
          '@atlaskit/icon-file-type': 'packages/core/icon-file-type/',
          '@atlaskit/icon-priority': 'packages/core/icon-priority/',
        },
      },
    },
  },
};
