import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiId, ResourcedEmoji } from '@atlaskit/emoji';
import {
  ProviderFactory,
  Providers,
  WithProviders,
} from '@atlaskit/editor-common';
import { ClickSelectWrapper } from '../../../../ui/styles';

export interface EmojiProps extends EmojiId {
  allowTextFallback?: boolean;
  providers?: ProviderFactory;
  fitToHeight?: number;
}

export default class EmojiNode extends PureComponent<EmojiProps, {}> {
  private providerFactory: ProviderFactory;

  constructor(props: EmojiProps) {
    super(props);
    this.providerFactory = props.providers || new ProviderFactory();
  }

  componentWillUnmount() {
    if (!this.props.providers) {
      // new ProviderFactory is created if no `providers` has been set
      // in this case when component is unmounted it's safe to destroy this providerFactory
      this.providerFactory.destroy();
    }
  }

  private renderWithProvider = (providers: Providers) => {
    const {
      allowTextFallback,
      shortName,
      id,
      fallback,
      fitToHeight,
    } = this.props;

    if (allowTextFallback && !providers.emojiProvider) {
      return <span>{fallback || shortName}</span>;
    }

    return (
      <ClickSelectWrapper>
        <ResourcedEmoji
          emojiId={{ id, fallback, shortName }}
          emojiProvider={providers.emojiProvider}
          showTooltip={true}
          fitToHeight={fitToHeight}
        />
      </ClickSelectWrapper>
    );
  };

  render() {
    return (
      <WithProviders
        providers={['emojiProvider']}
        providerFactory={this.providerFactory}
        renderNode={this.renderWithProvider}
      />
    );
  }
}
