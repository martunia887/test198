import mapboxgl, {
  Map as MapboxMap,
  Marker,
  MapboxOptions,
  LngLatBounds,
  LngLat,
  LngLatLike,
  MarkerOptions,
} from 'mapbox-gl';
import { DEFAULT_ZOOM, MAP_PADDING } from './deafult-options';

mapboxgl.accessToken =
  'pk.eyJ1Ijoiam9zZS1udW5lei1hdGxhcyIsImEiOiJjazJ2NDc0bHQwMTZ3M2xwbThkNnBtaGhrIn0.HqY00u5U1a4juO9Md4lFMA';

export { MapboxMap, Marker, MarkerOptions };

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
    if (bounds) {
      mapOptions.bounds = bounds;
      mapOptions.fitBoundsOptions = { padding: MAP_PADDING };
    } else {
      mapOptions.center = [0, 0];
    }
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
      addMarkers(map, markers);
      resolve(map);
    });
  });
};

export const removeMap = (map: MapboxMap) => {
  map.remove();
};

const createBounds = (coordsSet: LngLatLike[]): LngLatBounds | void => {
  if (coordsSet.length > 0) {
    return coordsSet.reduce(function(bounds, coords) {
      return bounds.extend(LngLat.convert(coords));
    }, new LngLatBounds(coordsSet[0], coordsSet[0]));
  }
};

export const createMarker = (
  coords: LngLatLike,
  options: MarkerOptions,
): Marker => {
  const marker = new Marker(options);
  marker.setLngLat(coords);
  return marker;
};

export function goToCoords(
  map: MapboxMap,
  coords: LngLatLike,
  setZoom?: number,
) {
  const currentZoom = map.getZoom();
  const useZoom = setZoom
    ? setZoom
    : currentZoom > DEFAULT_ZOOM
    ? currentZoom
    : DEFAULT_ZOOM;
  map.easeTo({ center: coords, zoom: useZoom });
}

export function centerAll(map: MapboxMap, coords: LngLatLike[]) {
  var bounds = createBounds(coords);
  if (bounds) {
    map.fitBounds(bounds, { padding: MAP_PADDING });
  }
}

export const addMarkers = (map: MapboxMap, markers: Marker[]) => {
  markers.forEach(marker => marker.addTo(map));
};

export const removeMarkers = (markers: Marker[]) => {
  markers.forEach(marker => marker.remove());
};
