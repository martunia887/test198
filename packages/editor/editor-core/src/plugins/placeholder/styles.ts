// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';
import { N90 } from '@atlaskit/theme/colors';

export const placeholderStyles = css`
  .ProseMirror .placeholder-decoration {
    position: relative;
    color: ${N90};
    pointer-events: none;
    display: block;

    > span {
      position: absolute;
      pointer-events: none;
    }
  }
`;
