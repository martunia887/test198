import { Geolocation } from '.';

const locations: Geolocation[] = [];

export default {
  register: (location: Geolocation) => {
    locations.push(location);
  },
  unRegister: (location: Geolocation) => {
    const locationIndex = locations.indexOf(location);
    if (locationIndex > -1) {
      locations.splice(locationIndex, 1);
    }
  },
  getLocations: () => locations,
};
