import React from 'react';
import styled from '@emotion/styled';

const Nav = styled.div`
  margin-bottom: 16px;
  & > & {
    margin-bottom: 0;
  }
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const NavSection = props => <Nav isOpen={props.isOpen || true} {...props} />;

export default NavSection;
