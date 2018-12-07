const bolt = require('bolt');

async function getStuff() {
  const { dir: rootDir } = await bolt.getProject();

  const workspaces = await bolt.getWorkspaces();

  return (
    workspaces
      .map(({ dir, config }) => ({ dir, name: config.name }))
      // .filter(n => n.match(`${rootDir}/packages`))
      .map(n => [
        { ...n, dir: `${n.dir}/examples` },
        { ...n, dir: `${n.dir}/docs` },
      ])
      .reduce((acc, paths) => [...acc, ...paths], [])
      .map(({ name, dir }) => ({
        resolve: 'gatsby-source-filesystem',
        options: {
          name,
          path: dir,
        },
      }))
  );
}

getStuff().then(console.log);
