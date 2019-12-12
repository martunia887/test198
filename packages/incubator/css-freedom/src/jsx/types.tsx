/* eslint-disable @typescript-eslint/no-namespace */
import { CSSProperties } from 'react';

export type CSSProp = CSSProperties;

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp | { [key: string]: CSSProp };
  }
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      css?: CSSProp;
    }
  }
}
