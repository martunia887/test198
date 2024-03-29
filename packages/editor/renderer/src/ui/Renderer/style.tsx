import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  colors,
  gridSize,
  fontFamily,
  fontSize,
  borderRadius,
  themed,
} from '@atlaskit/theme';
import {
  tableSharedStyle,
  columnLayoutSharedStyle,
  editorFontSize,
  blockquoteSharedStyles,
  headingsSharedStyles,
  panelSharedStyles,
  ruleSharedStyles,
  whitespaceSharedStyles,
  paragraphSharedStyles,
  indentationSharedStyles,
  blockMarksSharedStyles,
  mediaSingleSharedStyle,
  blockNodesVerticalMargin,
  akEditorTableToolbar,
  akEditorTableBorder,
  akEditorTableNumberColumnWidth,
  TableSharedCssClassName,
  tableMarginTop,
  gridMediumMaxWidth,
  codeMarkSharedStyles,
  shadowSharedStyle,
  shadowClassNames,
} from '@atlaskit/editor-common';
import { RendererCssClassName } from '../../consts';
import { RendererAppearance } from './types';

export const FullPagePadding = 32;

export type RendererWrapperProps = {
  appearance?: RendererAppearance;
  theme?: any;
};

const tableStyles = ({ appearance }: RendererWrapperProps) => {
  if (appearance === 'mobile') {
    return 'table-layout: auto';
  }

  return '';
};

const fullPageStyles = ({ theme, appearance }: RendererWrapperProps) => {
  if (appearance !== 'full-page' && appearance !== 'mobile') {
    return '';
  }

  return `
    max-width: ${
      theme && theme.layoutMaxWidth ? `${theme.layoutMaxWidth}px` : 'none'
    };
    margin: 0 auto;
    padding: 0 ${appearance === 'full-page' ? FullPagePadding : 0}px;
  `;
};

const fullWidthStyles = ({ appearance }: RendererWrapperProps) => {
  if (appearance !== 'full-width') {
    return '';
  }

  return `
  max-width: 1800px;

  .fabric-editor-breakout-mark,
  .pm-table-container,
  .ak-renderer-extension {
    width: 100% !important;
  }
  `;
};

