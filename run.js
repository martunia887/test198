// @flow
const commit = process.env.BITBUCKET_COMMIT;
const shortCommit = commit.substr(0, 12);

const fs = require('fs');
const avatarPkgJson = require('./packages/core/avatar/package.json');

const avatarVersion = avatarPkgJson.version;
const expectedAvatarUrl = `http://s3-ap-southeast-2.amazonaws.com/atlaskit-artefacts/${shortCommit}/dists/atlaskit-avatar-${avatarVersion}.tgz`;

const editorCorePackagePath = 'packages/editor/editor-core/package.json';
const editorCorePkg = JSON.parse(
  fs.readFileSync(editorCorePackagePath, 'utf-8'),
);
console.log(editorCorePkg)
editorCorePkg.dependencies['@atlaskit/avatar'] = expectedAvatarUrl;
const editorPkgStr = JSON.stringify(editorCorePkg, null, 2);

console.log(editorPkgStr);
fs.writeFileSync(editorCorePackagePath, editorPkgStr);
