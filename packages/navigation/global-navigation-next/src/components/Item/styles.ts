import { ItemProps } from './types';
import { colors, fontSizeSmall, gridSize as gridSizeFn } from '@atlaskit/theme';

const gridSize = gridSizeFn();

const baseStyles = {
  background: 'none',
  border: 'none',
  borderRadius: 3,
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover,:focus': {
    backgroundColor: colors.B400,
  },
};

export const getStyles = (props: ItemProps) => ({
  itemBase: {
    primary: {
      ...baseStyles,
      alignItems: 'center',
      display: 'flex',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      fontSize: fontSizeSmall(),
      position: 'relative',
      height: gridSize * 3,
      lineHeight: 1,
      userSelect: 'none',
      color: colors.N0,
      margin: `20px 0`,
      marginRight: props.dropdownContent ? gridSize * 1.5 : gridSize * 3,
      padding: `0 ${gridSize}px`,
    },
    secondary: {
      ...baseStyles,
      color: colors.B50,
      height: gridSize * 4,
      padding: gridSize / 2,
    },
  },
  contentWrapper: {},
});