// prettier-ignore
export const Wrapper = styled.div<RendererWrapperProps & HTMLAttributes<{}>>`
  font-size: ${editorFontSize}px;
  line-height: 24px;
  color: ${themed({ light: colors.N800, dark: '#B8C7E0' })};

  ${fullPageStyles}
  ${fullWidthStyles}

  & span.akActionMark {
    color: ${colors.B400};
    text-decoration: none;

    &:hover {
      color: ${colors.B300};
      text-decoration: underline;
    }
  }

  & span.akActionMark {
    cursor: pointer;
  }

  ${whitespaceSharedStyles};
  ${blockquoteSharedStyles};
  ${headingsSharedStyles};
  ${panelSharedStyles};
  ${ruleSharedStyles};
  ${paragraphSharedStyles};
  ${indentationSharedStyles};
  ${blockMarksSharedStyles};
  ${codeMarkSharedStyles};
  ${shadowSharedStyle};

  & .UnknownBlock {
    font-family: ${fontFamily()};
    font-size: ${fontSize()};
    font-weight: 400;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  & span.date-node {
    background: ${colors.N30A};
    border-radius: ${borderRadius()}px;
    color: ${colors.N800};
    padding: 2px 4px;
    margin: 0 1px;
    transition: background 0.3s;
    white-space: nowrap;
  }

  & span.date-node-highlighted {
    background: ${colors.R50};
    color: ${colors.R500};
  }

  & ul {
    list-style-type: disc;

    & ul {
      list-style-type: circle;
    }

    & ul ul {
      list-style-type: square;
    }

    & ul ul ul {
      list-style-type: disc;
    }

    & ul ul ul ul {
      list-style-type: circle;
    }

    & ul ul ul ul ul {
      list-style-type: square;
    }
  }

  & ol {
    list-style-type: decimal;

    & ol {
      list-style-type: lower-alpha;
    }

    & ol ol {
      list-style-type: lower-roman;
    }

    & ol ol ol {
      list-style-type: decimal;
    }

    & ol ol ol ol {
      list-style-type: lower-alpha;
    }

    & ol ol ol ol ol {
      list-style-type: lower-roman;
    }

    & ol ol ol ol ol ol {
      list-style-type: decimal;
    }

    & ol ol ol ol ol ol ol {
      list-style-type: lower-alpha;
    }

    & ol ol ol ol ol ol ol ol {
      list-style-type: lower-roman;
    }
  }

  & .akTaskList > ol,
  & .akDecisionList > ol {
    list-style-type: none;
    font-size: ${fontSize()}px;
  }

  & .renderer-image {
    max-width: 100%;
    display: block;
    margin: ${gridSize() * 3}px 0;
  }

  .media-single.media-wrapped + .media-single:not(.media-wrapped) {
    clear: both;
  }

  & .code-block,
  & blockquote,
  & hr,
  & > div > div:not(.media-wrapped),
  .media-single.media-wrapped + .media-wrapped + *:not(.media-wrapped),
  .media-single.media-wrapped + div:not(.media-wrapped) {
    clear: both;
  }

  & .media-wrapped {
    & + h1,
    & + h2,
    & + h3,
    & + h4,
    & + h5,
    & + h6 {
      margin-top: 8px;
    }
  }

  ${mediaSingleSharedStyle} &
  div[class^='image-wrap-'] + div[class^='image-wrap-'] {
    margin-left: 0;
    margin-right: 0;
  }

  /* Breakout for tables and extensions */
  .${RendererCssClassName.DOCUMENT} > {
    .${TableSharedCssClassName.TABLE_CONTAINER}[data-layout='full-width'],
    .${TableSharedCssClassName.TABLE_CONTAINER}[data-layout='wide'],
    .${RendererCssClassName.EXTENSION}[data-layout='wide'],
    .${RendererCssClassName.EXTENSION}[data-layout='full-width']   {
      margin-left: 50%;
      transform: translateX(-50%);
    }
    * .${TableSharedCssClassName.TABLE_CONTAINER},
    * .${RendererCssClassName.EXTENSION} {
      width: 100% !important;
    }
  }

    .${TableSharedCssClassName.TABLE_NODE_WRAPPER} {
      overflow-x: auto;
    }

  ${tableSharedStyle}

  .${TableSharedCssClassName.TABLE_CONTAINER} {
    z-index: 0;
    transition: all 0.1s linear;

    /** Shadow overrides */
    &.${shadowClassNames.RIGHT_SHADOW}::after, &.${shadowClassNames.LEFT_SHADOW}::before {
      top: ${tableMarginTop - 1}px;
      height: calc(100% - ${tableMarginTop}px);
    }

    table {
      ${tableStyles};
      margin-left: 0;
      margin-right: 0;
    }

    table[data-number-column='true'] {
      .${RendererCssClassName.NUMBER_COLUMN} {
        background-color: ${akEditorTableToolbar};
        border-right: 1px solid ${akEditorTableBorder};
        width: ${akEditorTableNumberColumnWidth}px;
        text-align: center;
        color: ${colors.N200};
        font-size: ${fontSize()}px;
      }
    }
  }

  /*
   * We wrap CodeBlock in a grid to prevent it from overflowing the container of the renderer.
   * See ED-4159.
   */
  & .code-block {
    max-width: 100%;
    /* -ms- properties are necessary until MS supports the latest version of the grid spec */
    /* stylelint-disable value-no-vendor-prefix, declaration-block-no-duplicate-properties */
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: auto 1fr;
    /* stylelint-enable */

    grid-template-columns: minmax(0, 1fr);
    position: relative;

    /*
     * The overall renderer has word-wrap: break; which causes issues with
     * code block line numbers in Safari / iOS.
     */
    word-wrap: normal;

    & > span {
      /* stylelint-disable value-no-vendor-prefix */
      -ms-grid-row: 1;
      -ms-grid-column: 2;
      /* stylelint-enable */
      grid-column: 1;
    }
  }

  & .MediaGroup,
  & .code-block {
    margin-top: ${blockNodesVerticalMargin};

    &:first-child {
      margin-top: 0;
    }
  }

  ${columnLayoutSharedStyle};
  & [data-layout-section] {
    margin-top: ${gridSize() * 2.5}px;
    & > div + div {
      margin-left: ${gridSize() * 4}px;
    }

    @media screen and (max-width: ${gridMediumMaxWidth}px) {
      & > div + div {
        margin-left: 0;
      }
    }
  }
`;
