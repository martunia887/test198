import * as React from 'react';
import { ProviderFactory } from '@atlaskit/editor-common';
import {
  doc,
  p,
  createEditorFactory,
  mountWithIntl,
} from '@atlaskit/editor-test-helpers';

import ToolbarTask from '../../../../../plugins/tasks-and-decisions/ui/ToolbarTask';
import ToolbarButton from '../../../../../ui/ToolbarButton';

describe('@atlaskit/editor-core/ui/ToolbarTask', () => {
  const createEditor = createEditorFactory();

  const providerFactory = new ProviderFactory();
  const editor = (doc: any) =>
    createEditor({
      doc,
      editorProps: { allowTasksAndDecisions: true },
    });

  afterAll(() => {
    providerFactory.destroy();
  });

  it('should be disabled if isDisabled property is true', () => {
    const { editorView } = editor(doc(p('text')));
    const toolbarOption = mountWithIntl(
      <ToolbarTask editorView={editorView} isDisabled={true} />,
    );
    expect(toolbarOption.find(ToolbarButton).prop('disabled')).toEqual(true);
    toolbarOption.unmount();
  });
});
