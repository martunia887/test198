import styled from 'styled-components';
export const PluginWrapper = styled.div`
  overflow: auto;
`;
export const PluginHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;

  label {
    display: none;
  }

  > div {
    flex: initial;
  }
`;
