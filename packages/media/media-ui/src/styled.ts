import styled from 'styled-components';

export const InfiniteScrollWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  max-height: 100%;
  -ms-overflow-style: scrollbar;
  padding-top: 10px;
`;
