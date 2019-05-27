import { CSSObject } from '@emotion/css';

export const getStyles = (): { [key: string]: CSSObject } => ({
  badgePositioner: {
    position: 'absolute',
    top: '-4px',
    right: '-8px',
  },
});
