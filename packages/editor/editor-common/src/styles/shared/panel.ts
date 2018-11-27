// @ts-ignore: unused variable
// prettier-ignore
import { css, Styles, StyledComponentClass, InterpolationFunction, ThemeProps } from 'styled-components';
import { gridSize, borderRadius } from '@atlaskit/theme';
import { relativeSize, akEditorElementMinWidth } from '../consts';

export const PanelSharedCssClassName = {
  PANEL_CONTAINER: 'ak-editor-panel',
};

export const panelSharedStyles = css`
  & .${PanelSharedCssClassName.PANEL_CONTAINER} {
    border-radius: ${borderRadius()}px;
    margin: ${relativeSize(1.142)}px 0;

    .ak-editor-panel__content {
      margin: 1px 0 1px;
    }
  }
`;
