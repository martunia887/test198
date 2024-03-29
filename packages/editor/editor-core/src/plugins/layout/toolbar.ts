import { defineMessages, InjectedIntl } from 'react-intl';
import { EditorState } from 'prosemirror-state';
import { findDomRefAtPos } from 'prosemirror-utils';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import LayoutThreeEqualIcon from '@atlaskit/icon/glyph/editor/layout-three-equal';
import LayoutTwoLeftSidebarIcon from '@atlaskit/icon/glyph/editor/layout-two-left-sidebar';
import LayoutTwoRightSidebarIcon from '@atlaskit/icon/glyph/editor/layout-two-right-sidebar';
import RemoveIcon from '@atlaskit/icon/glyph/editor/remove';

import commonMessages from '../../messages';
import { MessageDescriptor } from '../../types/i18n';
import { Command } from '../../../src/types';
import {
  FloatingToolbarConfig,
  FloatingToolbarItem,
  FloatingToolbarSeparator,
  FloatingToolbarButton,
  Icon,
} from '../../../src/plugins/floating-toolbar/types';
import {
  setPresetLayout,
  deleteActiveLayoutNode,
  getPresetLayout,
  PresetLayout,
} from './actions';
import { hoverDecoration } from '../base/pm-plugins/decoration';

export const messages = defineMessages({
  twoColumns: {
    id: 'fabric.editor.twoColumns',
    defaultMessage: 'Two columns',
    description: 'Layout with two columns of equal width',
  },
  threeColumns: {
    id: 'fabric.editor.threeColumns',
    defaultMessage: 'Three columns',
    description: 'Layout with three columns of equal width',
  },
  rightSidebar: {
    id: 'fabric.editor.rightSidebar',
    defaultMessage: 'Right sidebar',
    description:
      'Layout with two columns, left column is 2/3 and right is 1/3 of page',
  },
  leftSidebar: {
    id: 'fabric.editor.leftSidebar',
    defaultMessage: 'Left sidebar',
    description:
      'Layout with two columns, left column is 1/3 and right is 2/3 of page',
  },
});

type PresetLayoutButtonItem = {
  type: PresetLayout;
  title: MessageDescriptor;
  icon: Icon;
};

const LAYOUT_TYPES: PresetLayoutButtonItem[] = [
  { type: 'two_equal', title: messages.twoColumns, icon: LayoutTwoEqualIcon },
  {
    type: 'three_equal',
    title: messages.threeColumns,
    icon: LayoutThreeEqualIcon,
  },
];

const MORE_LAYOUT_TYPES: PresetLayoutButtonItem[] = [
  {
    type: 'two_right_sidebar',
    title: messages.rightSidebar,
    icon: LayoutTwoRightSidebarIcon,
  },
  {
    type: 'two_left_sidebar',
    title: messages.leftSidebar,
    icon: LayoutTwoLeftSidebarIcon,
  },
];

const buildLayoutButton = (
  intl: InjectedIntl,
  item: PresetLayoutButtonItem,
  currentLayout: string | undefined,
): FloatingToolbarItem<Command> => ({
  type: 'button',
  icon: item.icon,
  title: intl.formatMessage(item.title),
  onClick: setPresetLayout(item.type),
  selected: !!currentLayout && currentLayout === item.type,
});

export const buildToolbar = (
  state: EditorState,
  intl: InjectedIntl,
  pos: number,
  allowBreakout: boolean,
  addSidebarLayouts: boolean,
): FloatingToolbarConfig | undefined => {
  const node = state.doc.nodeAt(pos);
  if (node) {
    const currentLayout = getPresetLayout(node);

    const separator: FloatingToolbarSeparator = {
      type: 'separator',
    };

    const deleteButton: FloatingToolbarButton<Command> = {
      type: 'button',
      appearance: 'danger',
      icon: RemoveIcon,
      title: intl.formatMessage(commonMessages.remove),
      onClick: deleteActiveLayoutNode,
      onMouseEnter: hoverDecoration(true),
      onMouseLeave: hoverDecoration(false),
    };

    return {
      title: 'Columns floating controls',
      getDomRef: view =>
        findDomRefAtPos(pos, view.domAtPos.bind(view)) as HTMLElement,
      nodeType: state.schema.nodes.layoutSection,
      items: [
        ...LAYOUT_TYPES.map(i => buildLayoutButton(intl, i, currentLayout)),
        ...(addSidebarLayouts
          ? MORE_LAYOUT_TYPES.map(i =>
              buildLayoutButton(intl, i, currentLayout),
            )
          : []),
        separator,
        deleteButton,
      ],
    };
  }
};
