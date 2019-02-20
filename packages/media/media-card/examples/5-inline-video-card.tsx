import * as React from 'react';
import { Card } from '../src';
import {
  videoFileId,
  imageFileId,
  videoLargeFileId,
  videoHorizontalFileId,
  createStorybookMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import {
  InlineCardVideoWrapper,
  InlineCardVideoWrapperItem,
} from '../example-helpers/styled';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createStorybookMediaClientConfig();
const onClick = () => console.log('onClick');

export default () => (
  <MediaClientConfigContext.Provider value={mediaClientConfig}>
    <InlineCardVideoWrapper>
      <InlineCardVideoWrapperItem>
        <h1>video large [disableOverlay=true] width=500 height=300</h1>
        <Card
          identifier={videoLargeFileId}
          dimensions={{ width: 500, height: 300 }}
          disableOverlay={true}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </InlineCardVideoWrapperItem>

      <InlineCardVideoWrapperItem>
        <h1>
          video large [disableOverlay=true] width=500 height=300 (but with
          constraining box of 250px x auto)
        </h1>
        <div style={{ width: '250px', height: 'auto' }}>
          <Card
            identifier={videoLargeFileId}
            dimensions={{ width: 500, height: 300 }}
            disableOverlay={true}
            onClick={onClick}
            useInlinePlayer={true}
          />
        </div>
      </InlineCardVideoWrapperItem>
      <InlineCardVideoWrapperItem>
        <h1>Image file [disableOverlay=true]</h1>
        <Card
          identifier={imageFileId}
          disableOverlay={true}
          onClick={onClick}
        />
      </InlineCardVideoWrapperItem>
      <InlineCardVideoWrapperItem>
        <h1>Image file [disableOverlay=true] [useInlinePlayer=true]</h1>
        <Card
          identifier={imageFileId}
          disableOverlay={true}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </InlineCardVideoWrapperItem>
      <InlineCardVideoWrapperItem>
        <h1>video [disableOverlay=true] no dimensions</h1>
        <Card
          identifier={videoFileId}
          disableOverlay={true}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </InlineCardVideoWrapperItem>
      <InlineCardVideoWrapperItem>
        <h1>video [disableOverlay=true] width=100% height=300</h1>
        <Card
          identifier={videoFileId}
          dimensions={{ width: '100%', height: 300 }}
          disableOverlay={true}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </InlineCardVideoWrapperItem>
      <InlineCardVideoWrapperItem>
        <h1>video horizontal [disableOverlay=true] width=500 height=300</h1>
        <Card
          identifier={videoHorizontalFileId}
          dimensions={{ width: 500, height: 300 }}
          disableOverlay={true}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </InlineCardVideoWrapperItem>
      <InlineCardVideoWrapperItem>
        <h1>video horizontal width=200 height=500</h1>
        <Card
          identifier={videoHorizontalFileId}
          dimensions={{ width: 200, height: 500 }}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </InlineCardVideoWrapperItem>
      <InlineCardVideoWrapperItem>
        <h1>video horizontal no dimensions</h1>
        <Card
          identifier={videoHorizontalFileId}
          onClick={onClick}
          useInlinePlayer={true}
        />
      </InlineCardVideoWrapperItem>
    </InlineCardVideoWrapper>
  </MediaClientConfigContext.Provider>
);
