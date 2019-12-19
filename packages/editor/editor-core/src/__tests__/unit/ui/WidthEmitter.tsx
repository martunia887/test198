import { name } from '../../../version.json';
import { mount } from 'enzyme';
import * as React from 'react';
import { Plugin } from 'prosemirror-state';
import { createEditorFactory, doc, p } from '@atlaskit/editor-test-helpers';
import { WidthProvider, WidthObserver } from '@atlaskit/editor-common';

import {
  pluginKey as widthPluginKey,
  WidthPluginState,
} from '../../../plugins/width';
import WidthEmitter from '../../../ui/WidthEmitter';

describe(name, () => {
  const createEditor = createEditorFactory();

  describe('WidthBroadcaster', () => {
    const fakeWidth = 500;

    beforeEach(() => {
      /**
       * JSDOM doesn't support offsetWidth. Also we can't set it directly, it will throw with
       * TypeError: Cannot set property offsetWidth of [object Object] which has only a getter
       */
      Object.defineProperties(window.HTMLElement.prototype, {
        offsetWidth: {
          get: function() {
            return (
              parseFloat(window.getComputedStyle(this).width || '') || fakeWidth
            );
          },
        },
      });

      jest.useFakeTimers();
    });

    it('should trigger a meta transaction with width', () => {
      let width;
      const { editorView } = createEditor({
        doc: doc(p()),
        editorPlugins: [
          {
            pmPlugins: () => [
              {
                rank: 1,
                plugin: () =>
                  new Plugin({
                    state: {
                      init: () => null,
                      apply(tr) {
                        const widthState = tr.getMeta(widthPluginKey) as
                          | WidthPluginState
                          | undefined;
                        width = widthState ? widthState.width : undefined;
                      },
                    },
                  }),
              },
            ],
          },
        ],
      });

      const wrapper = mount(
        <WidthProvider>
          <WidthEmitter editorView={editorView} />
        </WidthProvider>,
      );

      const event = new Event('resize');
      window.dispatchEvent(event);
      // This is to trigger `requestAnimationFrame`. It's from `raf-stub` package that we are using inside `SizeDetector`
      (window.requestAnimationFrame as any).step();
      // This is to trigger `requestAnimationFrame`. It's from `raf-stub` package that we are using inside `WidthProvider`
      (window.requestAnimationFrame as any).step();

      jest.runOnlyPendingTimers();

      expect(width).toBe(fakeWidth);
      wrapper.unmount();
      editorView.destroy();
    });
  });
});
