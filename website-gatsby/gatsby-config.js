const bolt = require('bolt');
const fs = require('fs');
const path = require('path');

async function getStuff() {
  const { dir: rootDir } = await bolt.getProject({ cwd: '../' });

  const workspaces = await bolt.getWorkspaces({ cwd: rootDir });

  const something = workspaces
    .map(({ dir, config }) => ({ dir, name: config.name }))
    // .filter(n => n.match(`${rootDir}/packages`))
    .map(n => [
      { name: `${n.name}-examples`, dir: `${n.dir}/examples` },
      { name: `${n.name}-docs`, dir: `${n.dir}/docs` },
    ])
    .reduce((acc, paths) => [...acc, ...paths], [])
    .filter(({ dir }) => fs.existsSync(dir))
    .filter(({ name }) => name.match('button'))
    .map(({ name, dir }) => ({
      resolve: 'gatsby-plugin-page-creator',
      options: {
        name,
        path: dir,
      },
    }));

  return something;
}

module.exports = getStuff().then(
  ourFiles =>
    console.log('in the end', ourFiles) || {
      siteMetadata: {
        siteName: `Using Typescript Example`,
      },
      plugins: [`gatsby-plugin-typescript`, ...ourFiles],
    },
);
