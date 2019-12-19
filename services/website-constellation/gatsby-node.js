// @flow
let MultiEntrypointAliases;

const path = require('path');
const filterTopages = require('./helpers/filter-to-pages');

try {
  // eslint-disable-next-line
  MultiEntrypointAliases = require('./aliases-written-map.json');
} catch (e) {
  throw new Error(
    'ERROR - Local aliases have not been written. Please write aliases before continuing by running `yarn constellation:aliases`',
  );
}

// function createDocsPages(graphql, createPage) {
//   return new Promise((resolve, reject) => {
//     resolve(
//       graphql(
//         `
//           {
//             allWorkspaceInfo {
//               nodes {
//                 dir
//                 docsDisplayName
//                 name
//               }
//             }
// allMdx {
//   nodes {
//     id
//     tableOfContents
//     parent {
//       ... on File {
//         absolutePath
//         name
//         sourceInstanceName
//       }
//     }
//   }
// }
//           }
//         `,
//       ).then(result => {
//         if (result.errors) {
//           console.log(result.errors); // eslint-disable-line no-console
//           reject(result.errors);
//         }

//         // BC: I am unsure if I want this info to be queriable or not. I've assumed not, but if you
//         // want to change this, move this you will need to add this as nodes
//         const pagesToMake = filterTopages(result.data);

//         pagesToMake.forEach(({ url, template, context }) => {
//           createPage({
//             path: url,
//             context,
//             component: path.resolve(
//               path.join(__dirname, 'src', 'templates', template),
//             ),
//           });
//         });
//       }),
//     );
//   });
// }

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions;
//   return createDocsPages(graphql, createPage);
// };

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  actions.setWebpackConfig({
    resolve: {
      mainFields: ['atlaskit:src', 'module', 'browser', 'main'],
      extensions: ['.js', '.ts', '.tsx'],
      alias: MultiEntrypointAliases,
    },
  });
  const config = getConfig();

  config.module.rules = [
    // Omit the default rule where test === '\.jsx?$'
    ...config.module.rules.filter(
      rule => String(rule.test) !== String(/\.jsx?$/),
      // || String(rule.test) !== String(/\.tsx?$/),
    ),
    // Recreate it with custom exclude filter
    {
      ...loaders.js(),
      test: /\.jsx?$/,
      exclude: modulePath =>
        /node_modules/.test(modulePath) &&
        /*
            What this regex is saying is:
            Do not exclude:
              - files in node_modules
              - that are in a @brisk-docs scoped package
              - BUT still exclude things in the node_modules of that package
          */
        !/node_modules\/@brisk-docs\/[^/]+\/(?!node_modules)/.test(modulePath),
    },
  ];
  actions.replaceWebpackConfig(config);
};
