import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import Unsplash, { SearchResponse } from 'unsplash-client';
import Spinner from '@atlaskit/spinner';
import { PopupPlugin } from '../src/components/types';
import { Component } from 'react';
import { Card } from '@atlaskit/media-card';
import { ExternalImageIdentifier } from '@atlaskit/media-core';
import { ResultsWrapper } from './styled';

export interface UnsplashViewState {
  results: SearchResponse[];
  selectedResults: string[];
}

const client = new Unsplash(
  '92b5d374817b9aeb2a89198a23fe12fdbe89a38518d5fc13adbddf95d28c2778',
);

class UnsplashView extends Component<{}, UnsplashViewState> {
  state: UnsplashViewState = {
    results: [],
    selectedResults: [],
  };

  async componentDidMount() {
    const results = await client.search('sydney');

    this.setState({
      results,
    });
  }

  onCardClick = (id: string) => () => {
    const { selectedResults } = this.state;
    const index = selectedResults.indexOf(id);

    if (index === -1) {
      selectedResults.push(id);
    } else {
      selectedResults.splice(index, 1);
    }

    this.setState({ selectedResults });
  };

  renderResults = () => {
    const { results, selectedResults } = this.state;
    const resultsContent = results.map(result => {
      const { id } = result;
      const identifier: ExternalImageIdentifier = {
        dataURI: result.urls.regular,
        mediaItemType: 'external-image',
        name: id,
      };
      const selected = !!selectedResults.find(
        selectedResult => selectedResult === id,
      );

      return (
        <Card
          selectable
          selected={selected}
          key={id}
          context={{} as any}
          identifier={identifier}
          onClick={this.onCardClick(id)}
        />
      );
    });

    return <ResultsWrapper>{resultsContent}</ResultsWrapper>;
  };

  render() {
    const { results } = this.state;

    if (!results.length) {
      return <Spinner />;
    }

    return this.renderResults();
  }
}

export const unsplashPlugin: PopupPlugin = {
  name: 'unsplash',
  icon: <ImageIcon label="image-icon" />,
  render: () => <UnsplashView />,
};
