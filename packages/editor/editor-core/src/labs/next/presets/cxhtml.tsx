// #region Imports
import * as React from 'react';
import {
  quickInsertPlugin,
  tablesPlugin,
  codeBlockPlugin,
  panelPlugin,
  listsPlugin,
  textColorPlugin,
  breakoutPlugin,
  jiraIssuePlugin,
  extensionPlugin,
  rulePlugin,
  datePlugin,
  layoutPlugin,
  indentationPlugin,
  cardPlugin,
  statusPlugin,
  mediaPlugin,
  mentionsPlugin,
  tasksAndDecisionsPlugin,
  insertBlockPlugin,
  basePlugin,
  placeholderPlugin,
} from '../../../plugins';
import { useConfigContext } from '../internal/context/config-context';
import { PresetProvider } from '../Editor';
import { EditorPresetProps } from './types';
import { useDefaultPreset } from './default';
import { getPluginsFromPreset } from './utils';
// #endregion

interface EditorPresetCXHTMLProps {
  children?: React.ReactNode;
  placeholder?: string;
}

export function useCXHTMLPreset({
  placeholder,
}: EditorPresetCXHTMLProps & EditorPresetProps) {
  const { providerFactory } = useConfigContext();
  const [preset] = useDefaultPreset();

  preset.push(
    [
      basePlugin,
      {
        allowInlineCursorTarget: true,
        allowScrollGutter: () =>
          document.querySelector('.fabric-editor-popup-scroll-parent'),
      },
    ],
    quickInsertPlugin,
    [tablesPlugin, { tableOptions: { advanced: true } }],
    codeBlockPlugin,
    panelPlugin,
    listsPlugin,
    textColorPlugin,
    breakoutPlugin,
    jiraIssuePlugin,
    extensionPlugin,
    rulePlugin,
    datePlugin,
    layoutPlugin,
    indentationPlugin,
    cardPlugin,
    [statusPlugin, { menuDisabled: false }],
    tasksAndDecisionsPlugin,
    insertBlockPlugin,
    [placeholderPlugin, { placeholder }],
  );

  if (providerFactory.hasProvider('mentionProvider')) {
    preset.push(mentionsPlugin);
  }

  if (providerFactory.hasProvider('mediaProvider')) {
    preset.push([
      mediaPlugin,
      {
        allowMediaSingle: true,
        allowMediaGroup: true,
        allowAnnotation: true,
        allowResizing: true,
      },
    ]);
  }

  return [preset];
}

export function EditorPresetCXHTML(
  props: EditorPresetCXHTMLProps & EditorPresetProps,
) {
  const { children, excludes, experimental } = props;
  const [preset] = useCXHTMLPreset(props);
  const plugins = getPluginsFromPreset(preset, excludes, experimental);

  return <PresetProvider value={plugins}>{children}</PresetProvider>;
}
