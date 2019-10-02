import { Node as PMNode, Schema } from 'prosemirror-model';
import { Context } from '../tokenize';

export default function getMediaGroupNodeView(
  schema: Schema,
  filename: string,
  context?: Context,
): PMNode {
  const { media, mediaGroup } = schema.nodes;

  const id =
    context &&
    context.filenameConversion &&
    context.filenameConversion[filename]
      ? context.filenameConversion[filename]
      : filename;

  const mediaNode = media.createChecked({
    id,
    type: 'file',
    collection: '',
  });

  return mediaGroup.createChecked({}, mediaNode);
}
