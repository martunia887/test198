import * as React from 'react';
import { Node as PMNode } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { ProviderFactory } from '@atlaskit/editor-common';
import Mention from '../ui/Mention';
import { ReactNodeView, getPosHandler } from '../../../nodeviews';
import InlineNodeWrapper, {
  createMobileInlineDomRef,
} from '../../../ui/InlineNodeWrapper';
import { PortalProviderAPI } from '../../../ui/PortalProvider';
import { EditorAppearance } from '../../../types';
import { ZeroWidthSpace } from '../../../utils';

export interface Props {
  providerFactory: ProviderFactory;
  editorAppearance?: EditorAppearance;
}

export class MentionNodeView extends ReactNodeView {
  createDomRef() {
    if (this.reactComponentProps.editorAppearance === 'mobile') {
      return createMobileInlineDomRef();
    }

    return super.createDomRef();
  }

  render(props: Props) {
    const { providerFactory, editorAppearance } = props;
    const { id, text, accessLevel } = this.node.attrs;

    /**
     * Work around to bypass continuing a composition event.
     * @see ED-5924
     */
    let mentionText = text;
    if (text && editorAppearance === 'mobile') {
      mentionText = `‌‌ ${mentionText}‌‌ `;
    }

    return (
      <InlineNodeWrapper appearance={editorAppearance}>
        <Mention
          id={id}
          text={mentionText}
          accessLevel={accessLevel}
          providers={providerFactory}
        />
        {editorAppearance !== 'mobile' && ZeroWidthSpace}
      </InlineNodeWrapper>
    );
  }
}

export default function mentionNodeView(
  portalProviderAPI: PortalProviderAPI,
  providerFactory: ProviderFactory,
  editorAppearance?: EditorAppearance,
) {
  return (node: PMNode, view: EditorView, getPos: getPosHandler): NodeView =>
    new MentionNodeView(node, view, getPos, portalProviderAPI, {
      providerFactory,
      editorAppearance,
    }).init();
}
