//@flow

const esm = t => ({
  plugins: [
    '@babel/transform-runtime',
    ['styled-components', { minify: false }],
  ],
  presets: [t, ['@babel/env', { modules: false }]],
  ignore: ['**/__mocks__', '**/__tests__', '**/__fixtures__', 'node_modules'],
});

const cjs = t => ({
  plugins: [
    '@babel/transform-runtime',
    ['styled-components', { minify: false }],
    'transform-dynamic-import',
  ],
  presets: [t, ['@babel/env', { modules: 'commonjs' }]],
  ignore: ['**/__mocks__', '**/__tests__', '**/__fixtures__', 'node_modules'],
});

module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/syntax-dynamic-import',
  ],
  presets: ['@babel/react'],
  overrides: [
    {
      test: [
        './packages/core/navigation-next',
        './packages/core/drawer',
        './packages/core/global-navigation',
        './packages/core/select',
      ],
      plugins: [['emotion', { hoist: true }]],
    },
  ],
  env: {
    'production:cjs': cjs('@babel/flow'),
    'production:cjs:ts': cjs('@babel/typescript'),
    'production:esm': esm('@babel/flow'),
    'production:esm:ts': esm('@babel/typescript'),
    test: {
      presets: ['@babel/flow', '@babel/env'],
      // There is no @babel/ scoped transform for this plugin
      plugins: ['transform-dynamic-import'],
    },
  },
};
