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
        level: 'warning',
        // TODO: EXclude rule does not seem to work.
        exclude: [
          /^editor\/json-schema-generator\//,
          /^trello\/textfield\//,
          /^core\/icon\//,
          /^core\/icon-*\//,
          /^core\/single-select\//,
          /^core\/navigation\//,
          /^core\/multi-select\//,
          /^core\/polyfills\//,
        ],
        config: {
          rootPath: pkg,
          definitions: {
            '.': {
              /* Dir */
              // TODO: to be removed.
              '__tests-karma__': { type: 'dir', optional: true },
              __fixtures__: { type: 'dir', optional: true },
              build: { type: 'dir', optional: true },
              docs: { type: 'dir', optional: true },
              examples: { type: 'dir', optional: true },
              'mock-helpers': { type: 'dir', optional: true },
              'example-helpers': { type: 'dir', optional: true },
              // TODO: We need to have one convention.
              'examples-helpers': { type: 'dir', optional: true },
              'examples-util': { type: 'dir', optional: true },
              // TODO: Node modules are .gitignore and I don't think stricter see them.
              node_modules: { type: 'dir', optional: true },
              /*-------------*/
              /* Files */
              'README.md': { type: 'file', optional: true },
              'CHANGELOG.md': { type: 'file' },
              'package.json': { type: 'file' },
              // TODO: Some packages are still in JS.
              'tsconfig.json': { type: 'file', optional: true },
              // TODO: clarify what this file is about.
              'tsconfig.json.ts-node.json': { type: 'file', optional: true },
              '.npmignore': { type: 'file' },
              LICENSE: { type: 'file' },
              /*-------------*/
              /* Source */
              src: { type: 'dir' },
              // // src: {
              // //   util: { type: 'dir' ,  optional: true},
              // //   // TODO: We need to have one convention.
              // //   utils: { type: 'dir' ,  optional: true},
              // //   i18n: { type: 'dir' ,  optional: true},
              // //   assets: { type: 'dir' ,  optional: true},
              // //   model: { type: 'dir' ,  optional: true},
              // //   api: { type: 'dir' ,  optional: true},
              // //   // TODO: We need to have one convention.
              // //   provider: { type: 'dir' ,  optional: true},
              // //   providers :{ type: 'dir' ,  optional: true},
              // //   mocks: { type: 'dir' ,  optional: true},
              // //   client: { type: 'dir' ,  optional: true},
              // //   components: { type: 'dir' ,  optional: true},
              // //   internal: { type: 'dir' ,  optional: true},
              // //   transforms: { type: 'dir' ,  optional: true},
              // //   hoc: { type: 'dir' ,  optional: true},
              // //   styled: { type: 'dir' ,  optional: true},
              // //   theme: { type: 'dir' ,  optional: true},
              // //   config: { type: 'dir' ,  optional: true},
              // //   InlineDialog: { type: 'dir' ,  optional: true},
              // //   Lozenge: { type: 'dir' ,  optional: true},
              // //   PageHeader: { type: 'dir' ,  optional: true},
              // //   ProgressTracker: { type: 'dir' ,  optional: true},
              // //   ProgressTrackerLink: { type: 'dir' ,  optional: true},
              // //   ProgressTrackerStage: { type: 'dir' ,  optional: true},
              // //   PopupSelect: { type: 'dir' ,  optional: true},
              // //   Spinner: { type: 'dir' ,  optional: true},
              // //   Chrome: { type: 'dir' ,  optional: true},
              // //   Content: { type: 'dir' ,  optional: true},
              // //   RemoveButton: { type: 'dir' ,  optional: true},
              // //   Tag: { type: 'dir' ,  optional: true},
              // //   TagGroup: { type: 'dir' ,  optional: true},
              // //   data: { type: 'dir' ,  optional: true},
              // //   BitbucketLogo: { type: 'dir' ,  optional: true},
              // //   ConfluenceLogo: { type: 'dir' ,  optional: true},
              // //   HipchatLogo: { type: 'dir' ,  optional: true},
              // //   JiraCoreLogo: { type: 'dir' ,  optional: true},
              // //   JiraLogo: { type: 'dir' ,  optional: true},
              // //   JiraServiceDeskLogo: { type: 'dir' ,  optional: true},
              // //   JiraSoftwareLogo: { type: 'dir' ,  optional: true},
              // //   OpsGenieLogo: { type: 'dir' ,  optional: true},
              // //   StatuspageLogo: { type: 'dir' ,  optional: true},
              // //   StrideLogo: { type: 'dir' ,  optional: true},
              // //   TrelloLogo: { type: 'dir' ,  optional: true},
              // //   common: { type: 'dir' ,  optional: true},
              // //   renderer: { type: 'dir' ,  optional: true},
              // //   // TODO: We need to have one convention.
              // //   services: { type: 'dir' ,  optional: true},
              // //   service: { type: 'dir' ,  optional: true},
              // //   controllers: { type: 'dir' ,  optional: true},
              // //   'ui-controller':{ type: 'dir' ,  optional: true},
              // //   'view-controller':{ type: 'dir' ,  optional: true},
              // //   primitive :{ type: 'dir' ,  optional: true},
              // //   __tests__: {
              // //     mocks: { type: 'dir', optional: true },
              // //     __fixtures__: { type: 'dir', optional: true },
              // //      unit: { type: 'dir' },
              // //     integration: { type: 'dir', optional: true },
              // //     'visual-regression': { type: 'dir', optional: true },
              // //   },
              //   // TODO: Some packages are still in JS.
              //   'index.ts': { type: 'file' , optional: true},
              //   '*': { type: 'file' },
              //    'version.json': { type: 'file' },
              //   }
            },
          },
        },
      })),
    // TODO: https://product-fabric.atlassian.net/browse/BUILDTOOLS-268
    // We have to wait till stricter support TS.
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
