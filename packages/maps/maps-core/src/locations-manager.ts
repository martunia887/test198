import { Geolocation } from '.';

const maps = new Map<string, Geolocation[]>();

export default {
  register: (location: Geolocation, mapName: string) => {
    const map = maps.get(mapName);
    if (!map) {
      maps.set(mapName, [location]);
    } else {
      map.push(location);
    }
  },
  unRegister: (location: Geolocation, mapName: string) => {
    const map = maps.get(mapName);
    if (map) {
      const locationIndex = map.indexOf(location);
      if (locationIndex > -1) {
        map.splice(locationIndex, 1);
      }
    }
  },
  getLocations: (mapName: string) => maps.get(mapName) || [],
};
