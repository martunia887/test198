import * as mapbox from './mapbox';
import { MapboxMap, Marker, MarkerOptions } from './mapbox';
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

const locationToMarker = (
  location: Geolocation,
  options?: MarkerOptions,
): Marker => {
  const { iconColor, coords } = location;
  const newMarker = mapbox.createMarker(coords, {
    color: iconColor,
    ...options,
  });
  if (options && options.draggable) {
    mapbox.onMarkerDragEnd(newMarker, coords => {
      location.coords = coords;
    });
  }
  return newMarker;
};

const normaliseLocations = (
  locations: Geolocation[] = [],
  selected?: Geolocation,
) => {
  if (selected && locations.indexOf(selected) === -1) {
    return [selected, ...locations];
  } else return locations;
};

export type AddLocationOptions = {
  draggable?: boolean;
  goto?: boolean;
};

export type GeolocationsUpdatedCallback = (
  locations?: Geolocation[],
  selected?: Geolocation,
) => void;

export class MapHandler {
  private mapPromise: Promise<MapboxMap> | undefined;
  private map: MapboxMap | undefined;
  private locationsMarkers: Map<Geolocation, Marker> = new Map();
  private selected: Geolocation;
  private onUpdateCallbacks: GeolocationsUpdatedCallback[] = [];

  public constructor(
    container: HTMLDivElement,
    locations?: Geolocation[],
    selected?: Geolocation,
    selectedOptions?: AddLocationOptions,
  ) {
    this.openMap(container, locations, selected, selectedOptions);
  }

  public openMap = async (
    container: HTMLDivElement,
    locations?: Geolocation[],
    selected?: Geolocation,
    selectedOptions?: AddLocationOptions,
  ) => {
    await this.closeMap();
    this.updateMarkers(locations, selected);
    if (selected && selectedOptions && selectedOptions.draggable) {
      this.setDraggable(selected, selectedOptions.draggable);
    }
    const allMarkers = getMarkers(this.locationsMarkers);
    this.mapPromise = mapbox.initMap(
      container,
      allMarkers,
      selected && this.locationsMarkers.get(selected),
    );
    this.map = await this.mapPromise;
  };

  public closeMap = async () => {
    if (this.mapPromise) {
      const returnedMap = await this.mapPromise;
      mapbox.removeMap(returnedMap);
      this.map = undefined;
      this.mapPromise = undefined;
    }
  };

  private updateMarkers = (
    locations: Geolocation[] = [],
    selected?: Geolocation,
  ) => {
    const normLocations = normaliseLocations(locations, selected);
    this.locationsMarkers = createLocationsMarkers(normLocations);
  };

  private _setLocations = (
    locations: Geolocation[] = [],
    selected?: Geolocation,
    goto?: boolean,
  ) => {
    if (!this.map) return;
    mapbox.removeMarkers(getMarkers(this.locationsMarkers));
    this.updateMarkers(locations, selected);
    mapbox.addMarkers(this.map, getMarkers(this.locationsMarkers));
    if (goto) {
      if (selected) {
        this.goTo(selected);
      } else if (locations.length === 1) {
        this.goTo(getGeolocations(this.locationsMarkers)[0]);
      }
    }
    this.notifyUpdate();
  };

  public setLocations = (
    locations: Geolocation[] = [],
    selected?: Geolocation,
  ) => {
    this._setLocations(locations, selected, true);
  };

  public addLocation = (
    location: Geolocation,
    { goto = true, draggable = false }: AddLocationOptions,
  ) => {
    if (!this.map) return;
    if (!this.locationsMarkers.get(location)) {
      const newMarker = locationToMarker(location, { draggable });
      this.locationsMarkers.set(location, newMarker);
      mapbox.addMarkers(this.map, [newMarker]);
      this.notifyUpdate();
    }
    if (goto) {
      this.goTo(location);
    }
  };

  public removeLocation = (location: Geolocation) => {
    if (!this.map) return;
    const toRemove = this.locationsMarkers.get(location);
    if (toRemove) {
      this.locationsMarkers.delete(location);
      mapbox.removeMarkers([toRemove]);
      this.notifyUpdate();
    }
  };

  public getLocations = () => getGeolocations(this.locationsMarkers);

  public goTo = async (location: Geolocation) => {
    if (!this.map) return;
    mapbox.goToCoords(this.map, location.coords);
  };

  public centerAll = async () => {
    if (!this.map) return;
    mapbox.centerAll(this.map, getCoordsSet(this.locationsMarkers));
  };

  public onUpdate(callback: GeolocationsUpdatedCallback) {
    if (!this.onUpdateCallbacks.includes(callback)) {
      this.onUpdateCallbacks.push(callback);
    }
  }
  public offUpdate(callback: GeolocationsUpdatedCallback) {
    const index = this.onUpdateCallbacks.indexOf(callback);
    if (index > 0) {
      this.onUpdateCallbacks.splice(index, 1);
    }
  }

  private notifyUpdate() {
    this.onUpdateCallbacks.forEach(callback => {
      callback(getGeolocations(this.locationsMarkers));
    });
  }

  public setDraggable = (location: Geolocation, draggable: boolean) => {
    const marker = this.locationsMarkers.get(location);
    if (marker) {
      marker.setDraggable(draggable);
    }
  };
}
