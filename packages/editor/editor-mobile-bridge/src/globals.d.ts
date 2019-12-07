import { BridgedWindow } from './types';

declare global {
  interface Window extends BridgedWindow {}
}
