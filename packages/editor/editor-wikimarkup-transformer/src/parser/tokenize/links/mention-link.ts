import { Schema, Node as PMNode } from 'prosemirror-model';
import { Context } from '../../../interfaces';
import { ContentLink } from './link-parser';

export function mentionLinkResolver(
  link: ContentLink,
  schema: Schema,
  context: Context,
): PMNode[] | undefined {
  if (link.notLinkBody.startsWith('~')) {
    const mentionText = link.notLinkBody.substring(1);
    const id =
      context.conversion &&
      context.conversion.mentionConversion &&
      context.conversion.mentionConversion[mentionText]
        ? context.conversion.mentionConversion[mentionText]
        : mentionText;

    return [
      schema.nodes.mention.createChecked({
        id,
      }),
    ];
  }
  return;
}
