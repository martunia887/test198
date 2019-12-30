import React from 'react';
import { css, jsx, Global } from '@emotion/core';
import styled from '@emotion/styled';
import cssReset from '@atlaskit/css-reset';
import PageTitle from './page-title';
import HeaderContent from './../content/header-content';
import SidebarContent from './../content/sidebar-content';

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

const Header = styled(HeaderContent)`
  grid-area: header;
  background-color: yellow;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
`;

const Footer = styled.footer`
  grid-area: footer;
  background-color: pink;
`;

type Props = {
  Sidebar?: React.Component;
  title?: string;
  children: any;
};

const Layout = (props: Props) => {
  let SidebarComponent;

  if (props.Sidebar) {
    SidebarComponent = props.Sidebar;
  } else {
    SidebarComponent = SidebarContent;
  }

  return (
    <>
      <Global
        styles={css`
          ${cssReset}
        `}
      />
      <Grid>
        <PageTitle title={props.title} />
        <Header />
        <Sidebar>
          <SidebarComponent />
        </Sidebar>
        <Main>{props.children}</Main>
        <Footer />
      </Grid>
    </>
  );
};

export default Layout;
