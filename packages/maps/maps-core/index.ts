export { default as locationsManager } from './locations-manager';
export * from './maps-api';
export * from './util';

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
};

export class Geolocation {
  coords: Coords;
  name?: string;
  address?: string;
  iconColor?: string;

  constructor(options: GeolocationOptions) {
    const { name, address, coords, iconColor } = options;
    this.name = name;
    this.address = address;
    this.coords = coords;
    this.iconColor = iconColor || getRandomColor();
  }

  get title() {
    const { name, address, coords } = this;
    const formatedTitleCoords = `${round(coords.lat)}, ${round(coords.lng)}`;
    return name || address || formatedTitleCoords;
  }
}
