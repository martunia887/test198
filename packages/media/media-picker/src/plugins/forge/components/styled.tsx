import styled from 'styled-components';
export const PluginWrapper = styled.div`
  overflow: auto;
`;
export const PluginHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px;

  label {
    display: none;
  }

  > div {
    flex: initial;
  }
`;
export const PluginIcon = styled.img`
  height: 24px;
  width: 24px;
`;

export const PluginContentContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding: 0 28px;
`;
