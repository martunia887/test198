import { GlobalThemeTokens } from '../types';
import { createTheme } from '../utils/createTheme';

// Create default global light theme
export default createTheme<GlobalThemeTokens, any>(() => ({
  mode: 'light',
}));
