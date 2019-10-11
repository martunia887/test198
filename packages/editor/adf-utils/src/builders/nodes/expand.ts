import { ExpandDefinition, ExpandContent } from '@atlaskit/adf-schema';

export const expand = (attrs: ExpandDefinition['attrs']) => (
  ...content: ExpandContent
): ExpandDefinition => ({
  type: 'expand',
  attrs,
  content,
});
