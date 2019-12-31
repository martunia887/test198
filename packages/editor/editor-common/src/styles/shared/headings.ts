import { css } from 'styled-components';
import { h700, h600, h500, h400, h300, h100 } from '@atlaskit/theme/typography';

// @see typography spreadsheet: https://docs.google.com/spreadsheets/d/1iYusRGCT4PoPfvxbJ8NrgjtfFgXLm5lpDWXzjua1W2E/edit#gid=93913128
// text sizing prototype: http://proto/fabricrender/
export const headingsSharedStyles = css`
  & h1 {
    ${h700};
    margin-bottom: 0;
    margin-top: 1.667em;
  }

  & h2 {
    ${h600};
    margin-top: 1.8em;
    margin-bottom: 0;
  }

  & h3 {
    ${h500};
    margin-top: 2em;
    margin-bottom: 0;
  }

  & h4 {
    ${h400};
    margin-top: 1.357em;
  }

  & h5 {
    ${h300};
    margin-top: 1.667em;
    text-transform: none;
  }

  & h6 {
    ${h100};
    margin-top: 1.455em;
    text-transform: none;
  }
`;
