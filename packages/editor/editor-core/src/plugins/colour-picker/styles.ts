// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';

export const colourPickerStyles = css`
  .ProseMirror {
    .ProseMirror-colour-picker {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      padding: 0px;
      margin: -3px 2px 0;
      width: 15px;
      height: 15px;
      border: solid 1px grey;
      border-radius: 3px;
      cursor: pointer;
      transition: box-shadow 0.2s;
      pointer-events: auto;

      &:hover {
        box-shadow: 0 0 4px grey;
      }

      input[type='color'] {
        opacity: 0;
        position: absolute;
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
    }
  }
`;
