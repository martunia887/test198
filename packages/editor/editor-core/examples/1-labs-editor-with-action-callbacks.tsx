import * as React from 'react';
import Editor from './../labs/EditorWithActions';
import { EditorContext } from '../';

export default function Example() {
  return (
    <EditorContext>
      <Editor
        appearance="comment"
        quickInsert={true}
        onSave={actions =>
          actions
            .getValue()
            .then(value => alert(JSON.stringify(value, null, 2)))
        }
        onCancel={actions => actions.clear()}
      />
    </EditorContext>
  );
}
