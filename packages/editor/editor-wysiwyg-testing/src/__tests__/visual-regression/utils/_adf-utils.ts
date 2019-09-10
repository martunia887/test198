import * as path from 'path';
import * as fs from 'fs';

function loadFragmentADF(nodeName: string, isContainer = false) {
  if (nodeName.indexOf(' ')) nodeName = nodeName.replace(' ', '-');
  const fixturePath = path.join(
    __dirname,
    '..',
    '__fixtures__',
    'adf-node-fragments',
    isContainer ? 'containers' : '',
    `${nodeName}-adf-node.json`,
  );

  if (fs.existsSync(fixturePath)) {
    const fixture = fs.readFileSync(fixturePath);
    const fragment: any = JSON.parse(fixture as any);
    return fragment;
  } else {
    // eslint-disable-next-line no-console
    console.error(`Unable to load ADF Fragment: '${fixturePath}'`);
  }
  return {};
}

/**
 * Create an ADF document from a loaded JSON fragment.
 *
 * @param nodeName The name of the node fragment you wish to insert
 * @param containerNodeName Optional container node fragment to nest within.
 */
export function createDocumentADF(nodeName: string, isContainer = false) {
  const doc: any = {
    version: 1,
    type: 'doc',
    content: [],
  };

  const fragment = loadFragmentADF(nodeName, isContainer);

  if (isContainer) {
    // Insert fragment once to serve as a placeholder, for later content injection.
    doc.content = [fragment];
  } else {
    // Insert fragment three times because content nodes may style the first and last instance differently from other instances.
    doc.content = [fragment, fragment, fragment];
  }

  return doc;
}
