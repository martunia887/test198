// @flow
const path = require('path');

const removeExt = filePath => path.basename(filePath, path.extname(filePath));

module.exports = function filterToPages({
  allMdx: { nodes: mdxNodes },
  allWorkspaceInfo: { nodes: wsNodes },
}) {
  const tabbedPages = {};
  const soloPages = [];

  for (const mdx of mdxNodes) {
    const { absolutePath } = mdx.parent;

    // BC: this is a bug waiting to happen and needs refactoring
    // If we have a absPath like `/User/me/projects/constellation/package/button/constellation
    // this will go wrong...
    const [packageDir, filePath] = absolutePath.split('/constellation/');
    const workspace = wsNodes.find(ws => ws.dir === packageDir);

    // If there is no filepath, it means the file was not in the constellation folder
    // If there is no workspace, then it means that it is not related to a workspace
    if (workspace && filePath) {
      // next check, are we a single page, or a folder
      // This is also v fragile at the moment - we don't support further nested
      // docs so that is all we are handling right now..
      if (filePath.includes('/')) {
        const [pageName, pageType] = filePath.split('/');
        let replacementUrl;
        if (pageName === 'index') {
          replacementUrl = path.join('components', workspace.docsDisplayName);
        }

        if (!tabbedPages[pageName]) {
          tabbedPages[pageName] = {
            component: workspace.name,
            url:
              replacementUrl ||
              path.join('components', workspace.docsDisplayName, pageName),
            template: 'tabbed-page.tsx',
            context: {},
          };
        }

        const { context } = tabbedPages[pageName];

        switch (removeExt(pageType)) {
          case 'developer': {
            context.devContent = mdx.id;
            break;
          }
          case 'design': {
            context.designContent = mdx.id;
            break;
          }
          case 'examples': {
            context.examplesContent = mdx.id;
            break;
          }
          default: {
            throw new Error(
              `When parsing a component's docs we came across an unknown file: ${absolutePath} - please move this file to a different location`,
            );
          }
        }
      } else {
        soloPages.push({
          url: path.join(
            'components',
            workspace.docsDisplayName,
            removeExt(filePath),
          ),
          component: workspace.name,
          template: 'solo-page.tsx',
          context: { id: mdx.id },
        });
      }
    }
  }

  return [...soloPages, ...Object.values(tabbedPages)];
};
