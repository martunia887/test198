import * as React from 'react';
import { EventHandlers } from '@atlaskit/editor-common';
import { VideoPreviewEmbedder } from './VideoPreviewEmbedder';
import debounce from 'lodash.debounce';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { VideoSearchResult } from '../searchUtils';

const arrowColor = '#D0D0D0'

interface PreviewProps extends React.Props<any> {
  children?: any;
  video: VideoSearchResult;
  inlinePreview?: boolean;
  target?: string;
  eventHandlers?: EventHandlers;
}

interface PreviewState {
  isPopoverOpen: boolean;
}

export class VideoSearchResultPreviewPopover extends React.Component<PreviewProps, PreviewState> {

  constructor(props: any) {
    super(props)
    this.closePreview = this.closePreview.bind(this)
    this.openPreview = this.openPreview.bind(this)
  }

  state = {
    isPopoverOpen: false,
  };

  closeTimeout: NodeJS.Timer;
  closeDelay: number = 450;

  closePreview() {
    this.setState({ isPopoverOpen: false });
  }

  openPreview() {
    clearTimeout(this.closeTimeout);
    this.setState({ isPopoverOpen: true });
  }
  
  debouncedOpenPreview = debounce(this.openPreview, 250);

  render() {
    return (
      <div
        onMouseEnter={e => this.debouncedOpenPreview()}
        onMouseLeave={e => {
          this.closeTimeout = setTimeout(this.closePreview, this.closeDelay);
        }}
      >
        <Popover
          isOpen={this.state.isPopoverOpen}
          position={'right'}

          containerStyle={{
            'margin-left': '20px',
            'z-index': '450',
            overflow: 'visible',  // needed to see the box shadow
          }}

          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={arrowColor}
              arrowSize={10}
              arrowStyle={{ 
                // opacity: 0.3,
                zIndex: 650,
                '-webkit-box-shadow': '10px 10px 44px -6px rgba(0,0,0,0.75)',
                '-moz-box-shadow': '10px 10px 44px -6px rgba(0,0,0,0.75)',
                'box-shadow': '10px 10px 44px -6px rgba(0,0,0,0.75)',
              }}
            >
              <VideoPreviewEmbedder video={this.props.video} link={this} />
            </ArrowContainer>
          )}
          onClickOutside={this.closePreview}
        >
          {this.props.children}
        </Popover>
      </div>
    );
  }
}
