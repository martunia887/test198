import * as React from 'react';
import { Context, FileIdentifier } from '@atlaskit/media-core';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Button from '@atlaskit/button';
import { ItemViewer } from './item-viewer';
import { MediaViewerFeatureFlags } from './domain';
import {
  CloseButtonWrapper,
  HeaderWrapper,
  hideControlsClassName,
  ListWrapper,
  ListWrapper2,
} from './styled';
import { getSelectedIndex } from './utils';
import ErrorMessage, { createError } from './error';
import { Navigation } from './navigation';
import Header from './header';
import { CommentsSection } from './comments-section';

export type Props = Readonly<{
  onClose?: () => void;
  onNavigationChange?: (selectedItem: FileIdentifier) => void;
  showControls?: () => void;
  featureFlags?: MediaViewerFeatureFlags;
  defaultSelectedItem: FileIdentifier;
  items: FileIdentifier[];
  context: Context;
  onCommentsToggle?: (showComments: boolean) => void;
  showComments: boolean;
}>;

export type State = {
  selectedItem: FileIdentifier;
  previewCount: number;
};

export class List extends React.Component<Props, State> {
  state: State = {
    selectedItem: this.props.defaultSelectedItem,
    previewCount: 0,
  };

  render() {
    const { items } = this.props;
    return this.renderContent(items);
  }

  renderContent(items: FileIdentifier[]) {
    const {
      context,
      onClose,
      featureFlags,
      showControls,
      showComments,
      onCommentsToggle,
    } = this.props;
    const { selectedItem } = this.state;
    if (getSelectedIndex(items, selectedItem) < 0) {
      return <ErrorMessage error={createError('idNotFound')} />;
    } else {
      return (
        <ListWrapper>
          <ListWrapper2>
            <HeaderWrapper className={hideControlsClassName}>
              <Header
                showComments={showComments}
                context={context}
                identifier={selectedItem}
                onClose={onClose}
                onCommentsToggle={onCommentsToggle}
              />
              <CloseButtonWrapper>
                <Button
                  appearance={'toolbar' as any}
                  onClick={onClose}
                  iconBefore={<CrossIcon label="Close" />}
                />
              </CloseButtonWrapper>
            </HeaderWrapper>
            <ItemViewer
              featureFlags={featureFlags}
              context={context}
              identifier={selectedItem}
              showControls={showControls}
              onClose={onClose}
              previewCount={this.state.previewCount}
            />
            <Navigation
              items={items}
              selectedItem={selectedItem}
              onChange={this.onNavigationChange}
            />
          </ListWrapper2>
          {showComments ? (
            <CommentsSection context={context} identifier={selectedItem} />
          ) : null}
        </ListWrapper>
      );
    }
  }

  onNavigationChange = (selectedItem: FileIdentifier) => {
    const { onNavigationChange, showControls } = this.props;
    if (onNavigationChange) {
      onNavigationChange(selectedItem);
    }
    if (showControls) {
      showControls();
    }

    this.setState({ selectedItem, previewCount: this.state.previewCount + 1 });
  };
}
