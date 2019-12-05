import * as React from 'react';

import { ImageViewerErrorPayload } from '../../newgen/viewers/image';

export type Props = {
  src: string;
  onClose?: () => void;
  onLoad: () => void;
  onError: (error: ImageViewerErrorPayload) => void;
};

type State = 'error' | 'success';

let _state: State = 'error';

export const setState = (state: State) => {
  _state = state;
};

export class InteractiveImg extends React.Component<Props, {}> {
  componentDidMount() {
    if (_state === 'error') {
      this.props.onError({
        failReason: 'Interactive-img render failed',
      });
    } else {
      this.props.onLoad();
    }
  }

  render() {
    return <div>so empty</div>;
  }
}
