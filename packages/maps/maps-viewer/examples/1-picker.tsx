import * as React from 'react';
import Button from '@atlaskit/button';
import LocationPicker from '../src/picker';
import { Geolocation } from '@atlaskit/maps-core';

export default () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const onSelected = (location: Geolocation) => {
    console.log('Selected', location);
    close();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Button onClick={open} appearance={'primary'}>
        Open Picker
      </Button>
      <LocationPicker isOpen={isOpen} onClose={close} onSelected={onSelected} />
    </div>
  );
};
