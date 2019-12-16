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
const showInMap = (
  mapHandler: MapHandler,
  newSelected: Geolocation,
  oldSelected?: Geolocation,
) => {
  if (oldSelected) {
    mapHandler.removeLocation(oldSelected);
  }
  if (newSelected) {
    // newSelected.onUpdate((loca: Geolocation)=>console.log('Actualizado',loca))
    mapHandler.addLocation(newSelected, { draggable: true });
    // mapHandler.setLocations([newSelected])
  }
};

export type GeocoderProps = {
  mapHandler: MapHandler;
  selected?: Geolocation;
};

const Geocoder = ({ mapHandler, selected: preSelected }: GeocoderProps) => {
  const [selected, setSelected] = React.useState<Geolocation | undefined>(
    preSelected,
  );
  console.log(`Habemus papam? ${preSelected && preSelected.title}`);
  return (
    <AsyncSelect
      styles={styles}
      className="async-select-with-callback"
      classNamePrefix="react-select"
      loadOptions={debouncedLoadOptions}
      value={preSelected && preSelected.title}
      // loadOptions={loadOptions}
      // defaultOptions
      // options={loadOptions}
      isClearable={true}
      placeholder="Search for a place"
      onChange={(selectedOption: any) => {
        const { value: selectedLocation } = selectedOption || {};
        showInMap(mapHandler, selectedLocation, selected);
        setSelected(selectedLocation);
      }}
    />
  );
};

export default Geocoder;
