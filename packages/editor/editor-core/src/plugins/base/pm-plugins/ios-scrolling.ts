import { Plugin, Transaction, PluginKey } from 'prosemirror-state';
import { browser } from '@atlaskit/editor-common';

export const pluginKey = new PluginKey('iosScrolling');

/**
 * LEGEND:
 *
 * Consistent Viewport Height: `document.documentElement.clientHeight`
 * Variable Viewport Height: `window.innerHeight`
 */

export function setKeyboardControlsHeight(
  tr: Transaction,
  height = 0,
  dispatch: Function,
): void {
  dispatch(tr.setMeta(pluginKey, height));

  const { scrollHeight, clientHeight } = document.documentElement;

  console.log('setKeyboardControlsHeight:', height);
  console.log();

  if (scrollHeight > clientHeight && window.innerHeight < clientHeight) {
    // console.log('OVERFLOWS')
    // When closing the soft keyboard (or toolbar), if the content exceeds the viewport height, and
    // if the viewport has been shifted up off screen above the keyboard (scrolled near the bottom),
    // then we need to redraw to prevent surplus whitespace at the botom of the screen where the
    // keyboard was.
    document.body.scrollIntoView(false);
  }
}

function onViewportResize(e: Event) {}

// Per Apple's UX design guidelines. 44 pixels squared is the minimum size for a tap target.
const MIN_TAP_SIZE_PX = 44;

// Default values suitable when using an external hardware keyboard.
const DEFAULT_SCROLL_THRESHOLD = MIN_TAP_SIZE_PX * 3;
const DEFAULT_SCROLL_MARGIN = DEFAULT_SCROLL_THRESHOLD;

/**
 * iOS 11+ WebView Scrolling
 *
 * When the on screen keyboard (OSK) is visible, it sits above the page content.
 * The browser doesn't inform the web view when the OSK is raised or dismissed.
 * The default scrolling logic within ProseMirror (using `scrollIntoView`) is
 * calculated using the viewport height. It has no context about the soft keyboard.
 *
 * To improve the user experience, we adjust the scrolling values to effectively
 * keep the user's selection in the top half of the screen (above the OSK).
 * This avoids the user's selection going underneath the keyboard in the majority
 * of situations.
 *
 * In contrast, legacy iOS versions, and Android resize the viewport when the OSK
 * is toggled, which allows the default scrolling to function correctly.
 */
const plugin = new Plugin({
  key: pluginKey,
  props: {
    // Determines the distance (in pixels) between the cursor and the end of the visible viewport at which point,
    // when scrolling the cursor into view, scrolling takes place.
    // Defaults to 0: https://prosemirror.net/docs/ref/#view.EditorProps.scrollThreshold
    scrollThreshold: DEFAULT_SCROLL_THRESHOLD,
    // Determines the extra space (in pixels) that is left above or below the cursor when it is scrolled into view.
    // Defaults to 5: https://prosemirror.net/docs/ref/#view.EditorProps.scrollMargin
    // scrollMargin: 300,
    scrollMargin: DEFAULT_SCROLL_MARGIN,
  },
  state: {
    init(): number {
      window.addEventListener('resize', onViewportResize, false);
      return 0;
    },
    apply(tr: Transaction, value: number): number {
      const newKeyboardControlsHeight = parseInt(tr.getMeta(pluginKey));
      if (newKeyboardControlsHeight >= 0) {
        // By default the viewport fills the screen, with the soft keyboard sitting over the top of viewport layer.
        // If the content exceeds (overflows) the viewport height, then as the user scrolls towards the bottom it
        // incrementally shifts (offsets) the viewport upward so that it eventually ends at the top of the keyboard.
        // The `window.innerHeight` value is reduced when this occurs, indicating the visible area, instead of
        // the original viewport height (which becomes partially off screen due to the offset).
        // The body's clientHeight value remains accurate to the true viewport height, regardless of whether
        // the content overflows, or what the scroll position is.
        const viewportHeight = ((window as any).viewportHeight =
          document.documentElement.clientHeight);
        const controlsHeight = ((window as any).controlsHeight = newKeyboardControlsHeight); //parseInt(newKeyboardControlsHeight);
        const contentVisibleHeight = ((window as any).contentVisibleHeight =
          viewportHeight - controlsHeight);

        const scrollMargin = contentVisibleHeight - MIN_TAP_SIZE_PX * 2;
        const scrollThreshold = contentVisibleHeight;
        // ProseMirror uses the reference to this object when calculating its internal scroll offsets
        // By mutating the values stored in the props, we're able to dynamically update them.
        (this as any).props.scrollThreshold = scrollThreshold;
        (this as any).props.scrollMargin = scrollMargin;

        // TODO: Find and store the result once for later reuse...
        const editor = document.querySelector<HTMLElement>(
          '.ProseMirror',
        ) as HTMLElement;
        // Resize the editor to fill the viewport (relative to controls)
        // Allows focusing the editor when tapping whitespace if the content doesn't yet exceed the viewport.

        // FIXME: I don't think i want to do this anymore...? perhaps on the ClickAreaMobile instead?
        editor.style.minHeight = `calc(100vh - ${controlsHeight}px)`;
        // FIXME: Or do i want to also sync the ClickAreaMobile as well?

        const clickWrapper = document.querySelector<HTMLElement>(
          '.editor-click-wrapper',
        );
        if (clickWrapper) {
          clickWrapper.style.minHeight = `calc(100vh - ${controlsHeight}px)`;
        }

        return controlsHeight;
      }
      return value;
    },
  },
});

export default () => {
  // if (browser.ios) {
  console.log('### INIT IOS SCROLLING PLUGIN');
  (window as any).iosScrollPlugin = plugin;
  // FIXME: DOn't do this... figure out a way to export/import this inside the bridge for invokation...
  (window as any).setKeyboardControlsHeight = setKeyboardControlsHeight;
  return plugin;
  // } else console.log('#### SKIP IOS SCROLLING PLUGIN');
  // return undefined;
};
