import * as React from 'react';
import Modal from '@atlaskit/modal-dialog';
import MapViewer, { MapViewerProps } from './viewer';

type MapModalProps = MapViewerProps & {
  onClose: Function;
};

export default class ExampleBasic extends React.PureComponent<
  MapModalProps,
  {}
> {
  render() {
    const { onClose } = this.props;
    const actions = [{ text: 'Close', onClick: onClose }];

    const modalProps = {
      height: '100%',
      width: '100%',
      actions,
      onClose,
      heading: ' ',
    };

    return (
      <Modal {...modalProps}>
        <MapViewer {...this.props} />
      </Modal>
    );
  }
}
