import * as React from 'react';
import { PopupProps } from './popup';
import { WithContextOrMediaClientConfigProps } from '@atlaskit/media-client';

type PopupWithMediaClientConfigProps = WithContextOrMediaClientConfigProps<
  PopupProps
>;
type PopupWithMediaClientConfigComponent = React.ComponentType<
  PopupWithMediaClientConfigProps
>;

type State = {
  Popup?: PopupWithMediaClientConfigComponent;
};

export class PopupLoader extends React.PureComponent<
  PopupWithMediaClientConfigProps,
  State
> {
  static displayName = 'AsyncPopup';
  static Popup?: PopupWithMediaClientConfigComponent;

  state = { Popup: PopupLoader.Popup };

  async componentWillMount() {
    if (!this.state.Popup) {
      const [mediaClient, popupModule] = await Promise.all([
        import(/* webpackChunkName:"@atlaskit-media-client" */ '@atlaskit/media-client'),
        import(/* webpackChunkName:"@atlaskit-internal_Popup" */ './popup'),
      ]);

      PopupLoader.Popup = mediaClient.withMediaClient(popupModule.Popup);

      this.setState({
        Popup: PopupLoader.Popup,
      });
    }
  }

  render() {
    if (!this.state.Popup) {
      return null;
    }

    return <this.state.Popup {...this.props} />;
  }
}
