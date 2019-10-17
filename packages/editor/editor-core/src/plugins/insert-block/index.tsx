import * as React from 'react';
import { EditorPlugin } from '../../types';
import { WithProviders } from '@atlaskit/editor-common';
import {
  pluginKey as blockTypeStateKey,
  BlockTypeState,
} from '../block-type/pm-plugins/main';
import {
  stateKey as mediaStateKey,
  MediaPluginState,
} from '../media/pm-plugins/main';
import {
  stateKey as hyperlinkPluginKey,
  HyperlinkState,
} from '../hyperlink/pm-plugins/main';
import { mentionPluginKey, MentionPluginState } from '../mentions';
import { stateKey as imageUploadStateKey } from '../image-upload/pm-plugins/main';
import {
  pluginKey as placeholderTextStateKey,
  PluginState as PlaceholderPluginState,
} from '../placeholder-text';
import { pluginKey as layoutStateKey } from '../layout';
import {
  pluginKey as macroStateKey,
  MacroState,
  insertMacroFromMacroBrowser,
} from '../macro';
import { pluginKey as expandStateKey } from '../expand/pm-plugins/main';
import { pluginKey as dateStateKey, DateState } from '../date/plugin';
import { emojiPluginKey, EmojiPluginState } from '../emoji';
import WithPluginState from '../../ui/WithPluginState';
import { ToolbarSize } from '../../ui/Toolbar';
import ToolbarInsertBlock from './ui/ToolbarInsertBlock';
import { insertBlockTypesWithAnalytics } from '../block-type/commands';
import { startImageUpload } from '../image-upload/pm-plugins/commands';
import { pluginKey as typeAheadPluginKey } from '../type-ahead/pm-plugins/main';
import { TypeAheadPluginState } from '../type-ahead';
import { TablePluginState } from '../table/types';
import { ImageUploadPluginState } from '../image-upload/types';
import { LayoutState } from '../layout/pm-plugins/main';
import { INPUT_METHOD } from '../analytics';
import { ExpandPluginState } from '../expand/types';

const toolbarSizeToButtons = (toolbarSize: ToolbarSize) => {
  switch (toolbarSize) {
    case ToolbarSize.XXL:
    case ToolbarSize.XL:
    case ToolbarSize.L:
    case ToolbarSize.M:
      return 7;

    case ToolbarSize.S:
      return 2;

    default:
      return 0;
  }
};

export interface InsertBlockOptions {
  allowTables?: boolean;
  insertMenuItems?: any;
  horizontalRuleEnabled?: boolean;
  nativeStatusSupported?: boolean;
}

/**
 * Wrapper over insertBlockTypeWithAnalytics to autobind toolbar input method
 * @param name Block name
 */
function handleInsertBlockType(name: string) {
  return insertBlockTypesWithAnalytics(name, INPUT_METHOD.TOOLBAR);
}

const insertBlockPlugin = (options: InsertBlockOptions): EditorPlugin => ({
  name: 'insertBlock',

  primaryToolbarComponent({
    editorView,
    editorActions,
    dispatchAnalyticsEvent,
    providerFactory,
    popupsMountPoint,
    popupsBoundariesElement,
    popupsScrollableElement,
    toolbarSize,
    disabled,
    isToolbarReducedSpacing,
  }) {
    const buttons = toolbarSizeToButtons(toolbarSize);
    const renderNode = (providers: Record<string, Promise<any>>) => {
      return (
        <WithPluginState
          plugins={{
            typeAheadState: typeAheadPluginKey,
            blockTypeState: blockTypeStateKey,
            mediaState: mediaStateKey,
            mentionState: mentionPluginKey,
            macroState: macroStateKey,
            hyperlinkState: hyperlinkPluginKey,
            emojiState: emojiPluginKey,
            dateState: dateStateKey,
            imageUpload: imageUploadStateKey,
            placeholderTextState: placeholderTextStateKey,
            layoutState: layoutStateKey,
            expandState: expandStateKey,
          }}
          render={({
            typeAheadState,
            mentionState,
            blockTypeState,
            mediaState,
            macroState = {} as MacroState,
            hyperlinkState,
            emojiState,
            dateState,
            imageUpload,
            placeholderTextState,
            layoutState,
            expandState,
          }: {
            typeAheadState: TypeAheadPluginState | undefined;
            mentionState: MentionPluginState | undefined;
            blockTypeState: BlockTypeState | undefined;
            mediaState: MediaPluginState | undefined;
            tablesState: TablePluginState | undefined;
            macroState: MacroState | undefined;
            hyperlinkState: HyperlinkState | undefined;
            emojiState: EmojiPluginState | undefined;
            dateState: DateState | undefined;
            imageUpload: ImageUploadPluginState | undefined;
            placeholderTextState: PlaceholderPluginState | undefined;
            layoutState: LayoutState | undefined;
            expandState: ExpandPluginState | undefined;
          }) => (
            <ToolbarInsertBlock
              buttons={buttons}
              isReducedSpacing={isToolbarReducedSpacing}
              isDisabled={disabled}
              isTypeAheadAllowed={typeAheadState && typeAheadState.isAllowed}
              editorView={editorView}
              tableSupported={options.allowTables}
              actionSupported={!!editorView.state.schema.nodes.taskItem}
              mentionsSupported={
                !!(mentionState && mentionState.mentionProvider)
              }
              mentionsEnabled={!!mentionState}
              decisionSupported={!!editorView.state.schema.nodes.decisionItem}
              dateEnabled={!!dateState}
              placeholderTextEnabled={
                placeholderTextState && placeholderTextState.allowInserting
              }
              layoutSectionEnabled={!!layoutState}
              mediaUploadsEnabled={mediaState && mediaState.allowsUploads}
              onShowMediaPicker={mediaState && mediaState.showMediaPicker}
              mediaSupported={!!mediaState}
              imageUploadSupported={!!imageUpload}
              imageUploadEnabled={imageUpload && imageUpload.enabled}
              handleImageUpload={startImageUpload}
              availableWrapperBlockTypes={
                blockTypeState && blockTypeState.availableWrapperBlockTypes
              }
              expandSupported={!!expandState} // TODO
              linkSupported={!!hyperlinkState}
              linkDisabled={
                !hyperlinkState ||
                !hyperlinkState.canInsertLink ||
                !!hyperlinkState.activeLinkMark
              }
              emojiDisabled={!emojiState || !emojiState.emojiProvider}
              emojiProvider={providers.emojiProvider}
              nativeStatusSupported={options.nativeStatusSupported}
              horizontalRuleEnabled={options.horizontalRuleEnabled}
              onInsertBlockType={handleInsertBlockType}
              onInsertMacroFromMacroBrowser={insertMacroFromMacroBrowser}
              macroProvider={macroState.macroProvider}
              popupsMountPoint={popupsMountPoint}
              popupsBoundariesElement={popupsBoundariesElement}
              popupsScrollableElement={popupsScrollableElement}
              insertMenuItems={options.insertMenuItems}
              editorActions={editorActions}
              dispatchAnalyticsEvent={dispatchAnalyticsEvent}
            />
          )}
        />
      );
    };

    return (
      <WithProviders
        providerFactory={providerFactory}
        providers={['emojiProvider']}
        renderNode={renderNode}
      />
    );
  },
});

export default insertBlockPlugin;
