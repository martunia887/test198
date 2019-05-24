import { PrimaryItemProps } from './types';
import { colors, fontSizeSmall, gridSize as gridSizeFn } from '@atlaskit/theme';

const gridSize = gridSizeFn();

export const getStyles = (props: PrimaryItemProps) => ({
  itemBase: {
    alignItems: 'center',
    background: 'none',
    border: 'none',
    fontWeight: 'bold',
    color: colors.N0,
    textTransform: 'uppercase',
    fontSize: fontSizeSmall(),
    position: 'relative',
    margin: `20px 0`,
    marginRight: props.dropdownContent ? gridSize * 1.5 : gridSize * 3,
    height: gridSize * 3,
    lineHeight: 1,
    padding: `0 ${gridSize}px`,
    userSelect: 'none',
    borderRadius: 3,
    display: 'flex',
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover,:focus': {
      backgroundColor: colors.B400,
    },
  },
  contentWrapper: {},
});
