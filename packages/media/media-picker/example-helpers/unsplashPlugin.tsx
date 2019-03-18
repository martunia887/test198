import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import Unsplash, { SearchResponse } from 'unsplash-client';
import Spinner from '@atlaskit/spinner';
import FieldText from '@atlaskit/field-text';
import { PopupPlugin, PopupPluginActions } from '../src/components/types';
import { Component } from 'react';
import { Card } from '@atlaskit/media-card';
import { ExternalImageIdentifier } from '@atlaskit/media-core';
import { UnsplashHeader, UnsplashWrapper, ResultsWrapper } from './styled';

export interface UnsplashViewState {
  results: SearchResponse[];
  selectedResults: string[];
  query: string;
}

export interface UnsplashViewProps {
  actions: PopupPluginActions;
}

const client = new Unsplash(
  '92b5d374817b9aeb2a89198a23fe12fdbe89a38518d5fc13adbddf95d28c2778',
);

class UnsplashView extends Component<UnsplashViewProps, UnsplashViewState> {
  state: UnsplashViewState = {
    results: [],
    selectedResults: [],
    query: '',
  };

  async componentDidMount() {
    const results = await client.random();

    this.setState({
      results,
    });
  }

  search = async () => {
    const { query } = this.state;
    const results = await client.search(query);

    this.setState({
      results,
    });
  };

  onCardClick = (id: string) => () => {
    const { actions } = this.props;
    const { selectedResults } = this.state;
    const index = selectedResults.indexOf(id);

    if (index === -1) {
      selectedResults.push(id);
    } else {
      selectedResults.splice(index, 1);
    }

    actions.fileClick(
      {
        id,
        mimeType: 'image/png',
        date: new Date().getTime(),
        name: id,
        size: 0,
        upfrontId: Promise.resolve(id),
      },
      'unsplash',
    );

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

  onQueryChange = (event: any) => {
    const query = event.currentTarget.value;

    this.setState({ query }, this.search);
  };

  render() {
    const { results, query } = this.state;
    const content = !results.length ? <Spinner /> : this.renderResults();

    return (
      <UnsplashWrapper>
        <UnsplashHeader>
          <h2>Unsplash</h2>
          <FieldText
            placeholder=""
            onChange={this.onQueryChange}
            value={query}
          />
        </UnsplashHeader>
        {content}
      </UnsplashWrapper>
    );
  }
}

export const unsplashPlugin: PopupPlugin = {
  name: 'unsplash',
  icon: <ImageIcon label="image-icon" />,
  render: actions => <UnsplashView actions={actions} />,
};
