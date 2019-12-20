import {
  doc,
  p,
  createEditorFactory,
  table,
  tr,
  td,
  th,
} from '@atlaskit/editor-test-helpers';
import {
  TablePluginState,
  PluginConfig,
} from '../../../../plugins/table/types';

import { pluginKey as tablePluginKey } from '../../../../plugins/table/pm-plugins/main';
import { EditorView } from 'prosemirror-view';
import { CreateUIAnalyticsEvent } from '@atlaskit/analytics-next';

describe('fix tables', () => {
  const createEditor = createEditorFactory<TablePluginState>();
  let createAnalyticsEvent: CreateUIAnalyticsEvent;
  // @ts-ignore
  global['fetch'] = jest.fn();

  const editor = (doc: any) => {
    createAnalyticsEvent = jest.fn().mockReturnValue({ fire() {} });
    const tableOptions = {
      allowNumberColumn: true,
      allowHeaderRow: true,
      allowHeaderColumn: true,
      permittedLayouts: 'all',
      allowColumnResizing: true,
    } as PluginConfig;
    return createEditor({
      doc,
      editorProps: {
        allowAnalyticsGASV3: true,
        allowTables: tableOptions,
      },
      createAnalyticsEvent,
      pluginKey: tablePluginKey,
    });
  };

  describe('removeExtraneousColumnWidths', () => {
    let editorView: EditorView;
    beforeEach(() => {
      ({ editorView } = editor(
        doc(
          table()(
            tr(
              th({ colwidth: [100, 100] })(p('{<>}1')),
              th({ colwidth: [100, 100] })(p('2')),
              th({ colwidth: [480] })(p('3')),
            ),
            tr(
              td({ colwidth: [100, 100] })(p('4')),
              td({ colwidth: [100, 100] })(p('5')),
              td({ colwidth: [480] })(p('6')),
            ),
          ),
        ),
      ));
    });

    it('removes unneccesary column widths', () => {
      expect(editorView.state.doc).toEqualDocument(
        doc(
          table()(
            tr(
              th({ colwidth: [100] })(p('1')),
              th({ colwidth: [100] })(p('2')),
              th({ colwidth: [480] })(p('3')),
            ),
            tr(
              td({ colwidth: [100] })(p('4')),
              td({ colwidth: [100] })(p('5')),
              td({ colwidth: [480] })(p('6')),
            ),
          ),
        ),
      );
    });

    it('fires analytics event when removing extraneous column widths', () => {
      expect(createAnalyticsEvent).toBeCalledWith(
        expect.objectContaining({
          action: 'removedExtraneousColumnWidths',
          actionSubject: 'table',
          attributes: {
            totalColumnCount: 3,
            totalRowCount: 2,
          },
          eventType: 'operational',
        }),
      );
    });
  });
});
