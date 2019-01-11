import { defineMessages } from 'react-intl';
import { FloatingToolbarHandler } from '../floating-toolbar/types';
import OpenIcon from '@atlaskit/icon/glyph/editor/open';
import UnlinkIcon from '@atlaskit/icon/glyph/editor/unlink';

import { stateKey, HyperlinkState } from './pm-plugins/main';
import { removeLink, setLinkText, setLinkHref } from './commands';
import { normalizeUrl } from './utils';

export const messages = defineMessages({
  openLink: {
    id: 'fabric.editor.openLink',
    defaultMessage: 'Open link',
    description: 'Follows the hyperlink.',
  },
  unlink: {
    id: 'fabric.editor.unlink',
    defaultMessage: 'Unlink',
    description: 'Removes the hyperlink but keeps your text.',
  },
});

const showTextToolbar = (text, pos) => {
  return [
    {
      type: 'input',
      onSubmit: text => setLinkText(pos, text),
      placeholder: 'Text to display',
      onBlur: text => setLinkText(pos, text),
    },
  ];
};

const showLinkEditToolbar = (link, pos) => {
  return [
    {
      type: 'input',
      onSubmit: link => setLinkHref(pos, link),
      placeholder: 'Setup link here',
      defaultValue: link || '',
      onBlur: link => setLinkHref(pos, link),
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

  if (linkState && linkState.activeLinkMark && linkState.activeLinkMark) {
    const {
      activeLinkMark: { pos, node },
    } = linkState;

    const linkMark = node.marks.filter(
      mark => mark.type === state.schema.marks.link,
    );
    const link = linkMark[0] && linkMark[0].attrs.href;
    const text = node.text;

    const labelOpenLink = formatMessage(messages.openLink);
    const labelUnlink = formatMessage(messages.unlink);

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
          title: labelOpenLink,
        },
        {
          type: 'button',
          icon: UnlinkIcon,
          onClick: removeLink(pos),
          selected: false,
          title: labelUnlink,
        },
      ],
    };
  }
};
