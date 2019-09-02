import rafSchedule from 'raf-schd';
import { Node, DOMSerializer, DOMOutputSpec } from 'prosemirror-model';
import {
  browser,
  akEditorSelectedBorderSize,
  blockNodesVerticalMargin,
  akEditorTableCellMinWidth,
} from '@atlaskit/editor-common';
import { gridSize, borderRadius, colors } from '@atlaskit/theme';
import { akEditorCodeFontFamily } from '../../../styles';
import { css, cssVar } from '@brickss/compiler';

const MATCH_NEWLINES = new RegExp('\n', 'g');

const minWidth = cssVar('min-width', `${akEditorTableCellMinWidth}px`);
const fontFamily = cssVar('fontFamily', akEditorCodeFontFamily);
const codeBorderRadius = cssVar('border-radius', `${borderRadius()}px`);
const codeBg = cssVar('code-bg', colors.N20);
const gutterTextColor = cssVar('gutterTextColor', colors.N300);
const textColor = cssVar('gutterTextColor', colors.N800);
const dangerGutterBg = cssVar('dangerGutterBg', colors.R75);
const dangerGutterTextColor = cssVar('dangerGutterTextColor', colors.R400);
const dangerBg = cssVar('dangerBg', colors.R50);

export const codeBlockStyle = css({
  background: codeBg,
  fontFamily: fontFamily,
  border: '1px solid transparent',
  borderRadius: codeBorderRadius,
  fontSize: '14px',
  lineHeight: '24px',
  margin: '1.143em 0 0 0',
  counterReset: 'line',
  display: 'flex',
  minWidth: minWidth,

  '.lineNumberGutter': {
    backgroundColor: 'rgba(9, 30, 66, 0.04)',
    color: gutterTextColor,
    textAlign: 'right',
    userSelect: 'none',
    padding: '12px 8px',
    borderRadius: codeBorderRadius,
    fontSize: '12px',
    lineHeight: '24px',

    span: {
      display: 'block',

      '::before': {
        counterIncrement: 'line',
        content: 'counter(line)',
        display: 'inline-block',
      },
    },
  },

  '.codeContent': {
    color: textColor,
    borderRadius: codeBorderRadius,
    padding: '12px 16px',
    overflow: 'auto',
    display: 'flex',
    flex: '1',

    pre: {
      width: '100%',
    },

    code: {
      display: 'inline-block',
      minWidth: '100%',
      tabSize: '4',
    },
  },

  '[state|danger]': {
    border: '1px solid #FF5630',

    '.lineNumberGutter': {
      backgroundColor: dangerGutterBg,
      color: dangerGutterTextColor,
    },

    '.codeContent': {
      backgroundColor: dangerBg,
    },
  },
});

// For browsers <= IE11, we apply style overrides to render a basic code box
// const isIE11 = browser.ie && browser.ie_version <= 11;
const toDOM = (node: Node) => {
  let className = codeBlockStyle({});
  return [
    'div',
    { class: className },
    [
      'div',
      { class: codeBlockStyle.lineNumberGutter, contenteditable: 'false' },
    ],
    [
      'div',
      { class: codeBlockStyle.codeContent },
      [
        'pre',
        [
          'code',
          { 'data-language': node.attrs.language || '', spellcheck: 'false' },
          0,
        ],
      ],
    ],
  ] as DOMOutputSpec;
};

export class CodeBlockView {
  node: Node;
  dom: HTMLElement;
  contentDOM: HTMLElement;
  lineNumberGutter: HTMLElement;

  constructor(node: Node) {
    const { dom, contentDOM } = DOMSerializer.renderSpec(document, toDOM(node));
    this.node = node;
    this.dom = dom as HTMLElement;
    this.contentDOM = contentDOM as HTMLElement;
    this.lineNumberGutter = this.dom.querySelector(
      '.' + codeBlockStyle.lineNumberGutter,
    ) as HTMLElement;

    this.ensureLineNumbers();
  }

  private ensureLineNumbers = rafSchedule(() => {
    let lines = 1;
    this.node.forEach(node => {
      const text = node.text;
      if (text) {
        lines += (node.text!.match(MATCH_NEWLINES) || []).length;
      }
    });

    while (this.lineNumberGutter.childElementCount < lines) {
      this.lineNumberGutter.appendChild(document.createElement('span'));
    }
    while (this.lineNumberGutter.childElementCount > lines) {
      this.lineNumberGutter.removeChild(this.lineNumberGutter.lastChild!);
    }
  });

  update(node: Node) {
    if (node.type !== this.node.type) {
      return false;
    }
    if (node !== this.node) {
      if (node.attrs.language !== this.node.attrs.language) {
        this.contentDOM.setAttribute(
          'data-language',
          node.attrs.language || '',
        );
      }
      this.node = node;
      this.ensureLineNumbers();
    }
    return true;
  }

  ignoreMutation(record: MutationRecord) {
    // Ensure updating the line-number gutter doesn't trigger reparsing the codeblock
    return (
      record.target === this.lineNumberGutter ||
      record.target.parentNode === this.lineNumberGutter
    );
  }
}

export default (node: Node) => new CodeBlockView(node);
