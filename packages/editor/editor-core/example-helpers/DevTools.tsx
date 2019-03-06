import * as React from 'react';
import applyDevTools from 'prosemirror-dev-tools';
import { WithEditorActions } from '..';

export function DevTools() {
  return (
    <WithEditorActions
      render={actions => {
        const editorView = actions._privateGetEditorView();
        if (editorView) {
          applyDevTools(editorView);
        }
        return null;
      }}
    />
  );
}
