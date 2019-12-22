import * as React from 'react';
import { ReactWrapper } from 'enzyme';
import { uuid } from '@atlaskit/adf-schema';
import {
  mountWithIntl,
  createEditorFactory,
  doc,
  taskList,
  taskItem,
} from '@atlaskit/editor-test-helpers';

import { insertDate } from '../../../../plugins/date/actions';
import DateNodeView from '../../../../plugins/date/nodeviews/date';

describe('date plugin', () => {
  const createEditor = createEditorFactory();

  beforeEach(() => {
    uuid.setStatic('local-decision');
  });

  afterEach(() => {
    uuid.setStatic(false);
  });

  const editor = (doc: any) => {
    return createEditor({
      doc,
      editorProps: {
        allowDate: true,
        allowTasksAndDecisions: true,
      },
    });
  };

  describe('DateNodeView', () => {
    it('should set color to red for past dates in action item', () => {
      const { editorView: view } = editor(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight' })('Hello World {<>}'),
          ),
        ),
      );
      const date = new Date();
      insertDate({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate() - 2,
      })(view.state, view.dispatch);
      const dateNode = mountWithIntl(
        <DateNodeView
          view={view}
          node={view.state.doc.nodeAt(view.state.selection.$from.pos)!}
        />,
      );
      expect(
        dateNode.findWhere(n => n.prop('color') === 'red').length,
      ).toBeGreaterThan(1);
    });

    it('should not set color to red for past dates in completed action item', () => {
      const { editorView: view } = editor(
        doc(
          taskList({ localId: 'local-highlight' })(
            taskItem({ localId: 'local-highlight', state: 'DONE' })(
              'Hello World {<>}',
            ),
          ),
        ),
      );
      const date = new Date();
      insertDate({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate() - 2,
      })(view.state, view.dispatch);
      const dateNode = mountWithIntl(
        <DateNodeView
          view={view}
          node={view.state.doc.nodeAt(view.state.selection.$from.pos)!}
        />,
      );
      expect(
        dateNode.find((n: ReactWrapper) => n.prop('color') === 'red').length,
      ).toEqual(0);
    });
  });
});
