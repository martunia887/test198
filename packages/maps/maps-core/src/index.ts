export { default as locationsManager } from './locations-manager';
export { default as MapHandler } from './maps-api';
export * from './util';
export * from './services';

export interface Coords {
  lat: number;
  lng: number;
}

const round = (num: number, decimals: number = 2) =>
  Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

const getRandomColor = () =>
  '#' + Math.floor(Math.random() * 16777215).toString(16);

export type GeolocationOptions = {
  name?: string;
  address?: string;
  coords: Coords;
  iconColor?: string;
  onDataUpdate?: (location: Geolocation) => void;
};

export class Geolocation {
  private _coords: Coords;
  private _name?: string;
  private _address?: string;
  private _iconColor?: string;
  public onDataUpdate?: (location: Geolocation) => void;

  constructor(options: GeolocationOptions) {
    const { name, address, coords, iconColor, onDataUpdate } = options;
    this._name = name;
    this._address = address;
    this._coords = coords;
    this._iconColor = iconColor || getRandomColor();
    this.onDataUpdate = onDataUpdate;
  }

  get title() {
    const { name, address, coords } = this;
    const formatedTitleCoords = `${round(coords.lat)}, ${round(coords.lng)}`;
    return name || address || formatedTitleCoords;
  }

  set coords(coords: Coords) {
    this._coords = coords;
    if (this.onDataUpdate) {
      this.onDataUpdate(this);
    }
  }
  get coords() {
    return this._coords;
  }

  set name(name: string | undefined) {
    this._name = name;
    if (this.onDataUpdate) {
      this.onDataUpdate(this);
    }
  }
  get name() {
    return this._name;
  }

  set address(address: string | undefined) {
    this._address = address;
    if (this.onDataUpdate) {
      this.onDataUpdate(this);
    }
  }
  get address() {
    return this._address;
  }

  set iconColor(iconColor: string | undefined) {
    this._iconColor = iconColor;
    if (this.onDataUpdate) {
      this.onDataUpdate(this);
    }
  }
  get iconColor() {
    return this._iconColor;
  }
}
