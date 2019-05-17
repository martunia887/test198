import { fontFamily, fontSize } from '@atlaskit/theme';

import { Fragment, Node as PMNode, Schema } from 'prosemirror-model';

import { Serializer } from '../serializer';
import { nodeSerializers } from './serializers';
import styles from './styles';
import juice from 'juice';
import { escapeHtmlString } from './util';
import flow from 'lodash.flow';
import property from 'lodash.property';
import { defaultSchema as schema } from '@atlaskit/adf-schema';

const serializeNode = (
  node: PMNode,
  index: any,
  parent?: PMNode,
  serializedHTML?: string,
): string => {
  // ignore nodes with unknown type
  if (!nodeSerializers[node.type.name]) {
    return `[UNKNOWN_NODE_TYPE: ${node.type.name}]`;
  }

  const parentAttrs = getAttrsFromParent(index, parent);

  return nodeSerializers[node.type.name]({
    node,
    attrs: {
      ...node.attrs,
      ...parentAttrs,
    },
    marks: node.marks,
    parent: parent,
    text:
      serializedHTML || node.attrs.text || node.attrs.shortName || node.text,
  });
};

/**
 * Used to pass attributes that affect nested nodes.
 *
 * Example: A 'table' node contains 'isNumberColumnEnabled' flag. In order to render
 * numbered columns, 'tableRow' node needs to know this information, thus this function.
 *
 * @param parent {PMNode} parent node
 * @param index {number} index of current child in parent's content array
 */
const getAttrsFromParent = (
  index: number,
  parent?: PMNode,
): { [key: string]: any } => {
  if (parent && parent.attrs && parent.attrs.isNumberColumnEnabled) {
    return {
      index: index,
      isNumberColumnEnabled: true,
    };
  }
  return {};
};

const traverseTree = (fragment: Fragment, parent?: PMNode): string => {
  let output = '';
  fragment.forEach((childNode, _offset, idx) => {
    if (childNode.isLeaf) {
      output += serializeNode(childNode, idx, parent);
    } else {
      const innerHTML = traverseTree(childNode.content, childNode);
      output += serializeNode(childNode, idx, parent, innerHTML);
    }
  });

  return output;
};

export const commonStyle = {
  'font-family': fontFamily(),
  'font-size': `${fontSize()}px`,
  'font-weight': 400,
  'line-height': '24px',
};

const juicify = (html: string): string =>
  juice(`<style>${styles}</style><div class="wrapper">${html}</div>`);

export default class EmailSerializer implements Serializer<string> {
  serializeFragment: (fragment: Fragment) => string = flow(
    (fragment: Fragment) => fragment.toJSON(),
    JSON.stringify,
    escapeHtmlString,
    JSON.parse,
    content => ({ version: 1, type: 'doc', content }),
    schema.nodeFromJSON,
    property('content'),
    traverseTree,
    juicify,
  );

  static fromSchema(_schema: Schema): EmailSerializer {
    return new EmailSerializer();
  }
}
