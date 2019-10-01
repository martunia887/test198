// @flow
module.exports = {
  root: 'packages',
  rulesDir: './build/stricter-rules',
  plugins: ['tangerine'],
  exclude: [/node_modules/, /__fixtures__/, /monorepo-tooling/, /build/],
  rules: {
    // TODO: https://product-fabric.atlassian.net/browse/BUILDTOOLS-272
    // We have to wait till stricter support TS to add dedicated files.
    'tangerine/project-structure': ({ packages }) =>
      packages.map(pkg => ({
        level: 'error',
        config: {
          rootPath: pkg,
          definitions: {
            '.': {
              'README.md': { type: 'file' },
              'package.json': { type: 'file' },
              node_modules: { type: 'dir' },
              src: {
                __tests__: {
                  unit: { type: 'dir' },
                  integration: { type: 'dir', optional: true },
                  'visual-regression': { type: 'dir', optional: true },
                },
              },
              build: { type: 'dir', optional: true },
              docs: { type: 'dir', optional: true },
              examples: { type: 'dir', optional: true },
            },
          },
        },
      })),
    // TODO: https://product-fabric.atlassian.net/browse/BUILDTOOLS-268
    // We have to wait till stricter support TS.
    // 'no-unused-dependencies': {
    //   level: 'error',
    //   exclude: [
    //     /^editor\/json-schema-generator\//,
    //     /^core\/single-select\//,
    //     /^core\/navigation\//,
    //     /^core\/multi-select\//,
    //   ],
    //   config: {
    //     exclude: ['@babel/runtime'],
    //     depTransforms: {
    //       '@atlaskit/icon': 'packages/core/icon/',
    //       '@atlaskit/icon-object': 'packages/core/icon-object/',
    //       '@atlaskit/icon-file-type': 'packages/core/icon-file-type/',
    //       '@atlaskit/icon-priority': 'packages/core/icon-priority/',
    //     },
    //   },
    // },
  },
};
