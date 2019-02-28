// @flow
import { css } from '@emotion/core';
import baseStyles from './base';
import browserFixesStyles from './browser-fixes';
import resetStyles from './reset';
import tableStyles from './tables';
import utilStyles from './utils';

export default css`
${resetStyles}
${baseStyles}
${tableStyles}
${browserFixesStyles}
${utilStyles}
`.styles;
