import React, {
  Component,
  FunctionComponent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { defaultSchema } from '@atlaskit/adf-schema';
import { Editor } from '@marduke182/prosemirror-react-view';
import { Node as PMNode } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';
//Plugins

import basePlugin from './plugins/base';
import textFormatting from './plugins/text-formatting';
import blockType from './plugins/block-type';
import mentions from './plugins/mentions';

// End Plugins

import { EditorPlugin, PMPlugin } from './types/editor-plugin';
import { sortByOrder } from './create-editor/create-editor';
import { ContentArea, ScrollContainer } from './ui/Appearance/FullPage';
import { processRawValue } from './utils';
import { akEditorGutterPadding, BaseTheme } from '@atlaskit/editor-common';

interface AKEditorProps {
  initialDoc?: string;
}

const emptyDoc = defaultSchema.nodes.doc.createAndFill(
  null,
  defaultSchema.nodes.paragraph.createAndFill(null, [
    defaultSchema.text('Hello World!'),
    defaultSchema.nodes.mention.createChecked({
      id: '0',
      text: '@Carolyn',
    }),
  ])!,
)!;
function basicCreatePMPluginFactory(plugin: () => EditorPlugin): PMPlugin[] {
  const editorPlugin = plugin();
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

export const AKEditor: FunctionComponent<AKEditorProps> = ({ initialDoc }) => {
  const plugins = useBasicPlugins();
  const [containerRef, containerWidth] = useContainerWidth();
  return (
    <BaseTheme dynamicTextSizing={false}>
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
            <Editor
              schema={defaultSchema}
              initialDoc={processRawValue(defaultSchema, initialDoc)}
              plugins={plugins}
            />
          </div>
        </ContentArea>
      </ScrollContainer>
    </BaseTheme>
  );
};
