import * as React from 'react';
import { Geolocation } from '@atlaskit/maps-core';
import Button from '@atlaskit/button';
import MapModal from '../src/modal';

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

interface State {
  isOpen: boolean;
}
export default class ExampleBasic extends React.PureComponent<{}, State> {
  state: State = { isOpen: true };

  open = () => this.setState({ isOpen: true });

  close = () => {
    this.setState({ isOpen: false });
  };

  secondaryAction = ({ target }: any) => console.log(target.innerText);

  render() {
    const { isOpen } = this.state;
    const geolocations = locations.map(location => new Geolocation(location));
    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>
        <MapModal
          isOpen={isOpen}
          onClose={this.close}
          locations={geolocations}
        />
      </div>
    );
  }
}
