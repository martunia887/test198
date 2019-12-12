import * as React from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css'; // THIS SHOULD BE DYNAMICALLY LOADED
import {
  Geolocation,
  MapHandler,
  GeolocationsUpdatedCallback,
} from '@atlaskit/maps-core';
import LocationList from './custom-controls/location-list';
import Geocoder from './custom-controls/geocoder';

export type MapViewerProps = Readonly<{
  selected?: Geolocation;
  locations?: Geolocation[];
  onUpdate?: GeolocationsUpdatedCallback;
  controls?: {
    list?: boolean;
    geocoder?: boolean;
  };
}>;

export type State = {
  selected: Geolocation;
};

export default class MapViewer extends React.Component<MapViewerProps> {
  mapContainer: HTMLDivElement | null = null;
  mapHandler?: MapHandler;

  componentDidMount() {
    const { locations, selected, onUpdate } = this.props;
    if (this.mapContainer) {
      this.mapHandler = new MapHandler(this.mapContainer, locations, selected);
      if (onUpdate) {
        this.mapHandler.onUpdate(onUpdate);
      }
    }
  }

  // THIS IS VERY IMPORTANT!!!!
  componentWillUnmount() {
    if (this.mapHandler) {
      this.mapHandler.closeMap();
    }
  }

  render() {
    const { controls = {} } = this.props;
    const { list, geocoder } = controls;
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
          {list && this.mapHandler && (
            <LocationList mapHandler={this.mapHandler} />
          )}
          {geocoder && this.mapHandler && (
            <Geocoder mapHandler={this.mapHandler} />
          )}
        </div>
      </div>
    );
  }
}
