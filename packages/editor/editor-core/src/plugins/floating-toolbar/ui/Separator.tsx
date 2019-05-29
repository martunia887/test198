import * as React from 'react';
import styled from 'styled-components';

import { N30 } from '@atlaskit/theme/colors';

const Separator = styled.div`
  background: ${N30};
  width: 1px;
  height: 20px;
  margin: 0 4px;
`;

export default () => <Separator className="separator" />;
