import * as mapbox from './mapbox';
import { MapboxMap, Marker } from './mapbox';
import { Geolocation } from '../';

const getMarkers = (locationsMap: Map<Geolocation, Marker>) =>
  Array.from(locationsMap.values());
const getGeolocations = (locationsMap: Map<Geolocation, Marker>) =>
  Array.from(locationsMap.keys());
const getCoordsSet = (locationsMap: Map<Geolocation, Marker>) =>
  getGeolocations(locationsMap).map(geolocation => geolocation.coords);

const createLocationsMarkers = (
  locations: Geolocation[],
): Map<Geolocation, Marker> => {
  const result = new Map<Geolocation, Marker>();
  locations.forEach(location => {
    const marker = locationToMarker(location);
    result.set(location, marker);
  });
  return result;
};

const locationToMarker = (location: Geolocation): Marker => {
  const { iconColor, coords } = location;
  return mapbox.createMarker(coords, iconColor);
};

export default class {
  mapPromise: Promise<MapboxMap> | undefined;
  map: MapboxMap | undefined;
  locationsMarkers: Map<Geolocation, Marker> = new Map();

  constructor(
    container: HTMLDivElement,
    locations?: Geolocation[],
    selected?: Geolocation,
  ) {
    this.openMap(container, locations, selected);
  }

  openMap = async (
    container: HTMLDivElement,
    locations?: Geolocation[],
    selected?: Geolocation,
  ) => {
    await this.closeMap();
    this.locationsMarkers = createLocationsMarkers(locations || []);
    const allMarkers = getMarkers(this.locationsMarkers);
    this.mapPromise = mapbox.initMap(
      container,
      allMarkers,
      selected && this.locationsMarkers.get(selected),
    );
    this.map = await this.mapPromise;
  };

  closeMap = async () => {
    if (this.mapPromise) {
      const returnedMap = await this.mapPromise;
      mapbox.removeMap(returnedMap);
      this.map = undefined;
      this.mapPromise = undefined;
    }
  };

  getLocations = () => getGeolocations(this.locationsMarkers);

  goTo = async (location: Geolocation) => {
    if (!this.map) return;
    mapbox.goToCoords(this.map, location.coords);
  };

  centerAll = async () => {
    if (!this.map) return;
    mapbox.centerAll(this.map, getCoordsSet(this.locationsMarkers));
  };
}
