import AkButton, { ButtonProps } from '../../../core/button/index';
import theme from './theme';
import * as React from 'react';

export { ButtonGroup, ButtonTheme } from '@atlaskit/button';

export default (props: ButtonProps) => <AkButton {...props} theme={theme} />;
