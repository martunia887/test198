import Example from '/Users/bconolly/Development/atlaskit/packages/core/comment/examples/01-example-comment';
import css from '@atlaskit/css-reset';
import { injectGlobal } from 'styled-components';

const GlobalStyle = injectGlobal`${css}`;

export default () => (
  <div>
    <Example />
  </div>
);
