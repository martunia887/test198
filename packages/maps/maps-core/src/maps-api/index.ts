import * as mapbox from './mapbox';
import { MapboxMap, Marker } from './mapbox';
import { Geolocation } from '../';

let locationsMarkers: Map<Geolocation, Marker>;
let mapPromise: Promise<MapboxMap> | undefined;
let map: MapboxMap | undefined;

export const openMap = async (
  container: HTMLDivElement,
  locations?: Geolocation[],
  selected?: Geolocation,
) => {
  locationsMarkers = createLocationsMarkers(locations || []);
  const allMarkers = getMarkers(locationsMarkers);
  mapPromise = mapbox.initMap(
    container,
    allMarkers,
    selected && locationsMarkers.get(selected),
  );
  map = await mapPromise;
};

export const removeMap = async () => {
  if (mapPromise) {
    const returnedMap = await mapPromise;
    mapbox.removeMap(returnedMap);
    map = undefined;
    mapPromise = undefined;
  }
};

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

export const goTo = async (location: Geolocation) => {
  if (!map) return;
  mapbox.goToCoords(map, location.coords);
};

export const centerAll = async () => {
  if (!map) return;
  mapbox.centerAll(map, getCoordsSet(locationsMarkers));
};
