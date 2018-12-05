import { css } from 'styled-components';
import { fontSize } from '@atlaskit/theme';
import { akEditorTableCellMinWidth } from '@atlaskit/editor-common';

export const tasksAndDecisionsStyles = css`
  .ProseMirror .taskItemView-content-wrap,
  .ProseMirror .decisionItemView-content-wrap {
    font-size: ${fontSize()}px;
    min-width: ${akEditorTableCellMinWidth}px;
  }
`;
