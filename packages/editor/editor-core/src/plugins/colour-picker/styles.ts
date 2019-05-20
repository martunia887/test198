// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';
import { colors } from '@atlaskit/theme';

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
      border: solid 1px ${colors.N40A};
      border-radius: 3px;
      cursor: pointer;
      pointer-events: auto;

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
