import { Node as PMNode, Schema } from 'prosemirror-model';
import { LINK_TEXT_REGEXP } from '../tokenize/link-text';
import { Context } from '../../interfaces';
import { PREFIX_UNKNOWN_MEDIA } from '../../char';

const defaultWidth = 200;
const defaultHeight = 183;

export default function getMediaSingleNodeView(
  schema: Schema,
  filename: string,
  attrs: { [key: string]: string },
  context: Context,
): PMNode {
  const { media, mediaSingle } = schema.nodes;
  let width = defaultWidth;
  let height = defaultHeight;

  if (attrs.width) {
    const parsed = parseInt(attrs.width, 10);
    if (!isNaN(parsed)) {
      width = parsed;
    }
  }

  if (attrs.height) {
    const parsed = parseInt(attrs.height, 10);
    if (!isNaN(parsed)) {
      height = parsed;
    }
  }

  if (filename.match(LINK_TEXT_REGEXP)) {
    const externalMediaNode = media.createChecked({
      type: 'external',
      url: filename,
      width,
      height,
    });

    return mediaSingle.createChecked({}, externalMediaNode);
  } else {
    const id =
      context.mediaConversion && context.mediaConversion[filename]
        ? context.mediaConversion[filename]
        : PREFIX_UNKNOWN_MEDIA + filename;
    // try to look up collection from media context
    const collection = context.media && context.media.targetCollectionId;
    const mediaNode = media.createChecked({
      id,
      type: 'file',
      collection: collection || '',
      width,
      height,
    });

    return mediaSingle.createChecked({}, mediaNode);
  }
}
