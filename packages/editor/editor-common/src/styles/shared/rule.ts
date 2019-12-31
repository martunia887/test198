import { css } from 'styled-components';
import { N30A, B300 } from '@atlaskit/theme/colors';

// @see typography spreadsheet: https://docs.google.com/spreadsheets/d/1iYusRGCT4PoPfvxbJ8NrgjtfFgXLm5lpDWXzjua1W2E/edit#gid=93913128
export const ruleSharedStyles = css`
  & hr {
    border: none;
    background-color: ${N30A};
    margin: 1.714em 0;
    height: 2px;
    border-radius: 1px;

    &.ProseMirror-selectednode {
      outline: none;
      background-color: ${B300};
    }
  }
`;
