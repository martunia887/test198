// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';

export const placeholderStyles = css`
  .ProseMirror .placeholder-decoration {
    position: absolute;
    pointer-events: none;
    user-select: none;

    &::before {
      content: attr(data-text);
      color: hotpink;
      pointer-events: none;
    }
  }
`;
