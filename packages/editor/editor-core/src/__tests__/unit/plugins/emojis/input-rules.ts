import { ProviderFactory } from '@atlaskit/editor-common';
import { emoji as emojiData } from '@atlaskit/util-data-test';
import {
  insertText,
  createEditorFactory,
  doc,
  p,
  code,
  hardBreak,
  emoji,
  mention,
  code_block,
} from '@atlaskit/editor-test-helpers';
import { CreateUIAnalyticsEventSignature } from '@atlaskit/analytics-next';
import { emojiPluginKey } from '../../../../plugins/emoji/pm-plugins/main';
import emojiPlugin from '../../../../plugins/emoji';
import codeBlockPlugin from '../../../../plugins/code-block';
import mentionsPlugin from '../../../../plugins/mentions';

const emojiProvider = emojiData.testData.getEmojiResourcePromise();

describe('emojis - input rules', () => {
  const createEditor = createEditorFactory();

  const providerFactory = ProviderFactory.create({ emojiProvider });
  let createAnalyticsEvent: CreateUIAnalyticsEventSignature;

  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    return createEditor({
      doc,
      editorProps: { allowAnalyticsGASV3: true },
      editorPlugins: [emojiPlugin, codeBlockPlugin(), mentionsPlugin()],
      providerFactory,
      pluginKey: emojiPluginKey,
      createAnalyticsEvent,
    });
  };

  const assert = (what: string, expected: boolean, docContents?: any) => {
    const { editorView, pluginState, sel, refs } = editor(
      doc(docContents || p('{<>}')),
    );
    (pluginState as any).emojiProvider = true;
    insertText(editorView, what, sel || refs['<']);
    const { emojiQuery } = editorView.state.schema.marks;
    const cursorFocus = editorView.state.selection.$to.nodeBefore!;
    expect(!!emojiQuery.isInSet(cursorFocus.marks)).toEqual(expected);
  };

  it('should replace a standalone ":" with emoji-query-mark', () => {
    assert('foo :', true);
  });

  it('should not replace a ":" when part of a word', () => {
    assert('foo:', false);
  });

  it('should not replace a ":" after the "`"', () => {
    assert('`:', false);
  });

  it('should replace ":" at the start of the content', () => {
    assert(':', true);
  });

  it('should replace ":" if there are multiple spaces in front of it', () => {
    assert('  :', true);
  });

  it('should replace ":" if there is a hardbreak node in front of it', () => {
    assert(':', true, p(hardBreak(), '{<>}'));
  });

  it('should replace ":" if there is another emoji node in front of it', () => {
    assert(':', true, p(emoji({ shortName: ':smiley:' })(), '{<>}'));
  });

  it('should replace ":" if there is a mention node in front of it', () => {
    assert(':', true, p(mention({ id: '1234', text: '@SpongeBob' })(), '{<>}'));
  });

  it('should not replace ":" when in an unsupported node', () => {
    assert(':', false, code_block()('{<>}'));
  });

  it('should not replace ": when there is an unsupported stored mark', () => {
    assert(':', false, p(code('{<>}some code')));
  });

  it('should replace non empty selection with emojiQuery mark', () => {
    assert(':', true, p('{<}text{>}'));
  });

  it('should not replace non empty selection with emojiQuery mark if selection starts with an excluding mark', () => {
    assert(':', false, p(code('{<}text{>}')));
  });

  it('should not replace a ":" preceded by a special character', () => {
    assert('>:', false);
  });

  it('should replace a ":" when preceded by an opening round bracket', () => {
    assert('(:', true);
  });

  it('should trigger emoji typeahead invoked analytics event when replace ":"', async () => {
    const { editorView, sel, pluginState } = editor(doc(p('{<>}')));
    (pluginState as any).emojiProvider = true;
    insertText(editorView, ':', sel);

    expect(createAnalyticsEvent).toHaveBeenCalledWith({
      action: 'invoked',
      actionSubject: 'typeAhead',
      actionSubjectId: 'emojiTypeAhead',
      attributes: { inputMethod: 'keyboard' },
      eventType: 'ui',
    });
  });
});
