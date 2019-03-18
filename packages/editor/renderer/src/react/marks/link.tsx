import * as React from 'react';
import { colors } from '@atlaskit/theme';
import { EventHandlers } from '@atlaskit/editor-common';
import styled from 'styled-components';
import Spinner from '@atlaskit/spinner';

import { getEventHandler } from '../../utils';
import YouTube, { Options } from 'react-youtube';

import Popover, { ArrowContainer } from 'react-tiny-popover';

import debounce from 'lodash.debounce';

// tslint:disable-next-line:variable-name
const StyledAnchor = styled.a`
  color: ${colors.B400};

  &:hover {
    color: ${colors.B300};
    text-decoration: underline;
  }
`;

const StyledYT = styled.div`
  .ytLoading {
    display: none;
  }
`;

const extractYoutubeVideoId = (href: string): string => {
  const videoId = /^.*youtube.com\/watch\?v=(\w+).*$/.exec(href);
  return videoId ? videoId[1] : '';
};

const youtubeEmbedOptions: Options = {
  height: '270',
  width: '480',
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
  },
};

export class LinkPreviewPane extends React.Component<
  {
    href: string;
    link: Link;
  } & React.Props<any>,
  {
    ready: boolean;
  }
> {
  state = {
    ready: false,
  };

  onReady() {
    this.setState({ ready: true });
  }

  render() {
    return (
      <StyledYT
        style={{
          position: 'relative',
          zIndex: 600, // Needed to go over the top of the editor toolbar
          padding: '8px',
          backgroundColor: 'rgb(0, 0, 0, 0.3)',
          borderRadius: '5px',
          height: '270',
          width: '480',
        }}
        onMouseEnter={() => {
          clearTimeout(this.props.link.closeTimeout);
          this.props.link.setState({ isPopoverOpen: true });
        }}
        onMouseLeave={e => {
          this.props.link.closeTimeout = setTimeout(
            this.props.link.closePreview,
            this.props.link.closeDelay,
          );
        }}
      >
        {this.state.ready ? '' : <Spinner />}

        <YouTube
          // className="ytLoading"
          className={this.state.ready ? 'ytLoaded' : 'ytLoading'}
          videoId={extractYoutubeVideoId(this.props.href)}
          opts={youtubeEmbedOptions}
          onReady={() => this.onReady()}
          // onReady={this.props.link.onReady}
        />
      </StyledYT>
    );
  }
}

export default class Link extends React.Component<
  {
    children?: any;
    href: string;
    target?: string;
    eventHandlers?: EventHandlers;
  } & React.Props<any>,
  {
    isPopoverOpen: boolean;
  }
> {
  state = {
    isPopoverOpen: false,
  };

  closeTimeout: NodeJS.Timer;
  closeDelay: number = 1200;

  closePreview() {
    this.setState({ isPopoverOpen: false });
  }

  debouncedOpenPreview = debounce(this.openPreview, 250);

  openPreview() {
    clearTimeout(this.closeTimeout);
    this.setState({ isPopoverOpen: true });
  }

  render() {
    const { href, target, eventHandlers } = this.props;

    const anchorProps: any = {
      href,
      target,
      title: href,
    };

    if (target === '_blank') {
      anchorProps.rel = 'noreferrer noopener';
    }

    const handler = getEventHandler(eventHandlers, 'link');

    return (
      <Popover
        isOpen={this.state.isPopoverOpen}
        position={'left'} // preferred position
        content={({ position, targetRect, popoverRect }) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            targetRect={targetRect}
            popoverRect={popoverRect}
            arrowColor={'black'}
            arrowSize={10}
            arrowStyle={{ opacity: 0.3 }}
          >
            <LinkPreviewPane href={href} link={this} />
          </ArrowContainer>
        )}
        onClickOutside={() => this.setState({ isPopoverOpen: false })}
      >
        <StyledAnchor
          onClick={e => {
            if (handler) {
              handler(e, href);
            }
          }}
          onMouseEnter={e => this.debouncedOpenPreview()}
          onMouseLeave={e => {
            this.closeTimeout = setTimeout(this.closePreview, this.closeDelay);
          }}
          {...anchorProps}
        >
          {this.props.children}
        </StyledAnchor>
      </Popover>
    );
  }
}
