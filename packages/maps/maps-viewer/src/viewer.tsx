import * as React from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css'; // THIS SHOULD BE DYNAMICALLY LOADED
import { Geolocation, openMap, removeMap } from '@atlaskit/maps-core';
// import LocationList from './custom-controls/location-list';
import Geocoder from './custom-controls/geocoder';

export type MapViewerProps = Readonly<{
  selected?: Geolocation;
  locations?: Geolocation[];
}>;

export type State = {
  selected: Geolocation;
};

export default class MapViewer extends React.Component<MapViewerProps> {
  mapContainer: HTMLDivElement | null = null;

  componentDidMount() {
    const { selected } = this.props;
    if (this.mapContainer) {
      openMap(this.mapContainer, this.normalisedLocations(), selected);
    }
  }

  componentWillUnmount() {
    removeMap();
  }

  normalisedLocations() {
    const { locations = [], selected } = this.props;
    if (selected && locations.indexOf(selected) === -1) {
      return [...locations, selected];
    } else return locations;
  }

  render() {
    const style = {
      height: '100%',
      width: '100%',
    };
    const parentStyle: React.CSSProperties = {
      position: 'relative',
      height: '100%',
      width: '100%',
      minHeight: '200px',
    };

    const floatStyle: React.CSSProperties = {
      position: 'absolute',
      top: '20px',
      left: '20px',
      // padding:'20px',
      backgroundColor: 'white',
    };

    return (
      <div style={parentStyle}>
        {/* THIS CODE HAS TO BE IMPORTED FROM Map Core */}
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <div style={style} ref={el => (this.mapContainer = el)} />
        <div style={floatStyle}>
          {/* <LocationList locations={this.normalisedLocations()} /> */}
          <Geocoder />
        </div>
      </div>
    );
  }
}
