import { HTMLAttributes, ClassAttributes, ComponentClass } from 'react';
import styled from 'styled-components';
import { borderRadius } from '@atlaskit/theme';

import { scrollableMaxHeight } from '../../shared-styles';

export const ScrollableStyle: ComponentClass<HTMLAttributes<{}> & {
  innerRef?: any;
}> = styled.div`
  display: block;
  overflow-x: hidden;
  overflow-y: auto;

  padding: 4px 0;
  margin: 0;

  background: white;
  max-height: ${scrollableMaxHeight};

  border-radius: ${borderRadius()}px;
`;
