import React from 'react';
import { css, jsx, Global } from '@emotion/core';
import styled from '@emotion/styled';
import cssReset from '@atlaskit/css-reset';
import HeaderContent from '../content/header-content';

const Grid = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr 50px;
  grid-template-columns: 320px 1fr;
  grid-template-areas:
    'header header'
    'sidebar main'
    'sidebar footer';
`;

const Main = styled.main`
  grid-area: main;
  background-color: blue;
`;

const Header = styled.header`
  grid-area: header;
  background-color: yellow;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: purple;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: pink;
`;

const Layout = (props: any) => (
  <>
    <Global
      styles={css`
        ${cssReset}
      `}
    />
    <Grid>
      <Header>
        <HeaderContent />
      </Header>
      <Sidebar />
      <Main>{props.children}</Main>
      <Footer />
    </Grid>
  </>
);

export default Layout;
