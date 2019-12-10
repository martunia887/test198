// TODO: Move this file somewhere else
import * as React from 'react';
import BitbucketBranchesIcon from '@atlaskit/icon/glyph/bitbucket/branches';
import { Component } from 'react';
import Spinner from '@atlaskit/spinner';
import { UnsplashWrapper } from './styled';
import { MediaPickerPlugin } from '../src/domain/plugin';
import { SpinnerWrapper } from '../src/plugins/views/styled';

export const PLUGIN_NAME = 'AI';

interface AIViewState {
  isLoading: boolean;
}

class AIView extends Component<{}, AIViewState> {
  state: AIViewState = {
    isLoading: true,
  };

  async componentDidMount() {
    // @ts-ignore
    await new Promise(resolve => setTimeout(resolve, 5000));

    this.setState({ isLoading: false });
  }
  render() {
    const { isLoading } = this.state;
    const content = isLoading ? (
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    ) : (
      <img
        style={{ width: '100%' }}
        src="https://media.tenor.com/images/f4d01991ac62218c86b5a1d5b2919e66/tenor.gif"
        alt=""
      />
    );

    return <UnsplashWrapper>{content}</UnsplashWrapper>;
  }
}

export const AIPlugin: MediaPickerPlugin = {
  name: PLUGIN_NAME,
  icon: <BitbucketBranchesIcon label="ai-icon" />,
  render: () => <AIView />,
};
