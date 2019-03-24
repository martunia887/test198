import * as React from 'react';
import styled from 'styled-components';
import { VideoSearchResult, VideoServiceName } from '../searchUtils';
import { VideoSearchResultPreviewPopover } from './VideoSearchResultPreviewPopover';
import { YouTubeIcon } from './YouTubeIcon';
import { VimeoIcon } from './VimeoIcon';
import GenericVideoIcon from '../../../../../../core/icon/glyph/vid-play';

const hoverColor = '#D0D0D0'
const selectedColor = '#B0B0B0'
const white = '#FFFFFF'

const StyledSearchResult = styled.div`
  height: 100px;
  width: 285px;
  cursor: pointer;

  overflow:hidden;
  &:hover {
    background-color: ${hoverColor};
  }
`
const StyledSearchResultThumbnailWrapper = styled.div`
  width: 90px; 
  /* height: 90px;  */
  float: left;
  margin-top: 15px;
`
const StyledSearchResultThumbnail = styled.img`
  width: 90px;
  /* width: 120px; */
  /* height: 90px; */
`
const StyledSearchResultInfo = styled.div`
  float: left;
  width: 182px;
`
const StyledSearchResultTitle = styled.div`
  width: 182px;
  /* width: 152px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight:500;
  padding: 2px 0 0 3px;
`
const StyledSearchResultDescription = styled.div`
  width: 182px;
  /* width: 152px;  */
  overflow: hidden;
  text-overflow: ellipsis;
  font-size:0.7em;
  padding: 0 0 2px 3px;
`

const renderIcon = (videoServiceName: VideoServiceName): JSX.Element => {
  switch(videoServiceName) {

    case 'YouTube':
      return <YouTubeIcon />

    case 'Vimeo':
      return <VimeoIcon />

    default:
      return <GenericVideoIcon label="" />
  }
}


export class VideoSearchResultItem extends React.Component<{
  searchResult: VideoSearchResult
  selected: boolean
  onMouseMove: any
  onSelection: any
}, any> {
  render() {
    return (
    <VideoSearchResultPreviewPopover
      video={this.props.searchResult}
      eventHandlers={{
        // ...
      }}
    >
      <StyledSearchResult 
        onClick={() => this.props.onSelection(this.props.searchResult)}
        style={{backgroundColor: this.props.selected ? selectedColor : ''}}
      >
        <StyledSearchResultThumbnailWrapper className="youtube-search-result-thumbnail">
          <StyledSearchResultThumbnail
            // title={`${this.props.searchResult.title} - ${this.props.searchResult.description}`}
            alt={this.props.searchResult.title}
            src={this.props.searchResult.thumbnail.url} 
          />
        </StyledSearchResultThumbnailWrapper>
        <StyledSearchResultInfo>  
          
          
          <StyledSearchResultTitle 
            // title={this.props.searchResult.title}
          >
            {renderIcon(this.props.searchResult.videoServiceName)} 
            {this.props.searchResult.title}
          </StyledSearchResultTitle>
          <StyledSearchResultDescription
            // title={this.props.searchResult.description}
          >
            {this.props.searchResult.description}
          </StyledSearchResultDescription>
        </StyledSearchResultInfo>
      </StyledSearchResult>
    </VideoSearchResultPreviewPopover>
    )
  }
}
