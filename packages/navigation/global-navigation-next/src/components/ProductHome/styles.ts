import { css } from "@emotion/core";
import { PRODUCT_HOME_BREAKPOINT } from '../../common/constants';

export const productIconStyles = css`
  @media (min-width: ${PRODUCT_HOME_BREAKPOINT}px) {
    display: none;
  }
`;

export const productWordmarkStyles = css`
  @media (max-width: ${PRODUCT_HOME_BREAKPOINT - 1}px) {
    display: none;
  }
`;
