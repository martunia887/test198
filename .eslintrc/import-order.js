module.exports = (absoluteImports = []) => ({
  srcRoots: ['src'],

  moduleImports: [
    [
      /^react$/,

      // test libraries
      /^sinon$/,
      /^enzyme$/,
      /^@storybook/,

      // "view" libraries
      /^prop-types$/,
      /^react/,
      /^styled-components$/,
      /^@atlaskit/,

      // "state" libraries
      /^redux/,
      /^rxjs$/,
      /^reselect$/,
      /^icepick$/,

      /^lodash/,

      // catch all, otherwise would fall into a seperate group
      /./,
    ],
  ],

  absoluteImports: [[/^common\//], ...absoluteImports],

  relativeImports: [/^common$/, /^(?!index)/, /^index/],

  simpleFormattingCount: 3,
});
