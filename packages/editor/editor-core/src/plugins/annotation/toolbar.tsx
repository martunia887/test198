import { defineMessages } from 'react-intl';
import { FloatingToolbarHandler } from '../floating-toolbar/types';
import { pluginKey, HyperlinkState } from './pm-plugins/main';
import { setAnnotationQueryMarks } from './commands';
import CommentIcon from '@atlaskit/icon/glyph/comment';

export const messages = defineMessages({
  info: {
    id: 'fabric.editor.info',
    defaultMessage: 'Info',
    description:
      'Panels provide a way to highlight text. The info panel has a blue background.',
  },
});

export const getToolbarConfig: FloatingToolbarHandler = state => {
  const annotationState: HyperlinkState | undefined = pluginKey.getState(state);
  if (
    annotationState &&
    annotationState.activeText &&
    !annotationState.showAnnotationToolbar
  ) {
    return {
      title: 'Annotate floating toolbar',
      getDomRef: () => annotationState.element,
      nodeType: state.schema.nodes.paragraph,
      items: [
        {
          type: 'button',
          icon: CommentIcon,
          showTitle: true,
          title: 'Comment',
          onClick: setAnnotationQueryMarks(),
        },
      ],
    };
  }
  return;
};
