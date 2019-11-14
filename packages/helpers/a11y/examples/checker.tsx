import React from 'react';
import { createA11yOverlay } from '../src';

const A11yOverlay = createA11yOverlay(React);

const App = () => {
  const [isValid, setValidity] = React.useState(true);
  const props = isValid ? { alt: '' } : {};

  return (
    <div>
      <img width="100px" height="100px" {...props} />
      <img width="100px" height="100px" {...props} />
      <img width="100px" height="100px" {...props} />
      <img width="100px" height="100px" alt="" />

      <div>
        <img width="100px" height="100px" />
      </div>

      <button onClick={() => setValidity(valid => !valid)}>
        {isValid ? 'break' : 'fix'}
      </button>
    </div>
  );
};

export default () => {
  return (
    <A11yOverlay>
      <App />
    </A11yOverlay>
  );
};
