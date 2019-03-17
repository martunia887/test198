// import * as mjml2html from 'mjml'
// tslint:disable-next-line:no-var-requires
// const mjml2html = require('mjml').default;
// import mjml2html from 'mjml';
import mjml2html = require('mjml');

import { Fragment, Node as PMNode } from 'prosemirror-model';

// SPIKENOTE:
// MJML is very particular in the way it likes to have it's components nested within each other
// for this reason, it has proven to be very hard to convert ADF structure to mjml.
// It's quite simple to converyt ADF to MJML JSON, but for it to work properly, some
// reshuffling and nesting / wrapping logic needs to be applied.
// Tried this and it seems to be a game of cat+mouse and probably more trouble than what it is worth

// SPIKENOTE: To continue exploration with MJML, we could try to
// create custom mjml components for the differnt ADF nodes.

// import { registerComponent } from 'mjml-core'
// import MjBasicComponent from './mjml-components/MjBasicComponent'
// registerComponent(MjBasicComponent)

// map adf nodes to mjml components
const adfToMjmlTags = new Map([
  ['body', 'mj-body'],
  ['section', 'mj-section'],
  ['text', 'mj-text'],
  // ['heading',   'div'],
  // ['paragraph', 'div'],
  // ['text',      'div'],
  // TODO: add all the things
]);

// fallback node if it is not in the list above
const defaultMjmlNode = 'mj-text';

const adfToMjmlNode = (node: PMNode, children: PMNode[] = []): any => {
  // SPIKENOTE: We could apply some fixes here with conditions?
  // if (adfToMjmlTags.has(<any>node.type)) {

  // }

  const mjmlJson: any = {
    tagName: adfToMjmlTags.get(<any>node.type) || defaultMjmlNode,
    content: node.text,
    attributes: node.attrs,
  };
  if (children.length) {
    mjmlJson.children = children;
  }
  return mjmlJson;
};

export const createMjmlChildren = (node: Fragment): any => {
  let output: any = [];

  node.forEach(childNode => {
    if (!childNode.content) {
      output.push(adfToMjmlNode(childNode));
    } else {
      const convertedChildren = createMjmlChildren(childNode.content);
      output.push(adfToMjmlNode(childNode, convertedChildren));
    }
  });
  return output;
};

export const createMjmlDocument = (adfDocument: Fragment) => ({
  tagName: 'mjml',
  attributes: {},
  children: [
    {
      tagName: 'mj-body',
      attributes: {},
      children: createMjmlChildren(adfDocument),
    },
  ],
});

export const renderMjmlDocument = (mjmlDocument: any): any => {
  return mjml2html(mjmlDocument, {
    beautify: true,
  });
};
