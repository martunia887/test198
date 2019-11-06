import themed from './utils/themed';

import {
  B100,
  B200,
  B300,
  B400,
  B50,
  B500,
  B75,
  DN200,
  DN30,
  DN300,
  DN50,
  DN600,
  DN70,
  G300,
  N0,
  N100,
  N20,
  N200,
  N30,
  N800,
  N900,
  P100,
  P300,
  R300,
  T200,
  T300,
  Y300,
} from './colors';

// Themed colors
export const background = themed({ light: N0, dark: DN30 });
export const backgroundActive = themed({ light: B50, dark: B75 });
export const backgroundHover = themed({ light: N30, dark: DN70 });
export const backgroundOnLayer = themed({ light: N0, dark: DN50 });
export const text = themed({ light: N900, dark: DN600 });
export const textHover = themed({ light: N800, dark: DN600 });
export const textActive = themed({ light: B400, dark: B400 });
export const subtleText = themed({ light: N200, dark: DN300 });
export const placeholderText = themed({ light: N100, dark: DN200 });
export const heading = themed({ light: N800, dark: DN600 });
export const subtleHeading = themed({ light: N200, dark: DN300 });
export const codeBlock = themed({ light: N20, dark: DN50 });
export const link = themed({ light: B400, dark: B100 });
export const linkHover = themed({ light: B300, dark: B200 });
export const linkActive = themed({ light: B500, dark: B100 });
export const linkOutline = themed({ light: B100, dark: B200 });
export const primary = themed({ light: B400, dark: B100 });
export const blue = themed({ light: B400, dark: B100 });
export const teal = themed({ light: T300, dark: T200 });
export const purple = themed({ light: P300, dark: P100 });
export const red = themed({ light: R300, dark: R300 });
export const yellow = themed({ light: Y300, dark: Y300 });
export const green = themed({ light: G300, dark: G300 });
