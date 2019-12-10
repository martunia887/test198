import mapboxgl, {
  Map as MapboxMap,
  Marker,
  MapboxOptions,
  LngLatBounds,
  LngLat,
  LngLatLike,
} from 'mapbox-gl';
import { DEFAULT_ZOOM, MAP_PADDING } from './deafult-options';

mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9zZS1udW5lei1hdGxhcyIsImEiOiJjazJ2NDc0bHQwMTZ3M2xwbThkNnBtaGhrIn0.HqY00u5U1a4juO9Md4lFMA';

export { MapboxMap, Marker };

export const initMap = (
  container: HTMLDivElement,
  markers: Marker[],
  selected?: Marker,
): Promise<MapboxMap> => {
  const mapOptions: MapboxOptions = {
    container,
    style: 'mapbox://styles/mapbox/streets-v9',
    attributionControl: false,
    // renderWorldCopies: false,
  };

  if (!selected) {
    var bounds = createBounds(markers.map(marker => marker.getLngLat()));
    mapOptions.bounds = bounds;
    mapOptions.fitBoundsOptions = { padding: MAP_PADDING };
  } else {
    // if(locations.indexOf(selected)===-1){
    //   console.log('dopes not exist')
    //   marker.addTo(map)
    // }
    mapOptions.zoom = DEFAULT_ZOOM;
    mapOptions.center = selected.getLngLat();
  }

  const map = new MapboxMap(mapOptions);
  return new Promise((resolve, reject) => {
    map.on('load', () => {
      addMarkersToMap(map, markers);
      resolve(map);
    });
  });
};

export const removeMap = (map: MapboxMap) => {
  map.remove();
};

const createBounds = (coordsSet: LngLatLike[]): LngLatBounds =>
  coordsSet.reduce(function(bounds, coords) {
    return bounds.extend(LngLat.convert(coords));
  }, new LngLatBounds(coordsSet[0], coordsSet[0]));

export const createMarker = (
  coords: LngLatLike,
  iconColor?: string,
): Marker => {
  const marker = new Marker(iconColor ? { color: iconColor } : {});
  marker.setLngLat(coords);
  return marker;
};

export function goToCoords(
  map: MapboxMap,
  coords: LngLatLike,
  zoom: number = DEFAULT_ZOOM,
) {
  map.easeTo({ center: coords, zoom });
}

export function centerAll(map: MapboxMap, coords: LngLatLike[]) {
  var bounds = createBounds(coords);
  map.fitBounds(bounds, { padding: MAP_PADDING });
}

export const addMarkersToMap = (map: MapboxMap, markers: Marker[]) => {
  markers.forEach(marker => marker.addTo(map));
};
