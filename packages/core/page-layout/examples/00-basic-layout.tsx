import React from 'react';

import { Grid, LeftPanel, Banner, Nav, LeftSideBar, RightPanel } from '../src';

const PageLayoutExample = () => {
  return (
    <Grid>
      <LeftPanel width={200} isFixed>
        Left
      </LeftPanel>
      <Banner height={50} isFixed>
        Banner
      </Banner>
      <Nav height={100} isFixed>
        Nav bar here
      </Nav>
      <LeftSideBar width={200}>Sidebar</LeftSideBar>
      <main css={{ gridArea: 'main' }}>Lorem Ipsum</main>
      <RightPanel width={200} isFixed>
        Right
      </RightPanel>
    </Grid>
  );
};

export default PageLayoutExample;
