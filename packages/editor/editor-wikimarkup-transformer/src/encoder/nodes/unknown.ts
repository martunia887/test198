import { JSONTransformer } from '@atlaskit/editor-json-transformer';
import { NodeEncoder } from '..';
import { Node as PMNode } from 'prosemirror-model';

const jsonTransformer = new JSONTransformer();

export const unknown: NodeEncoder = (node: PMNode): string => {
  const content = JSON.stringify(jsonTransformer.encodeNode(node));
  return node.isBlock
    ? `{adf:display=block}
${content}
{adf}`
    : `{adf:display=inline}${content}{adf}`;
};
