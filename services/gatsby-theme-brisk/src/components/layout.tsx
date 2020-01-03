import React from 'react';
import { css, Global } from '@emotion/core';
import styled from '@emotion/styled';
import cssReset from '@atlaskit/css-reset';
import { N30 } from '@atlaskit/theme/src/colors';
import { MDXProvider } from '@mdx-js/react';
import PageTitle from './page-title';
import HeaderContent from './../content/header-content';
import SidebarContent from './../content/sidebar-content';
import FooterContent from './../content/footer-content';
import Typography from './typography';
import Example from './example';

const Grid = styled.div`
  display: grid;
  min-height: 100vh;
  position: relative;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 272px 1fr;
  grid-template-areas:
    'header header'
    'sidebar main'
    'sidebar footer';
`;

const Main = styled.main`
  grid-area: main;
`;

const Header = styled.div`
  grid-area: header;
  position: sticky;
  top: 0;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  border-right: 1px solid ${N30};
  overflow: auto;
  max-height: 100vh;
`;

const Footer = styled.footer`
  grid-area: footer;
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

  const shortcodes = {
    Example,
  };

  return (
    <>
      <MDXProvider components={shortcodes}>
        <Global
          styles={css`
            ${cssReset}
          `}
        />
        <Typography />
        <PageTitle title={props.title} />

        <Grid>
          <Header>
            <HeaderContent />
          </Header>

          <Sidebar>
            <SidebarComponent />
          </Sidebar>

          <Main>{props.children}</Main>

          <Footer>
            <FooterContent />
          </Footer>
        </Grid>
      </MDXProvider>
    </>
  );
};

export default Layout;
