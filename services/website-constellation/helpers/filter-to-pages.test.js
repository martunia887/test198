// @flow
const path = require('path');
const filterToPages = require('./filter-to-pages');

const getAbsDir = something => path.join(__dirname, something);

const getFauxMDxNode = (name, absolutePath) => ({
  id: `${name}-${absolutePath}`,
  parent: {
    absolutePath,
    name,
  },
});

const getFauxMdCluster = (componentName, pageName) => [
  getFauxMDxNode(
    'developer',
    path.join(
      __dirname,
      componentName,
      'constellation',
      pageName,
      'developer.mdx',
    ),
  ),
  getFauxMDxNode(
    'examples',
    path.join(
      __dirname,
      componentName,
      'constellation',
      pageName,
      'examples.mdx',
    ),
  ),
  getFauxMDxNode(
    'design',
    path.join(
      __dirname,
      componentName,
      'constellation',
      pageName,
      'design.mdx',
    ),
  ),
];

const getFauxWSInfo = pkgName => ({
  dir: path.join(__dirname, pkgName),
  docsDisplayName: pkgName,
  name: `@atlaskit/${pkgName}`,
});

describe('filter-to-pages', () => {
  it('should filter a base set of faux node', () => {
    const pkgName = 'my-cool-package';
    const pkgPath = getAbsDir(pkgName);

    const allWorkspaceInfo = { nodes: [getFauxWSInfo(pkgName)] };

    const fileName = 'something-something.mdx';
    const absFilePath = path.join(
      pkgPath,
      'constellation',
      `something-something.mdx`,
    );

    const allMdx = { nodes: [getFauxMDxNode(fileName, absFilePath)] };

    expect(filterToPages({ allMdx, allWorkspaceInfo })).toEqual([
      {
        component: '@atlaskit/my-cool-package',
        url: 'my-cool-package/something-something',
        template: 'solo-page.tsx',
        context: { id: `${fileName}-${absFilePath}` },
      },
    ]);
  });
  it('should filter a faux cluster', () => {
    const pkgName = 'my-cool-package';

    const allWorkspaceInfo = { nodes: [getFauxWSInfo(pkgName)] };
    const allMdx = { nodes: getFauxMdCluster(pkgName, 'sub-items-are-cool') };

    expect(filterToPages({ allMdx, allWorkspaceInfo })).toEqual([
      {
        component: '@atlaskit/my-cool-package',
        url: 'my-cool-package/sub-items-are-cool',
        template: 'tabbed-page.tsx',
        context: {
          designContent:
            'design-/Users/bconolly/Development/atlaskit-clone-2/services/website-constellation/helpers/my-cool-package/constellation/sub-items-are-cool/design.mdx',
          devContent:
            'developer-/Users/bconolly/Development/atlaskit-clone-2/services/website-constellation/helpers/my-cool-package/constellation/sub-items-are-cool/developer.mdx',
          examplesContent:
            'examples-/Users/bconolly/Development/atlaskit-clone-2/services/website-constellation/helpers/my-cool-package/constellation/sub-items-are-cool/examples.mdx',
        },
      },
    ]);
  });
  it('should filter a faux index cluster', () => {
    const pkgName = 'my-cool-package';

    const allWorkspaceInfo = { nodes: [getFauxWSInfo(pkgName)] };
    const allMdx = { nodes: getFauxMdCluster(pkgName, 'index') };

    expect(filterToPages({ allMdx, allWorkspaceInfo })).toEqual([
      {
        component: '@atlaskit/my-cool-package',
        url: 'my-cool-package',
        template: 'tabbed-page.tsx',
        context: {
          designContent:
            'design-/Users/bconolly/Development/atlaskit-clone-2/services/website-constellation/helpers/my-cool-package/constellation/index/design.mdx',
          devContent:
            'developer-/Users/bconolly/Development/atlaskit-clone-2/services/website-constellation/helpers/my-cool-package/constellation/index/developer.mdx',
          examplesContent:
            'examples-/Users/bconolly/Development/atlaskit-clone-2/services/website-constellation/helpers/my-cool-package/constellation/index/examples.mdx',
        },
      },
    ]);
  });
  it("should ignore an mdx file that doesn't belong to a workspace", () => {});
  it("should ignore an mdx file that isn't in the constellation folder", () => {});
});
