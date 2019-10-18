import { css } from 'styled-components';
import { fontSize } from '@atlaskit/theme';
import { relativeSize, akEditorTableCellMinWidth } from '../consts';

export const expandStyles = css`
  .ProseMirror {
    .expandView-content-wrap,
    .nestedExpandView-content-wrap {
      font-size: ${fontSize()}px;
      min-width: ${akEditorTableCellMinWidth}px;
      margin: ${relativeSize(1.142)}px 0;
    }
  }
`;
