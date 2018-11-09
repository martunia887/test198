import styled from 'styled-components';
import { HTMLAttributes, ComponentClass } from 'react';

export const ShareModalContainerStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding-top: 23px;
  margin-bottom: 13px;
`;

export const ShareModalFormColumnStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  flex: 1 auto;
  width: 100%;
`;

export const ShareModalHRStyle: ComponentClass<HTMLAttributes<{}>> = styled.hr`
  margin-top: 12px;
`;

export const ShareModalDividerStyle: ComponentClass<
  HTMLAttributes<{}>
> = styled.div`
  position: relative;
  text-align: center;
  height: 0px;

  > span {
    padding: 0 10px;
    position: relative;
    top: -18px;
    background-color: #ffffff;
    font-size: 12px;
    font-weight: bold;
    color: #707070;
  }
`;

export const ShareModalTitleStyle: ComponentClass<
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

export const ShareTypeStyle: ComponentClass<HTMLAttributes<{}>> = styled.span`
  text-transform: capitalize;
`;
