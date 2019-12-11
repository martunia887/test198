import React from 'react';
import { AsyncSelect } from '@atlaskit/select';
import { geocoder, Geolocation, MapHandler } from '@atlaskit/maps-core';
import debounce from 'lodash.debounce';

const styles = {
  container: () => ({
    width: 400,
  }),
};

const geolocationToSelectOption = (location: Geolocation) => ({
  label: location.title,
  value: location,
});

// async load function using callback (promises also supported)
const loadOptions = (inputValue: string, callback: (v: any) => void) => {
  geocoder.forwardGeocode(inputValue).then(locations => {
    const result = locations.map(geolocationToSelectOption);
    callback(result);
  });
};

const debouncedLoadOptions = debounce(loadOptions, 1000, {
  leading: false,
  trailing: true,
});

// There is a problem with ValueType definition
const showInMap = (mapHandler: MapHandler, selected: any) => {
  if (selected && selected.value instanceof Geolocation) {
    mapHandler.goTo(selected.value);
  }
};

const AsyncExample = ({ mapHandler }: { mapHandler: MapHandler }) => (
  <AsyncSelect
    styles={styles}
    className="async-select-with-callback"
    classNamePrefix="react-select"
    loadOptions={debouncedLoadOptions}
    // loadOptions={loadOptions}
    // defaultOptions
    // options={loadOptions}
    placeholder="Search for a place"
    onChange={(selected: any) => showInMap(mapHandler, selected)}
  />
);

export default AsyncExample;
