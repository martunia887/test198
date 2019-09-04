import MarkdownIt from 'markdown-it';
// @ts-ignore
import { handlePaste as handlePasteTable } from 'prosemirror-tables';
import { Schema, Slice, Node, Fragment } from 'prosemirror-model';
import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer';
import * as clipboard from '../../../utils/clipboard';
import { transformSliceForMedia } from '../../media/utils/media-single';
import linkify from '../linkify-md-plugin';
import { escapeLinks } from '../util';
import { linkifyContent } from '../../hyperlink/utils';
import { transformSliceToRemoveOpenBodiedExtension } from '../../extension/actions';
import { transformSliceToRemoveOpenLayoutNodes } from '../../layout/utils';
import { getPluginState as getTablePluginState } from '../../table/pm-plugins/main';
import {
  transformSliceToRemoveOpenTable,
  transformSliceToCorrectEmptyTableCells,
  transformSliceToFixHardBreakProblemOnCopyFromCell,
} from '../../table/utils';
import { transformSliceToAddTableHeaders } from '../../table/commands';
import { handleMacroAutoConvert, handleMention } from '../handlers';
import {
  transformSliceToJoinAdjacentCodeBlocks,
  transformSingleLineCodeBlockToCodeMark,
} from '../../code-block/utils';
import {
  sendPasteAnalyticsEvent,
  handlePasteAsPlainTextWithAnalytics,
  handlePasteIntoTaskAndDecisionWithAnalytics,
  handleCodeBlockWithAnalytics,
  handleMediaSingleWithAnalytics,
  handlePastePreservingMarksWithAnalytics,
  handleMarkdownWithAnalytics,
  handleRichTextWithAnalytics,
} from './analytics';
import { PasteTypes } from '../../analytics';
import { insideTable } from '../../../utils';
import { CardOptions } from '../../card';
import {
  transformSliceToCorrectMediaWrapper,
  unwrapNestedMediaElements,
} from '../../media/utils/media-common';
import { transformSliceToRemoveColumnsWidths } from '../../table/commands/misc';
import { PasteHandler } from '..';
export const stateKey = new PluginKey('pastePlugin');

export const md = MarkdownIt('zero', { html: false });

md.enable([
  // Process html entity - &#123;, &#xAF;, &quot;, ...
  'entity',
  // Process escaped chars and hardbreaks
  'escape',

  'newline',
]);

// enable modified version of linkify plugin
// @see https://product-fabric.atlassian.net/browse/ED-3097
md.use(linkify);

function isHeaderRowRequired(state: EditorState) {
  const tableState = getTablePluginState(state);
  return tableState && tableState.pluginConfig.isHeaderRowRequired;
}

function isAllowResizingEnabled(state: EditorState) {
  const tableState = getTablePluginState(state);
  return tableState && tableState.pluginConfig.allowColumnResizing;
}

