import React from 'react';
import { PureComponent } from 'react';
import LocationCard from '@atlaskit/location-card';
import { Geolocation, GeolocationOptions } from '@atlaskit/maps-core';

export default class InlineLocation extends PureComponent<
  GeolocationOptions,
  {}
> {
  render() {
    return <LocationCard location={new Geolocation(this.props)} />;
  }
}
