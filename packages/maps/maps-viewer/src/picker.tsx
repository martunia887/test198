import * as React from 'react';
import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import MapViewer from './viewer';
import { Geolocation } from '@atlaskit/maps-core';

type LocationPickerProps = {
  selected?: Geolocation;
  onSelected: (location: Geolocation) => void;
  onClose: () => void;
  isOpen: boolean;
};

const ModalSelect = (props: LocationPickerProps) => {
  const { onClose, selected: preSelected, onSelected } = props;
  const [selected, setSelected] = React.useState<Geolocation>();

  const onUpdate = (locations: Geolocation[]) => {
    if (locations.length > 0) {
      setSelected(locations[0]);
    } else {
      setSelected(undefined);
    }
  };

  const actions = [
    {
      text: 'Select',
      onClick: () => {
        selected && onSelected(selected);
      },
      isDisabled: !selected,
    },
    { text: 'Cancel', onClick: onClose },
  ];

  const modalProps = {
    height: '100%',
    width: '100%',
    actions,
    onClose,
    heading: ' ',
  };

  return (
    <Modal {...modalProps}>
      <MapViewer
        selected={preSelected}
        controls={{ geocoder: true }}
        onUpdate={onUpdate}
      />
    </Modal>
  );
};

export default (props: LocationPickerProps) => {
  const { isOpen } = props;
  return (
    <ModalTransition>{isOpen && <ModalSelect {...props} />}</ModalTransition>
  );
};
