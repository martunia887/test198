import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {
  Geolocation,
  openMap,
  removeMap,
  locationsManager,
} from '@atlaskit/maps-core';
import LocationList from './custom-controls/location-list';

export type MapViewerProps = Readonly<{
  selected?: Geolocation;
  locations?: Geolocation[];
}>;

export type State = {
  selected: Geolocation;
};

export default class MapViewer extends React.Component<MapViewerProps> {
  mapContainer: HTMLDivElement;

  componentDidMount() {
    const allLocations = locationsManager.getLocations();
    const { locations = allLocations, selected } = this.props;
    openMap(this.mapContainer, locations, selected);
  }

  componentWillUnmount() {
    removeMap();
  }

  render() {
    const { locations } = this.props;
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
      maxWidth: '50%',
    };

    return (
      <div style={parentStyle}>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <div style={style} ref={el => (this.mapContainer = el)} />
        <div style={floatStyle}>
          <LocationList locations={locations} />
        </div>
      </div>
    );
  }
}
