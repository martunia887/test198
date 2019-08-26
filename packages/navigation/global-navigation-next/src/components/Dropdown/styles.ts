import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { CSSObject } from '@emotion/core';
// import styled from '@emotion/styled';

// export const ChevronWrapper = styled.div`
//   visibility: hidden;
// `;
// export const Outer = styled.div`
//   ${ChevronWrapper} {
//     ':hover,:focus': {
//       visibility: visible;
//     }
//   }
// `;

const gridSize = gridSizeFn();

export default (): { outer: CSSObject; chevronWrapper: CSSObject } => ({
  chevronWrapper: {
    marginRight: `-${gridSize}px`,
    visibility: 'hidden',
  },
  outer: {
    ':hover,:focus': {
      '> div:last-child': {
        visibility: 'visible',
      },
    },
  },
});
