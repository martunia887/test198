import * as React from 'react';
import Button from '@atlaskit/button';
import LocationPicker from '../src/picker';
import { Geolocation } from '@atlaskit/maps-core';
import Wrapper from './utils/wrapper';

const DisplaySelected = ({
  selected,
}: {
  selected: Geolocation | undefined;
}) => {
  const selectedSyle = { marginTop: 50 };
  return (
    <div style={selectedSyle}>
      {selected ? `Selected: ${selected.title}` : `Nothing selected`}
    </div>
  );
};

export default () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Geolocation>();

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const onSelected = (location: Geolocation) => {
    setSelected(location);
    close();
  };

  return (
    <Wrapper>
      <Button onClick={open} appearance={'primary'}>
        Open Picker
      </Button>
      <DisplaySelected selected={selected} />
      <LocationPicker isOpen={isOpen} onClose={close} onSelected={onSelected} />
    </Wrapper>
  );
};
