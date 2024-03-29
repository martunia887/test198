// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass, InterpolationFunction, ThemeProps } from 'styled-components';
import { gridSize, borderRadius } from '@atlaskit/theme';
import {
  relativeSize,
  akEditorTableCellMinWidth,
  akEditorDeleteBackground,
  akEditorDeleteBorder,
  akEditorDeleteBorderSize,
  akEditorDeleteIconColor,
} from '../consts';

export const PanelSharedCssClassName = {
  PANEL_CONTAINER: 'ak-editor-panel',
};

export const panelSharedStyles = css`
  & .${PanelSharedCssClassName.PANEL_CONTAINER} {
    border-radius: ${borderRadius()}px;
    margin: ${relativeSize(1.142)}px 0;
    padding: ${gridSize()}px;
    min-width: ${akEditorTableCellMinWidth}px;
    display: flex;
    align-items: baseline;
    word-break: break-word;

    .ak-editor-panel__icon {
      display: block;
      flex-shrink: 0;
      height: ${gridSize() * 3}px;
      width: ${gridSize() * 3}px;
      box-sizing: content-box;
      padding-right: ${gridSize()}px;

      > span {
        vertical-align: middle;
        display: inline;
      }
    }

    .ak-editor-panel__content {
      margin: 1px 0 1px;
      flex: 1 0 0;
    }
  }

  /* Danger when top level node */
  & .danger > .${PanelSharedCssClassName.PANEL_CONTAINER} {
    box-shadow: inset 0px 0px 0px ${akEditorDeleteBorderSize}px
      ${akEditorDeleteBorder};
    background: ${akEditorDeleteBackground} !important;
  }

  /* Danger when nested node */
  & .danger .${PanelSharedCssClassName.PANEL_CONTAINER} {
    background: rgb(255, 189, 173, 0.5) !important; /* R75 with 50% opactiy */

    .ak-editor-panel__icon {
      color: ${akEditorDeleteIconColor} !important;
    }
  }
`;