export function createPlugin(
  schema: Schema,
  cardOptions?: CardOptions,
  sanitizePrivateContent?: boolean,
  pasteHandlers?: Array<PasteHandler>,
) {
  const atlassianMarkDownParser = new MarkdownTransformer(schema, md);

  function getMarkdownSlice(
    text: string,
    openStart: number,
    openEnd: number,
  ): Slice | undefined {
    const doc = atlassianMarkDownParser.parse(escapeLinks(text));
    if (doc && doc.content) {
      return new Slice(doc.content, openStart, openEnd);
    }
    return;
  }

  return new Plugin({
    key: stateKey,
    props: {
      handlePaste(view, rawEvent, slice) {
        const event = rawEvent as ClipboardEvent;
        if (!event.clipboardData) {
          return false;
        }

        const text = event.clipboardData.getData('text/plain');
        const html = event.clipboardData.getData('text/html');

        const isPastedFile = clipboard.isPastedFile(event);
        const isPlainText = text && !html;
        const isRichText = !!html;

        // Bail if copied content has files
        if (isPastedFile) {
          if (!html) {
            return true;
          }
          /**
           * Microsoft Office, Number, Pages, etc. adds an image to clipboard
           * with other mime-types so we don't let the event reach media
           */
          event.stopPropagation();
        }

        const { state, dispatch } = view;

        if (
          handlePasteAsPlainTextWithAnalytics(view, event, slice)(
            state,
            dispatch,
            view,
          )
        ) {
          return true;
        }

        // transform slices based on destination
        slice = transformSliceForMedia(slice, schema)(state.selection);

        let markdownSlice: Slice | undefined;
        if (isPlainText) {
          markdownSlice = getMarkdownSlice(
            text,
            slice.openStart,
            slice.openEnd,
          );

          // run macro autoconvert prior to other conversions
          if (
            markdownSlice &&
            handleMacroAutoConvert(text, markdownSlice, cardOptions)(
              state,
              dispatch,
              view,
            )
          ) {
            // TODO: handleMacroAutoConvert dispatch twice, so we can't use the helper
            sendPasteAnalyticsEvent(view, event, markdownSlice, {
              type: PasteTypes.markdown,
            });
            return true;
          }
        }

        if (
          handlePasteIntoTaskAndDecisionWithAnalytics(
            view,
            event,
            slice,
            isPlainText ? PasteTypes.plain : PasteTypes.richText,
          )(state, dispatch)
        ) {
          return true;
        }

        // If we're in a code block, append the text contents of clipboard inside it
        if (
          handleCodeBlockWithAnalytics(view, event, slice, text)(
            state,
            dispatch,
          )
        ) {
          return true;
        }

        if (
          handleMediaSingleWithAnalytics(
            view,
            event,
            slice,
            isPastedFile ? PasteTypes.binary : PasteTypes.richText,
          )(state, dispatch, view)
        ) {
          return true;
        }

        // If the clipboard only contains plain text, attempt to parse it as Markdown
        if (isPlainText && markdownSlice) {
          if (
            handlePastePreservingMarksWithAnalytics(
              view,
              event,
              markdownSlice,
              PasteTypes.markdown,
            )(state, dispatch)
          ) {
            return true;
          }

          return handleMarkdownWithAnalytics(view, event, markdownSlice)(
            state,
            dispatch,
          );
        }

        // finally, handle rich-text copy-paste
        if (isRichText) {
          // linkify the text where possible
          slice = linkifyContent(state.schema)(slice);
          // run macro autoconvert prior to other conversions
          if (
            handleMacroAutoConvert(text, slice, cardOptions)(
              state,
              dispatch,
              view,
            )
          ) {
            // TODO: handleMacroAutoConvert dispatch twice, so we can't use the helper
            sendPasteAnalyticsEvent(view, event, slice, {
              type: PasteTypes.richText,
            });
            return true;
          }

          // if we're pasting to outside a table or outside a table
          // header, ensure that we apply any table headers to the first
          // row of content we see, if required
          if (!insideTable(state) && isHeaderRowRequired(state)) {
            slice = transformSliceToAddTableHeaders(slice, state.schema);
          }

          if (!isAllowResizingEnabled(state)) {
            slice = transformSliceToRemoveColumnsWidths(slice, state.schema);
          }

          // get prosemirror-tables to handle pasting tables if it can
          // otherwise, just the replace the selection with the content
          if (handlePasteTable(view, null, slice)) {
            sendPasteAnalyticsEvent(view, event, slice, {
              type: PasteTypes.richText,
            });
            return true;
          }

          // ED-4732
          if (
            handlePastePreservingMarksWithAnalytics(
              view,
              event,
              slice,
              PasteTypes.richText,
            )(state, dispatch)
          ) {
            return true;
          }

          return handleRichTextWithAnalytics(view, event, slice)(
            state,
            dispatch,
          );
        }

        return false;
      },
      transformPasted(slice) {
        if (sanitizePrivateContent) {
          slice = handleMention(slice, schema);
        }

        slice = transformSliceToFixHardBreakProblemOnCopyFromCell(
          slice,
          schema,
        );
        /** If a partial paste of table, paste only table's content */
        slice = transformSliceToRemoveOpenTable(slice, schema);

        // We do this separately so it also applies to drag/drop events
        slice = transformSliceToRemoveOpenLayoutNodes(slice, schema);

        /** If a partial paste of bodied extension, paste only text */
        slice = transformSliceToRemoveOpenBodiedExtension(slice, schema);

        /* Bitbucket copies diffs as multiple adjacent code blocks
         * so we merge ALL adjacent code blocks to support paste here */
        slice = transformSliceToJoinAdjacentCodeBlocks(slice);

        slice = transformSingleLineCodeBlockToCodeMark(slice, schema);

        slice = transformSliceToCorrectMediaWrapper(slice, schema);

        slice = transformSliceToCorrectEmptyTableCells(slice, schema);

        if (
          slice.content.childCount &&
          slice.content.lastChild!.type === schema.nodes.codeBlock
        ) {
          slice = new Slice(
            slice.content.append(
              Fragment.from(schema.nodes.paragraph.createAndFill() as Node),
            ),
            slice.openStart,
            1,
          );
        }
        return slice;
      },
      transformPastedHTML(html) {
        // Fix for issue ED-4438
        // text from google docs should not be pasted as inline code
        if (html.indexOf('id="docs-internal-guid-') >= 0) {
          html = html.replace(/white-space:pre/g, '');
          html = html.replace(/white-space:pre-wrap/g, '');
        }

        if (html.indexOf('<img ') >= 0) {
          html = unwrapNestedMediaElements(html);
        }

        return html;
      },
      /**
       * ProseMirror default behaviour for getting text content from
       * a leaf node is to use a predefined string.
       * @see http://prosemirror.net/docs/ref/#model.Node.textBetween
       *
       * Instead we call the appropriate handler on matched leaf nodes,
       * allowing users to provided fallback text based on node attributes.
       *
       * @param slice
       */
      clipboardTextSerializer(slice) {
        let text = '';
        let found = false;
        let separated = true;
        const from = 0;
        const to = slice.content.size;
        const blockSeparator = '\n\n';

        function findHandler(nodeName: string) {
          return (
            pasteHandlers &&
            pasteHandlers.find(
              handler => handler.nodes.indexOf(nodeName) !== -1,
            )
          );
        }

        slice.content.nodesBetween(from, to, (node, pos) => {
          const handler = findHandler(node.type.name);
          if (handler && node.isLeaf) {
            const nodeText = handler.clipboardTextSerializer(node) || '';
            text += nodeText;
            found = !!nodeText;
            separated = !blockSeparator;
          } else if (node.isText && node.text) {
            text += node.text.slice(Math.max(from, pos) - pos, to - pos);
            separated = !blockSeparator;
          } else if (!separated && node.isBlock) {
            text += blockSeparator;
            separated = true;
          }
        });

        // If not found, return empty string and default to PM for handling.
        return (found && text) || '';
      },
    },
  });
}
