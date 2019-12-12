import React, {
  FunctionComponent,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { defaultSchema } from '@atlaskit/adf-schema';
import {
  Editor,
  EditorContent,
  useEditorView,
} from '@marduke182/prosemirror-react-view';
import { Plugin } from 'prosemirror-state';
//Plugins

import basePlugin from './plugins/base';
import textFormatting from './plugins/text-formatting';
import blockType, { pluginKey } from './plugins/block-type';
import mentions from './plugins/mentions';
import status from './plugins/status';
import emoji from './plugins/emoji';
import tasksAndDecisions from './plugins/tasks-and-decisions';
import table from './plugins/table';
import list from './plugins/lists';

// End Plugins

import { pluginKey as textFormattingPluginKey } from './plugins/text-formatting/pm-plugins/main';
import { pluginKey as clearFormattingPluginKey } from './plugins/text-formatting/pm-plugins/clear-formatting';
import { EditorPlugin, PMPlugin } from './types/editor-plugin';
import { sortByOrder } from './create-editor/create-editor';
import {
  ContentArea,
  FullPageEditorWrapper,
  MainToolbar,
  ScrollContainer,
} from './ui/Appearance/FullPage';
import { processRawValue } from './utils';
import { akEditorGutterPadding, BaseTheme } from '@atlaskit/editor-common';
import Toolbar from './ui/Toolbar';
import { useProviderFactory } from '@atlaskit/editor-common/provider-factory';
import ToolbarBlockType from './plugins/block-type/ui/ToolbarBlockType';
import { setBlockTypeWithAnalytics } from './plugins/block-type/commands';
import { INPUT_METHOD } from './plugins/analytics/types';
import ToolbarTextFormatting from './plugins/text-formatting/ui/ToolbarTextFormatting';
import ToolbarAdvancedTextFormatting from './plugins/text-formatting/ui/ToolbarAdvancedTextFormatting';
import { ButtonGroup } from './ui/styles';

interface AKEditorProps {
  initialDoc?: string;
}

function basicCreatePMPluginFactory<T extends {}>(
  plugin: (options?: T) => EditorPlugin,
  options?: T,
): PMPlugin[] {
  const editorPlugin = plugin(options);
  if (!editorPlugin.pmPlugins) {
    return [];
  }

  return editorPlugin.pmPlugins();
}

function createBasicPlugins(): Plugin[] {
  const pmPlugins: PMPlugin[] = [];

  // start adding plugins
  pmPlugins.push(...basicCreatePMPluginFactory(basePlugin));
  pmPlugins.push(...basicCreatePMPluginFactory(textFormatting));
  pmPlugins.push(...basicCreatePMPluginFactory(blockType));
  pmPlugins.push(...basicCreatePMPluginFactory(mentions));
  pmPlugins.push(
    ...basicCreatePMPluginFactory(status, { menuDisabled: false }),
  );
  pmPlugins.push(...basicCreatePMPluginFactory(emoji));
  pmPlugins.push(...basicCreatePMPluginFactory(tasksAndDecisions));
  pmPlugins.push(...basicCreatePMPluginFactory(table));
  pmPlugins.push(...basicCreatePMPluginFactory(list));

  return pmPlugins
    .sort(sortByOrder('plugins'))
    .map(({ name, plugin: pluginFactory }) => {
      const plugin = pluginFactory({
        schema: defaultSchema,
        dispatch() {},
      } as any);
      if (plugin) {
        // @ts-ignore
        plugin.name = name;
      }
      return plugin;
    })
    .filter(plugin => !!plugin) as Plugin[];
}

function useContainerWidth(): [
  MutableRefObject<HTMLElement | undefined>,
  number | undefined,
] {
  const ref = useRef<HTMLElement>();
  const [contentWidth, setContentWidth] = useState<number | undefined>();

  useEffect(() => {
    if (ref.current) {
      setContentWidth(ref.current.clientWidth);
    }
  }, [ref]);

  return [ref, contentWidth];
}

function useBasicPlugins() {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  useEffect(() => {
    setPlugins(createBasicPlugins());
  }, [setPlugins]);

  return plugins;
}

const noop = () => {};

const CustomTextFormattingToolbar: FunctionComponent = () => {
  const editorView = useEditorView();
  const textFormattingState = textFormattingPluginKey.getState(
    editorView.state,
  );
  const clearFormattingState = clearFormattingPluginKey.getState(
    editorView.state,
  );
  return (
    <ButtonGroup width={'large'}>
      <ToolbarTextFormatting
        disabled={false}
        editorView={editorView as any}
        textFormattingState={textFormattingState}
        isReducedSpacing={false}
      />
      <ToolbarAdvancedTextFormatting
        editorView={editorView as any}
        isDisabled={false}
        isReducedSpacing={false}
        textFormattingState={textFormattingState}
        clearFormattingState={clearFormattingState}
      />
    </ButtonGroup>
  );
};

const BlockTypeToolbar: FunctionComponent = () => {
  const editorView = useEditorView();

  const boundSetBlockType = (name: string) =>
    setBlockTypeWithAnalytics(name, INPUT_METHOD.TOOLBAR)(
      editorView.state,
      editorView.dispatch,
    );
  return (
    <ToolbarBlockType
      isSmall={false}
      isDisabled={false}
      isReducedSpacing={false}
      setBlockType={boundSetBlockType}
      pluginState={pluginKey.getState(editorView.state)}
    />
  );
};

const CustomMainToolbar: FunctionComponent = () => {
  const editorView = useEditorView();
  const providerFactory = useProviderFactory();
  return (
    <MainToolbar showKeyline={true}>
      <Toolbar
        editorView={editorView as any}
        providerFactory={providerFactory}
        appearance={'full-page'}
        items={[
          () => <BlockTypeToolbar />,
          () => <CustomTextFormattingToolbar />,
        ]}
        disabled={false}
        dispatchAnalyticsEvent={noop}
      />
    </MainToolbar>
  );
};

export const AKEditor: FunctionComponent<AKEditorProps> = ({ initialDoc }) => {
  const plugins = useBasicPlugins();
  const [containerRef, containerWidth] = useContainerWidth();
  // const providerFactory = useProviderFactory();

  return (
    <Editor
      schema={defaultSchema}
      initialDoc={processRawValue(defaultSchema, initialDoc)}
      plugins={plugins}
    >
      <FullPageEditorWrapper>
        <CustomMainToolbar />
        <BaseTheme dynamicTextSizing={true}>
          <ScrollContainer
            allowAnnotation={false}
            innerRef={containerRef}
            className="fabric-editor-popup-scroll-parent"
          >
            <ContentArea fullWidthMode={false} containerWidth={containerWidth}>
              <div
                style={{ padding: `0 ${akEditorGutterPadding}px` }}
                className={['ak-editor-content-area'].join(' ')}
              >
                <EditorContent />
              </div>
            </ContentArea>
          </ScrollContainer>
        </BaseTheme>
      </FullPageEditorWrapper>
    </Editor>
  );
};
