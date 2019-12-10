import { Location, Coords } from '../types';

export const equalCoords = (cA: Coords, cB: Coords) =>
  cA.lat === cB.lat && cA.lng === cB.lng;

export const equalLocations = (lA: Location, lB: Location) =>
  lA.name === lB.name &&
  lA.address === lB.address &&
  equalCoords(lA.coords, lB.coords);
