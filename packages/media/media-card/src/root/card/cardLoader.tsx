import * as React from 'react';
import { WithContextOrMediaClientConfigProps } from '@atlaskit/media-client';
import { CardLoading } from '../..';
import { MediaCardAnalyticsErrorBoundaryProps } from '../media-card-analytics-error-boundary';
import { CardWithAnalyticsEventsProps } from '.';

export type CardWithMediaClientConfigProps = WithContextOrMediaClientConfigProps<
  CardWithAnalyticsEventsProps
>;
type CardWithMediaClientConfigComponent = React.ComponentType<
  CardWithMediaClientConfigProps
>;

type MediaCardErrorBoundaryComponent = React.ComponentType<
  MediaCardAnalyticsErrorBoundaryProps
>;

export interface AsyncCardState {
  Card?: CardWithMediaClientConfigComponent;
  MediaCardErrorBoundary?: MediaCardErrorBoundaryComponent;
}

export default class CardLoader extends React.PureComponent<
  CardWithMediaClientConfigProps & AsyncCardState,
  AsyncCardState
> {
  static displayName = 'AsyncCard';
  static Card?: CardWithMediaClientConfigComponent;
  static MediaCardErrorBoundary?: MediaCardErrorBoundaryComponent;
  private canLoadCard = true; // Prevent updating the state when the component was unmount.

  state: AsyncCardState = {
    Card: CardLoader.Card,
    MediaCardErrorBoundary: CardLoader.MediaCardErrorBoundary,
  };

  async componentDidMount() {
    if (!this.state.Card) {
      try {
        const [
          mediaClient,
          cardModule,
          mediaCardErrorBoundaryModule,
        ] = await Promise.all([
          import(/* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
          import(/* webpackChunkName:"@atlaskit-internal_Card" */ './index'),
          import(/* webpackChunkName:"@atlaskit-internal_MediaCardErrorBoundary" */ '../media-card-analytics-error-boundary'),
        ]);

        if (!this.canLoadCard) {
          return false;
        }

        CardLoader.Card = mediaClient.withMediaClient(cardModule.Card);
        CardLoader.MediaCardErrorBoundary =
          mediaCardErrorBoundaryModule.default;

        this.setState({
          Card: CardLoader.Card,
          MediaCardErrorBoundary: CardLoader.MediaCardErrorBoundary,
        });
      } catch (error) {
        // TODO [MS-2278]: Add operational error to catch async import error
      }
    }
  }

  componentWillUnmount() {
    this.canLoadCard = false;
  }

  render() {
    const { dimensions } = this.props;
    const { Card, MediaCardErrorBoundary } = this.state;

    if (!Card || !MediaCardErrorBoundary) {
      return <CardLoading dimensions={dimensions} />;
    }

    return (
      <MediaCardErrorBoundary>
        <Card {...this.props} />
      </MediaCardErrorBoundary>
    );
  }
}
