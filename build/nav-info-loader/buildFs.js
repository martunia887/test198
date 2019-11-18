/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// @flow

/*::
import type { Directory, File } from './types';
*/

const path = require('path');

function dir(id /*: string */, path /*: string */ = '') {
  return { type: 'dir', id, path, children: [] };
}

function file(id /*: string */, path /*: string */) {
  return { type: 'file', id, path };
}

function findInDir(dir /*: Directory */, id /*: string */) {
  return dir.children.find(c => c.id === id);
}

function isDirHasFiles(dir /*: Directory */) /*: boolean */ {
  return dir.children.some(child => child.type === 'file');
}

function appendToDir(dir /*: Directory */, child /*: Directory | File */) {
  if (findInDir(dir, child.id)) return dir;
  dir.children = [].concat(dir.children, child);
  return dir;
}

function buildFs(
  curDir /*: Directory */,
  [seg, ...restSegments] /*: Array<string> */,
) {
  if (!seg) return curDir;

  let item = findInDir(curDir, seg);
  if (item && item.type === 'file') return curDir;
  if (!restSegments || !restSegments.length)
    return appendToDir(curDir, file(seg, path.join(curDir.path, seg)));

  item = buildFs(item || dir(seg, path.join(curDir.path, seg)), restSegments);
  return appendToDir(curDir, item);
}

module.exports = { dir, file, findInDir, isDirHasFiles, appendToDir, buildFs };
