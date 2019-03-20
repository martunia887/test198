//@flow

const bolt = require('bolt');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

async function renderExampleToString() {
  const [, , avatar] = await bolt.getWorkspaces({
    onlyFs: 'packages/core/**',
  });
  // read directory for examples
  const avatarExamples = await readDir(path.join(avatar.dir, 'examples'));
  // read each example file and render to string

  for (const avatarExample of avatarExamples) {
    const example = path.join(avatar.dir, 'examples', avatarExample);
    // $StringLitteral;
    const exampleContent = require(example).default;
    console.log({ example });
    console.log({ exampleContent });
  }
  // write to a cache folder
}

renderExampleToString().then(() => {
  console.log('done');
});
