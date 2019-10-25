import styled from 'styled-components';

export const Section = styled.div`
  padding: 25px 50px;
`;

export const Header = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  font-weight: bold;
  small {
    display: block;
    margin-top: 0;
  }
  p {
    font-weight: normal;
    font-size: 12px;
    color: grey;
  }
`;

export const Container = styled.div`
  position: relative;
  height: 300px;
  border: 1px solid grey;
`;
