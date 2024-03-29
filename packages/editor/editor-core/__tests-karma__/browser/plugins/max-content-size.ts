import { expect } from 'chai';
import { createEditorFactory } from '@atlaskit/editor-test-helpers';
import maxContentSize from '../../../src/plugins/max-content-size';

describe('editor/plugins/max-content-size', () => {
  const createEditor = createEditorFactory();

  const editor = () =>
    createEditor({
      editorPlugins: [maxContentSize],
      editorProps: { maxContentSize: 10 },
    });

  it('should not allow document to grow more than specified max content size', () => {
    const { editorView } = editor();
    editorView.dispatch(editorView.state.tr.insertText('12345678910'));
    expect(editorView.state.doc.nodeSize).to.be.lessThan(10);
  });

  it('should allow document to grow upto specified max content size', () => {
    const { editorView } = editor();
    editorView.dispatch(editorView.state.tr.insertText('123456'));
    expect(editorView.state.doc.nodeSize).to.equal(10);
  });
});
