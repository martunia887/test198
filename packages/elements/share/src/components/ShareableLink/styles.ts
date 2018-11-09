import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';

export const ShareableLinkContainerStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  margin-bottom: 16px;
`;

export const ShareableLinkWrapperStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const ShareableLinkInputFieldWrapperStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  flex: 1 auto;
  margin-right: 15px;
`;
