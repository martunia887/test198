import * as React from 'react';

const MainLayout: React.SFC = ({ children }) => (
  <div
    style={{
      margin: `0 auto`,
    }}
  >
    {children}
  </div>
);

export default MainLayout;
