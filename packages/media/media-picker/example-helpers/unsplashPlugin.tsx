// TODO: Move this file somewhere else
import * as React from 'react';
import ImageIcon from '@atlaskit/icon/glyph/image';
import Unsplash, { SearchResponse } from 'unsplash-client';
import FieldText from '@atlaskit/field-text';
import { Component } from 'react';
import { UnsplashHeader, UnsplashWrapper } from './styled';
import { SelectedItem } from '../src/popup/domain';
import {
  MediaPickerPlugin,
  PluginActions,
  PluginFile,
} from '../src/domain/plugin';
import { BricksView, BrickItem } from '../src/plugins/views/bricks';

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
  'd163333f8d2e6d983ea0ad71774a15092e4aff97b99058cdd12f1ba3f42d09fe',
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

    const randomResults = await client.random(20);
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

  onQueryChange = (event: any) => {
    const query = event.currentTarget.value;

    this.setState({ query }, this.search);
  };

  get resultsToRender() {
    const { results } = this.state;
    return results.length ? results : UnsplashView.randomResults;
  }

  onFileClick = (item: BrickItem) => this.onCardClick(item.id)();

  renderBricks = () => {
    const { selectedItems } = this.props;
    const { resultsToRender } = this;
    const items: BrickItem[] = resultsToRender.map(result => {
      const identifier: BrickItem = {
        id: result.id,
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
        onFileClick={this.onFileClick}
      />
    );
  };

  render() {
    const { query } = this.state;
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
  // TODO: rename into (actions, state: {selectedItems: SelectedItems})
  render: (actions, selectedItems) => (
    <UnsplashView actions={actions} selectedItems={selectedItems} />
  ),
};
