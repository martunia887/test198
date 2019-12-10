import * as React from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import MapViewer, { MapViewerProps } from './viewer';

type MapModalProps = MapViewerProps & {
  onClose: () => void;
  isOpen: boolean;
};

export default (props: MapModalProps) => {
  const { onClose, isOpen } = props;
  const actions = [{ text: 'Close', onClick: onClose }];

  const modalProps = {
    height: '100%',
    width: '100%',
    actions,
    onClose,
    heading: ' ',
  };

  return (
    <ModalTransition>
      {isOpen && (
        <Modal {...modalProps}>
          <MapViewer {...props} />
        </Modal>
      )}
    </ModalTransition>
  );
};
