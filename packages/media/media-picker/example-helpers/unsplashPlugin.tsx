// TODO: Move this file somewhere else
import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import Unsplash, { SearchResponse } from 'unsplash-client';
import Spinner from '@atlaskit/spinner';
import FieldText from '@atlaskit/field-text';
import { PopupPlugin, PopupPluginActions } from '../src/components/types';
import { Component } from 'react';
import { Card } from '@atlaskit/media-card';
import { ExternalImageIdentifier } from '@atlaskit/media-core';
import {
  SpinnerWrapper,
  UnsplashHeader,
  UnsplashWrapper,
  ResultsWrapper,
} from './styled';
import { SelectedItem } from '../src/popup/domain';

export interface UnsplashViewState {
  results: SearchResponse[];
  query: string;
}

export interface UnsplashViewProps {
  actions: PopupPluginActions;
  selectedItems: SelectedItem[];
}

const client = new Unsplash(
  '92b5d374817b9aeb2a89198a23fe12fdbe89a38518d5fc13adbddf95d28c2778',
);

class UnsplashView extends Component<UnsplashViewProps, UnsplashViewState> {
  state: UnsplashViewState = {
    results: [],
    query: '',
  };

  static randomResults: SearchResponse[] = [];

  async componentDidMount() {
    if (UnsplashView.randomResults.length) {
      return;
    }

    const randomResults = await client.random();
    UnsplashView.randomResults = randomResults;
    this.forceUpdate();
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
    const item = {
      id,
      mimeType: 'image/png',
      date: new Date().getTime(),
      name: id,
      size: 0,
      upfrontId: Promise.resolve(id),
    };
    actions.fileClick(item, 'unsplash');
  };

  renderResults = (results: SearchResponse[]) => {
    const { selectedItems } = this.props;
    const resultsContent = results.map(result => {
      const { id } = result;
      const identifier: ExternalImageIdentifier = {
        dataURI: result.urls.regular,
        mediaItemType: 'external-image',
        name: id,
      };
      const selected = !!selectedItems.find(
        selectedItem =>
          selectedItem.id === id && selectedItem.serviceName === 'unsplash',
      );

      return (
        <Card
          selectable
          selected={selected}
          key={id}
          context={{} as any} // Context is not needed for external images
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

  renderLoading = () => {
    return (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    );
  };

  render() {
    const { results, query } = this.state;
    const resultsToRender = results.length
      ? results
      : UnsplashView.randomResults;
    const content = resultsToRender.length
      ? this.renderResults(resultsToRender)
      : this.renderLoading();

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
  render: (actions, selectedItems) => (
    <UnsplashView actions={actions} selectedItems={selectedItems} />
  ),
};
