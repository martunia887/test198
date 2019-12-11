import { Node as PMNode } from 'prosemirror-model';
import { NodeEncoder, NodeEncoderOpts } from '..';
import { PREFIX_UNKNOWN_MEDIA } from '../../char';

export const media: NodeEncoder = (
  node: PMNode,
  { context }: NodeEncoderOpts = {},
): string => {
  let wikiAttrs: string[] = [];
  if (node.attrs.width) {
    wikiAttrs.push(`width=${node.attrs.width}`);
  }
  if (node.attrs.height) {
    wikiAttrs.push(`height=${node.attrs.height}`);
  }

  let fileName: string;

  if (node.attrs.type === 'external') {
    fileName = node.attrs.url;
  } else {
    fileName =
      context &&
      context.mediaConversion &&
      context.mediaConversion[node.attrs.id]
        ? context.mediaConversion[node.attrs.id]
        : PREFIX_UNKNOWN_MEDIA + node.attrs.id;
  }
  if (wikiAttrs.length) {
    return `!${fileName}|${wikiAttrs.join(',')}!`;
  }
  // default to thumbnail if no width or height is set
  return `!${fileName}|thumbnail!`;
};
