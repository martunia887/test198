import { ContentLink } from './link-parser';
import { Schema, Node as PMNode } from 'prosemirror-model';
import { Context } from '../../../interfaces';

export function mentionLinkResolver(
  link: ContentLink,
  schema: Schema,
  context: Context,
): PMNode[] | undefined {
  if (link.notLinkBody.startsWith('~')) {
    const mentionText = link.notLinkBody.substring(1);
    const id =
      context.mentionConversion && context.mentionConversion[mentionText]
        ? context.mentionConversion[mentionText]
        : mentionText;

    return [
      schema.nodes.mention.createChecked({
        id,
      }),
    ];
  }
  return;
}
