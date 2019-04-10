// @ts-ignore: unused variable
import { css, Styles, StyledComponentClass } from 'styled-components';
import { TableCssClassName as ClassName } from '../types';
import { borderRadius, colors } from '@atlaskit/theme';
const { N60A, N90 } = colors;

export const tableNewStyles = css`
  /* filter */
  tr[data-is-filtered='true'],
  .${ClassName.ROW_CONTROLS_BUTTON_WRAP}.filtered {
    display: none;
  }
  .${ClassName.FILTER_RANGE_WRAP}, .${ClassName.FILTER_RANGE_MINMAX_WRAP} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .${ClassName.FILTER_MENU_WRAP} {
    label {
      display: flex;
      align-items: center;
      padding: 2px 0;
    }
    label:hover {
      background: ${colors.N30};
    }
  }

  .${ClassName.LIVE_DATA_MENU_ITEM} {
    border-top: 1px solid ${colors.N40};
  }

  .${ClassName.SORT_SUBMENU_LABEL} {
    color: ${colors.B300};
    position: absolute;
    font-size: 12px;
    width: 50px;
    right: 5px;

    &::after {
      content: '›';
      display: inline-block;
      width: 1px;
      position: absolute;
      right: 12px;
      color: ${N90};
    }
  }

  /* Sub menu (reference, formatting) */
  .${ClassName.MENU_WRAP} {
    background: white;
    box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
    border-radius: ${borderRadius()}px;
    padding: 10px;
    width: 220px;
    position: absolute;

    &.${ClassName.FORMATTING_MENU_WRAP} {
      width: 320px;
    }

    .${ClassName.MENU_TITLE} {
      text-align: center;
    }
    .${ClassName.MENU_DESCRIPTION} {
      color: ${N90};
      font-size: 90%;
      line-height: 1.5;
    }
    .${ClassName.SECTION} {
      margin-bottom: 10px;
    }
    .${ClassName.BUTTONS_WRAP} {
      text-align: right;

      button + button {
        margin-left: 10px;
      }
    }
    .${ClassName.RULE_WRAP} {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .${ClassName.FORMATTING_BUTTONS_WRAP} {
      display: flex;
      > button {
        margin-right: 10px;
      }
      > button:last-child {
        margin-right: 0;
      }

      button > span > span {
        margin: 0px !important;
        padding: 0px !important;
      }
    }
    .${ClassName.FORMATTING_COLOR_PICKER_BUTTON} {
      display: block;
      border: 1px solid ${N90};
      border-radius: ${borderRadius()}px;
      width: 20px;
      height: 20px;
      padding: 0;
      margin: 0;
    }
    .${ClassName.FORMATTING_COLOR_PICKER} {
      position: absolute;
      width: 144px;
      padding: 6px 0;
      background: white;
      box-shadow: 0 4px 8px -2px ${N60A}, 0 0 1px ${N60A};
      border-radius: ${borderRadius()}px;
      z-index: 10;
    }
  }
`;
