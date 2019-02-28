const glob = require('glob');
const bolt = require('bolt');
const fs = require('fs');

// regex used on imports: ../([../]+)package.json repalce with: $1package.json
function generateDummyPackageJSON({ name: packageName, dir }) {
  console.log(packageName);
  return new Promise((resolve, reject) => {
    const packageJSON = require(`${dir}/package.json`);
    if (!packageJSON.main) {
      fs.writeFile(
        `${dir}/src/package.json`,
        JSON.stringify(
          { name: packageName, version: 'DEVELOPMENT_VERSION' },
          null,
          2,
        ),
        () => resolve(),
      );
    } else {
      resolve();
    }
  });
}

async function generateDummyPackageJSONs() {
  const workspaces = await bolt.getWorkspaces();

  const aliasPromises = workspaces.map(workspace =>
    generateDummyPackageJSON(workspace),
  );

  console.log('done');
}

async function main() {
  generateDummyPackageJSONs();
}
main();
