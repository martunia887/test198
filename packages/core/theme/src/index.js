// @flow

import getTheme from './utils/getTheme';
import themed from './utils/themed';
export {
  default as AtlaskitThemeProvider,
} from './components/AtlaskitThemeProvider';

export { default as Appearance } from './components/Appearance';

// backwards-compatible export with old Atlaskit case
export const AtlasKitThemeProvider = AtlaskitThemeProvider;

// New API
export type { ResetThemeProps, ResetThemeTokens } from './components/Reset';
export { ResetTheme, Reset } from './components/Reset';

export { default } from './components/Theme';
export { withTheme } from './hoc';

export type { ThemeProp } from './utils/createTheme';

export { createTheme } from './utils/createTheme';
