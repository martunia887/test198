// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';
import { fontSize } from '@atlaskit/theme/constants';
import { akEditorTableCellMinWidth } from '@atlaskit/editor-common';

export const tasksAndDecisionsStyles = css`
  .ProseMirror .taskItemView-content-wrap,
  .ProseMirror .decisionItemView-content-wrap {
    font-size: ${fontSize()}px;
    min-width: ${akEditorTableCellMinWidth}px;
  }
`;
