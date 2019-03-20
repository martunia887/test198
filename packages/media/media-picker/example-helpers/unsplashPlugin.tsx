// TODO: Move this file somewhere else
import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import Unsplash, { SearchResponse } from 'unsplash-client';
import Spinner from '@atlaskit/spinner';
import FieldText from '@atlaskit/field-text';
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
import {
  MediaPickerPlugin,
  PluginActions,
  PluginFile,
} from '../src/domain/plugin';
import { BricksView, BrickItem } from '../src/plugins/bricksPluginView';

export interface UnsplashViewState {
  results: SearchResponse[];
  query: string;
}

export interface UnsplashViewProps {
  actions: PluginActions;
  selectedItems: SelectedItem[];
}

export interface UnsplashFileMetadata {
  src: string;
  srcFull: string;
}

export const PLUGIN_NAME = 'unsplash';

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
    const { resultsToRender } = this;
    const { actions } = this.props;
    const selectedResult = resultsToRender.find(result => result.id === id);
    if (!selectedResult) {
      return;
    }
    const metadata: UnsplashFileMetadata = {
      src: selectedResult.urls.regular,
      srcFull: selectedResult.urls.full,
    };
    const item: PluginFile = {
      id,
      metadata,
    };
    actions.fileClick(item, PLUGIN_NAME);
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
          selectedItem.id === id && selectedItem.serviceName === PLUGIN_NAME,
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

  get resultsToRender() {
    const { results } = this.state;
    return results.length ? results : UnsplashView.randomResults;
  }

  renderBricks = () => {
    const { selectedItems } = this.props;
    const { resultsToRender } = this;
    const items: BrickItem[] = resultsToRender.map(result => {
      const identifier: BrickItem = {
        id: result.id,
        mediaItemType: 'external-image',
        dataURI: result.urls.regular,
        dimensions: {
          height: result.height,
          width: result.width,
        },
      };

      return identifier;
    });

    return (
      <BricksView
        items={items}
        selectedItems={selectedItems}
        pluginName={PLUGIN_NAME}
      />
    );
  };

  render() {
    const { query } = this.state;
    // const { resultsToRender } = this;
    // const content = resultsToRender.length
    //   ? this.renderResults(resultsToRender)
    //   : this.renderLoading();
    const content = this.renderBricks();

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

export const unsplashPlugin: MediaPickerPlugin = {
  name: PLUGIN_NAME,
  // type: 'external' | 'media', // TODO: plugin v2
  icon: <ImageIcon label="image-icon" />,
  // TODO: potentially rename into (actions, state: {selectedItems: SelectedItems})
  render: (actions, selectedItems) => (
    <UnsplashView actions={actions} selectedItems={selectedItems} />
  ),
};
