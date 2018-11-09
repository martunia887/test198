import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';

export const ShareSelectAvatarItemWrapperStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.span`
  position: relative;
`;

export const ShareSelectAvatarItemStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.span`
  white-space: nowrap;
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 0.5em;
  color: rgb(66, 82, 110);
  background: rgb(223, 225, 230);
  padding: 2px 4px 3px;
  border-radius: 3px;
  text-transform: uppercase;
  vertical-align: baseline;
  line-height: 1;
`;

export const ShareSelectSkeletonStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  background: #5e6b7d;
  color: #fff;
  width: 32px;
  height: 32px;
  margin: 0 2px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 0;
  flex-shrink: 0;
`;
