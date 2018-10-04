import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';
import {
  editorFontSize,
  paragraphSharedStyles,
  blockNodesVerticalMargin,
  blockNodesVerticalMarginNumber,
} from '@atlaskit/editor-common';
import { telepointerStyle } from '../../plugins/collab-edit/styles';
import { gapCursorStyles } from '../../plugins/gap-cursor/styles';
import { tableStyles } from '../../plugins/table/ui/styles';
import { placeholderStyles } from '../../plugins/placeholder/styles';
import { blocktypeStyles } from '../../plugins/block-type/styles';
import { codeBlockStyles } from '../../plugins/code-block/styles';
import { listsStyles } from '../../plugins/lists/styles';
import { ruleStyles } from '../../plugins/rule/styles';
import { mediaStyles } from '../../plugins/media/styles';
import { layoutStyles } from '../../plugins/layout/styles';
import { panelStyles } from '../../plugins/panel/styles';
import { fakeCursorStyles } from '../../plugins/fake-text-cursor/styles';
import { mentionsStyles } from '../../plugins/mentions/styles';
import { textFormattingStyles } from '../../plugins/text-formatting/styles';
import { placeholderTextStyles } from '../../plugins/placeholder-text/styles';
import { tasksAndDecisionsStyles } from '../../plugins/tasks-and-decisions/ui/styles';
import { gridStyles } from '../../plugins/grid/styles';

console.log(blockNodesVerticalMarginNumber);

const ContentStyles: ComponentClass<HTMLAttributes<{}>> = styled.div`
  /* Hack for ie11 that is being used in code block.
   * https://bitbucket.org/atlassian/atlaskit/src/ad09f6361109ece1aab316c8cbd8116ffb7963ef/packages/editor-core/src/schema/nodes/code-block.ts?fileviewer=file-view-default#code-block.ts-110
   */
  & .ie11 {
    overflow: visible;
    word-wrap: break-word;
  }

  .ProseMirror {
    word-wrap: break-word;
    white-space: pre-wrap;
    outline: none;
    font-size: ${editorFontSize}px;

    ${paragraphSharedStyles};

    .editor--mark__indent {
      ${paragraphSharedStyles};
      margin-top: ${blockNodesVerticalMargin};

      &[data-level="1"] {
        padding-left: ${blockNodesVerticalMarginNumber}em;
      }
      &[data-level="2"] {
        padding-left: ${blockNodesVerticalMarginNumber * 2}em;
      }
      &[data-level="3"] {
        padding-left: ${blockNodesVerticalMarginNumber * 3}em;
      }
      &[data-level="4"] {
        padding-left: ${blockNodesVerticalMarginNumber * 4}em;
      }
      &[data-level="5"] {
        padding-left: ${blockNodesVerticalMarginNumber * 5}em;
      }
      &[data-level="6"] {
        padding-left: ${blockNodesVerticalMarginNumber * 6}em;
      }

      &:first-child {
        margin-top: 0;
      }
    }
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }

  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-selectednode {
    outline: none;
  }

  .ProseMirror-selectednode:empty {
    outline: 2px solid #8cf;
  }

  .ProseMirror img {
    max-width: 100%;
  }

  /**
   * Fixes the weird cursor navigation bug
   * for inline-nodes
   * https://github.com/ProseMirror/prosemirror/issues/514
  */
  .mentionView-content-wrap,
  .inlineExtensionView-content-wrap,
  .emojiView-content-wrap,
  .dateView-content-wrap {
    display: inline-block;
  }

  ${blocktypeStyles}
  ${textFormattingStyles}
  ${placeholderTextStyles}
  ${placeholderStyles}
  ${codeBlockStyles}
  ${listsStyles}
  ${ruleStyles}
  ${mediaStyles}
  ${layoutStyles}
  ${telepointerStyle}
  ${gapCursorStyles};
  ${tableStyles};
  ${panelStyles}
  ${fakeCursorStyles}
  ${mentionsStyles}
  ${tasksAndDecisionsStyles}
  ${gridStyles}
`;

export default ContentStyles;
