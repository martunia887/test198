import { defineMessages, InjectedIntl } from 'react-intl';
import { hasParentNodeOfType } from 'prosemirror-utils';
import { EditorState } from 'prosemirror-state';
import { Node as PMNode } from 'prosemirror-model';

import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';
import EditIcon from '@atlaskit/icon/glyph/editor/edit';
import FullWidthIcon from '@atlaskit/icon/glyph/editor/media-full-width';
import WideIcon from '@atlaskit/icon/glyph/editor/media-wide';
import CenterIcon from '@atlaskit/icon/glyph/editor/media-center';

import { Command } from '../../types';
import commonMessages from '../../messages';
import { MacroState, pluginKey as macroPluginKey } from '../macro';
import {
  FloatingToolbarHandler,
  FloatingToolbarItem,
} from '../floating-toolbar/types';
import { hoverDecoration } from '../base/pm-plugins/decoration';
import { editExtension } from './actions';
import { pluginKey } from './plugin';
import { ExtensionState } from './types';
import { updateExtensionLayout, removeExtension } from './commands';

export const messages = defineMessages({
  edit: {
    id: 'fabric.editor.edit',
    defaultMessage: 'Edit',
    description: 'Edit the properties for this extension.',
  },
});

const isLayoutSupported = (
  state: EditorState,
  selectedExtNode: { pos: number; node: PMNode },
) => {
  const {
    schema: {
      nodes: { bodiedExtension, extension, layoutSection, table, expand },
    },
    selection,
  } = state;

  if (!selectedExtNode) {
    return false;
  }

  return !!(
    (selectedExtNode.node.type === bodiedExtension ||
      (selectedExtNode.node.type === extension &&
        !hasParentNodeOfType([bodiedExtension, table, expand].filter(Boolean))(
          selection,
        ))) &&
    !hasParentNodeOfType([layoutSection])(selection)
  );
};

const breakoutOptions = (
  state: EditorState,
  formatMessage: InjectedIntl['formatMessage'],
  extensionState: ExtensionState,
  breakoutEnabled: boolean,
): Array<FloatingToolbarItem<Command>> => {
  const { layout, allowBreakout, nodeWithPos } = extensionState;
  return nodeWithPos &&
    breakoutEnabled &&
    allowBreakout &&
    isLayoutSupported(state, nodeWithPos)
    ? [
        {
          type: 'button',
          icon: CenterIcon,
          onClick: updateExtensionLayout('default'),
          selected: layout === 'default',
          title: formatMessage(commonMessages.layoutFixedWidth),
        },
        {
          type: 'button',
          icon: WideIcon,
          onClick: updateExtensionLayout('wide'),
          selected: layout === 'wide',
          title: formatMessage(commonMessages.layoutWide),
        },
        {
          type: 'button',
          icon: FullWidthIcon,
          onClick: updateExtensionLayout('full-width'),
          selected: layout === 'full-width',
          title: formatMessage(commonMessages.layoutFullWidth),
        },
      ]
    : [];
};

const editButton = (
  formatMessage: InjectedIntl['formatMessage'],
  macroState: MacroState,
  extensionState: ExtensionState,
): Array<FloatingToolbarItem<Command>> => {
  if (!extensionState.showEditButton) {
    return [];
  }

  return [
    {
      type: 'button',
      icon: EditIcon,
      onClick: editExtension(
        macroState && macroState.macroProvider,
        extensionState.updateExtension,
      ),
      title: formatMessage(messages.edit),
    },
  ];
};

export const getToolbarConfig = (
  breakoutEnabled: boolean = true,
): FloatingToolbarHandler => (state, { formatMessage }) => {
  const extensionState: ExtensionState = pluginKey.getState(state);
  const macroState: MacroState = macroPluginKey.getState(state);
  if (extensionState && extensionState.element) {
    const nodeType = [
      state.schema.nodes.extension,
      state.schema.nodes.inlineExtension,
      state.schema.nodes.bodiedExtension,
    ];

    const editButtonArray = editButton(
      formatMessage,
      macroState,
      extensionState,
    );
    const breakoutButtonArray = breakoutOptions(
      state,
      formatMessage,
      extensionState,
      breakoutEnabled,
    );

    return {
      title: 'Extension floating controls',
      getDomRef: () => extensionState.element!.parentElement || undefined,
      nodeType,
      items: [
        ...editButtonArray,
        ...breakoutButtonArray,
        {
          type: 'separator',
          hidden:
            editButtonArray.length === 0 && breakoutButtonArray.length === 0,
        },
        {
          type: 'button',
          icon: RemoveIcon,
          appearance: 'danger',
          onClick: removeExtension(),
          onMouseEnter: hoverDecoration(nodeType, true),
          onMouseLeave: hoverDecoration(nodeType, false),
          title: formatMessage(commonMessages.remove),
        },
      ],
    };
  }
  return;
};
