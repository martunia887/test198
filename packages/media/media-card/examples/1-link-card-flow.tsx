/* tslint:disable:no-console */
import * as React from 'react';
import { Component } from 'react';
import {
  genericLinkId,
  spotifyLinkId,
  errorLinkId,
  trelloLinkId,
  imageLinkId,
  genericUrlPreviewId,
  youTubeUrlPreviewId,
  publicTrelloBoardUrlPreviewId,
  videoUrlPreviewId,
  imageUrlPreviewId,
  docUrlPreviewId,
  unknownUrlPreviewId,
  createUploadMediaClientConfig,
} from '@atlaskit/media-test-helpers';
import { Card, OnLoadingChangeState, Identifier } from '../src';
import { UploadController } from '@atlaskit/media-client';
import {
  CardWrapper,
  CardsWrapper,
  CardState,
} from '../example-helpers/styled';
import { MediaClientConfigContext } from '@atlaskit/media-core';

const mediaClientConfig = createUploadMediaClientConfig();

export interface ComponentProps {}
export interface ComponentState {
  links: Identifier[];
  cardStates: { [name: string]: OnLoadingChangeState | undefined };
}

const links = [
  genericLinkId,
  spotifyLinkId,
  errorLinkId,
  trelloLinkId,
  imageLinkId,
  genericUrlPreviewId,
  youTubeUrlPreviewId,
  publicTrelloBoardUrlPreviewId,
  videoUrlPreviewId,
  imageUrlPreviewId,
  docUrlPreviewId,
  unknownUrlPreviewId,
];

class Example extends Component<ComponentProps, ComponentState> {
  uploadController?: UploadController;
  state: ComponentState = {
    links,
    cardStates: {},
  };

  renderCards() {
    const { links } = this.state;
    const cards = links.map((identifier, id) => {
      return (
        <CardWrapper key={id}>
          <MediaClientConfigContext.Provider value={mediaClientConfig}>
            <div>
              <Card identifier={identifier} />
            </div>
          </MediaClientConfigContext.Provider>
        </CardWrapper>
      );
    });

    return <CardsWrapper>{cards}</CardsWrapper>;
  }

  renderCardState = (state?: OnLoadingChangeState) => {
    if (!state) {
      return;
    }

    return (
      <CardState>
        <div>Type: {state.type}</div>
        <pre>{JSON.stringify(state.payload, undefined, 2)}</pre>
      </CardState>
    );
  };

  render() {
    return <div>{this.renderCards()}</div>;
  }
}

export default () => <Example />;
