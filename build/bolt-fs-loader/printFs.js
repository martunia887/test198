/* @flow */

/*::
import type { Directory, File } from './types';
*/
const nodeFs = require('fs-extra');
const mkdirp = require('mkdirp');
const nodePath = require('path');

const websiteSrcDr = nodePath.resolve(__dirname, '../../website/src');

let idCounter = 0;
const map = new Map();
const getFileId = id => {
  const hash = Buffer.from(`${id}`).toString('hex');
  if (!map.has(hash)) {
    map.set(hash, idCounter.toString(36));
    idCounter++;
  }
  return map.get(hash);
};

function pad(str /*: string */, depth /*: number */) {
  return str.padStart(str.length + depth * 2);
}

function getSafeRaw(file) {
  const chunkName = `raw~${nodePath
    .relative(websiteSrcDr, file.path)
    .replace(/\//g, '~')
    .replace(/\.\.~/g, '')}`;
  let raw = `function(){ return import(/* webpackChunkName:"${chunkName}" */'!!raw-loader!${nodePath.relative(
    websiteSrcDr,
    file.path,
  )}'); }`;
  if (['.json'].includes(nodePath.extname(file.path))) {
    raw = `function(){ return Promise.reject({
        error: "We cannot parse raw json at the moment due to weback4 trying to parse json after it has gone through the raw loader. Please use the non-raw version of of JSON files"
      }) }`;
  }
  return raw;
}

const fakeFiles = nodePath.resolve(__dirname, '.fake');
nodeFs.removeSync(fakeFiles);

function printFile(file /*: File */, depth /*: number */) {
  const fakeFile = nodePath.resolve(fakeFiles, `${file.guid}.js`);
  const key = `f$${getFileId(file.path)}`;
  let content = '';
  if (nodeFs.existsSync(fakeFile)) {
    content = nodeFs.readFileSync(fakeFile, 'utf8');
  } else {
    mkdirp.sync(nodePath.dirname(fakeFile));
  }
  content += `\nexport const ${key} = require('${nodePath.relative(
    nodePath.dirname(fakeFile),
    file.path,
  )}')`;
  nodeFs.writeFileSync(fakeFile, content);

  const chunkName = `bolt~${file.guid.replace(/\//g, '~')}`;

  return pad(
    `file('${file.id}',
    function(){ return import(/* webpackChunkName:"${chunkName}" */'${nodePath.relative(
      websiteSrcDr,
      fakeFile,
    )}').then(m => m['${key}']); }, ${getSafeRaw(file)}
  )`,
    depth,
  );
}

function printDir(dir /*: Directory */, depth /*: number */ = 0) {
  return [
    pad(`dir('${dir.id}', [`, depth),
    dir.children
      .map(child =>
        child.type === 'dir'
          ? printDir(child, depth + 1)
          : printFile(child, depth + 1),
      )
      .join(',\n'),
    pad(`])`, depth),
  ].join('\n');
}

module.exports = { printDir, printFile, pad };
