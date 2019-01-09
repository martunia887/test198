import { defineMessages } from 'react-intl';
import { FloatingToolbarHandler } from '../floating-toolbar/types';
import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';

import { stateKey, HyperlinkState } from './pm-plugins/main';
import {
  removeLink,
  setLinkText,
  showLinkToolbar,
  setLinkHref,
} from './commands';
import { normalizeUrl } from './utils';

export const messages = defineMessages({
  info: {
    id: 'fabric.editor.info',
    defaultMessage: 'Info',
    description:
      'Panels provide a way to highlight text. The info panel has a blue background.',
  },
  note: {
    id: 'fabric.editor.note',
    defaultMessage: 'Note',
    description:
      'Panels provide a way to highlight text. The note panel has a purple background.',
  },
});

const showTextToolbar = (text, pos) => {
  return [
    {
      type: 'input',
      onSubmit: text => setLinkText(pos, text),
      placeholder: 'Text to display',
    },
  ];
};

const showLinkEditToolbar = (link, pos) => {
  return [
    {
      type: 'input',
      onSubmit: setLinkHref(pos, link),
      placeholder: 'Setup link here',
      defaultValue: link || '',
    },
  ];
};

const getToolbarToShow = (link, text, pos) => {
  const isLinkTextTheSameAsTheLinkUrl = link === normalizeUrl(text);

  return isLinkTextTheSameAsTheLinkUrl
    ? showTextToolbar(text, pos)
    : showLinkEditToolbar(link, pos);
};

export const getToolbarConfig: FloatingToolbarHandler = (
  state,
  { formatMessage },
) => {
  const linkState: HyperlinkState | undefined = stateKey.getState(state);

  if (linkState && linkState.activeLinkMark) {
    const {
      activeLinkMark: { pos, node },
    } = linkState;

    const linkMark = node.marks.filter(
      mark => mark.type === state.schema.marks.link,
    );
    const link = linkMark[0] && linkMark[0].attrs.href;
    const text = node.text;

    return {
      title: 'Hyperlink floating controls',
      nodeType: state.schema.nodes.paragraph,
      items: [
        ...getToolbarToShow(link, text, pos),
        {
          type: 'separator',
        },
        {
          type: 'button',
          icon: OpenIcon,
          target: '_blank',
          href: link,
          selected: false,
          title: 'Open link',
        },
        {
          type: 'button',
          icon: UnlinkIcon,
          onClick: removeLink(pos),
          selected: false,
          title: 'Unlink',
        },
      ],
    };
  }
};
