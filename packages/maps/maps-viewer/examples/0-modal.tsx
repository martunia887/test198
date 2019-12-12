import * as React from 'react';
import { Geolocation } from '@atlaskit/maps-core';
import Button from '@atlaskit/button';
import MapModal from '../src/modal';
import Wrapper from './utils/wrapper';

const locations = [
  {
    address: '363 George St',
    coords: { lat: -33.867143, lng: 151.204669 },
  },
  {
    name: 'Centennial Park',
    address: '15 Locked Bag, Paddington NSW 2021',
    coords: { lat: -33.9020303, lng: 151.2011865 },
  },
  {
    name: 'The University of Sydney',
    address: 'Camperdown NSW 2006',
    coords: { lat: -33.9070126, lng: 151.1794423 },
  },
  {
    name: 'Lentil As Anything',
    address: '391 King St, Newtown NSW 2042',
    coords: { lat: -33.8995546, lng: 151.1768051 },
  },
  {
    coords: { lat: -33.9191157, lng: 151.2608155 },
  },
];

export default () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const geolocations = locations.map(location => new Geolocation(location));

  return (
    <Wrapper>
      <Button onClick={open} appearance={'primary'}>
        Open Modal
      </Button>
      <MapModal isOpen={isOpen} onClose={close} locations={geolocations} />
    </Wrapper>
  );
};
