import * as React from 'react';
import styled from 'styled-components';

const Separator = styled.div`
  background: hotpink;
  width: 1px;
  height: 20px;
  margin: 0 4px;
`;

export default () => <Separator className="separator" />;
