// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass } from 'styled-components';
import { RefsCssClassName as ClassName } from '../consts';
import { borderRadius, colors } from '@atlaskit/theme';

const { B200, N50 } = colors;

export const refsStyles = css`
  .${ClassName.TITLE_MENU} {
    background-color: rgb(250, 251, 252);
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
    overflow-wrap: break-word;
    vertical-align: top;
    border-color: ${N50};
    border-radius: ${borderRadius}px;
    border-width: 2px;
    border-style: solid;
    flex: 1 0 auto;
    font-size: 14px;
    overflow: hidden;
    transition: background-color 0.2s ease-in-out 0s,
      border-color 0.2s ease-in-out 0s;
    padding: 8px 6px;
    outline: none;

    &:focus {
      border-color: ${B200};
    }
  }
`;
