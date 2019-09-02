import { colors } from '@atlaskit/theme';
import createTheme from '@marduke182/spectacle/lib/themes/default';

export const atlassianTheme = createTheme(
  {
    primary: '#fff',
    secondary: colors.N800,
    tertiary: colors.N800,
    quaternary: colors.N800,
  },
  {
    primary: 'Charlie_Display_Regular',
    secondary: {
      name: 'Droid Serif',
      googleFont: true,
      styles: ['400', '700i'],
    },
  },
);
