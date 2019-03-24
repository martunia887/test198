
import * as React from 'react';
// import { VideoSearchResultPreviewPopover } from './VideoSearchResultPreviewPopover'
import styled from 'styled-components';
import YouTube, { Options } from 'react-youtube';
import Spinner from '@atlaskit/spinner';
import { VideoSearchResult } from '../searchUtils';
import { Vimeo } from './Vimeo';

const containerColor = '#D0D0D0'

const StyledVideoContainer = styled.div`
  .ytLoading {
    display: none;
  }
`;




const extractYoutubeVideoId = (href: string): string => {
  const videoId = /^.*youtube.com\/watch\?v=(\w+).*$/.exec(href);
  return videoId ? videoId[1] : '';
};

const embedOptions: Options = {
  height: '270',
  width: '480',
  playerVars: {
    autoplay: 1,
    modestbranding: 1,
  },
};

export class VideoPreviewEmbedder extends React.Component<
  {
    video: VideoSearchResult;
    link: any;
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
      <StyledVideoContainer
        style={{
          position: 'relative',
          zIndex: 600, // Needed to go over the top of the editor toolbar
          padding: '8px',
          backgroundColor: containerColor,
          borderRadius: '5px',
          height: '270',
          width: '480',
          '-webkit-box-shadow': '10px 10px 44px -6px rgba(0,0,0,0.45)',
          '-moz-box-shadow': '10px 10px 44px -6px rgba(0,0,0,0.45)',
          'box-shadow': '10px 10px 44px -6px rgba(0,0,0,0.45)',
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
        {!this.state.ready && <Spinner />}

        {this.props.video.videoServiceName === 'YouTube' && <YouTube
          // className="ytLoading"
          className={this.state.ready ? 'ytLoaded' : 'ytLoading'}
          videoId={extractYoutubeVideoId(this.props.video.videoUrl)}
          opts={embedOptions}
          onReady={() => this.onReady()}
          // onReady={this.props.link.onReady}
        />}


        {/* Quick hack to get vimeo working for the demo */}
        {this.props.video.videoServiceName === 'Vimeo' && <div
          className={this.state.ready ? 'ytLoaded' : 'ytLoading'}
        >
          <Vimeo 
            // className="ytLoading"
            videoId={extractYoutubeVideoId(this.props.video.videoUrl)}
            opts={embedOptions}
            onReady={() => this.onReady()}
            // onReady={this.props.link.onReady}
            video={this.props.video}
          />
        </div>
      }





      </StyledVideoContainer>
    );
  }
}

