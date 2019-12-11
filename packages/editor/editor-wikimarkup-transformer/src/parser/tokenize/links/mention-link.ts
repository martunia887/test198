import { ContentLink } from './link-parser';
import { Schema, Node as PMNode } from 'prosemirror-model';
import { Context } from '../../../interfaces';
import { PREFIX_MENTION } from '../../../char';

// Removes PREFIX_MENTION prefix if exists
const removePrefix = (text: string) =>
  text.replace(new RegExp(`^${PREFIX_MENTION}`), '');

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
        : removePrefix(mentionText);

    return [
      schema.nodes.mention.createChecked({
        id,
      }),
    ];
  }
  return;
}
