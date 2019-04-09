import {
  TableHeaderDefinition,
  HeaderCellAttributes,
} from '@atlaskit/adf-schema';

export const tableHeader = (attrs?: HeaderCellAttributes) => (
  ...content: TableHeaderDefinition['content']
): TableHeaderDefinition => ({
  type: 'tableHeader',
  attrs,
  content: content,
});
