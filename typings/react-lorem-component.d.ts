declare module 'react-lorem-component' {
  import React from 'react';
  export interface LoremProps {
    count: number | string;
  }

  class Lorem extends React.Component<LoremProps> {}
  export default Lorem;
}
