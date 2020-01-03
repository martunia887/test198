import * as React from 'react';
import { IntlProvider } from 'react-intl';
import { WithAnalyticsEventsProps } from '@atlaskit/analytics-next';
import { PortalRenderer, PortalProvider } from '../../ui/PortalProvider';
import { EditorInternal } from './internal/components/EditorInternal';
import {
  usePresetContext,
  PresetProvider,
} from './internal/context/preset-context';
import {
  EditorSharedConfig,
  EditorSharedConfigConsumer,
  useEditorSharedConfig,
} from './internal/context/shared-config';
import { EditorContent } from './internal/components/EditorContent';
import { EditorProps } from './internal/editor-props-type';

/**
 * Main Editor component. Use in combination with `EditorContent` and a `Preset`.
 * Internally it constructs `ProseMirror View` and mounts it to `EditorContent`.
 *
 * `EditorContent` can be wrapped to implement any layout/design requirements.
 *
 * ```js
 * <Preset>
 *   <Editor>
 *     <EditorContent/>
 *   </Editor>
 * </Preset>
 * ```
 */
function Editor(props: EditorProps & WithAnalyticsEventsProps) {
  const plugins = usePresetContext();

  return (
    <IntlProvider locale="en">
      <PortalProvider
        createAnalyticsEvent={props.createAnalyticsEvent}
        render={portalProviderAPI => (
          <>
            <EditorInternal
              {...props}
              plugins={plugins.length ? plugins : props.plugins}
              portalProviderAPI={portalProviderAPI}
              onAnalyticsEvent={props.onAnalyticsEvent}
            />
            <PortalRenderer portalProviderAPI={portalProviderAPI} />
          </>
        )}
      />
    </IntlProvider>
  );
}

/**
 *
 * Public API Exports.
 *
 */
export {
  // Components
  PresetProvider,
  Editor,
  EditorContent,
  EditorSharedConfigConsumer,
  useEditorSharedConfig,
  // Types
  EditorProps,
  EditorSharedConfig,
};
