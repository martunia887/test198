import React from 'react';

import {
  Grid,
  LeftPanel,
  Banner,
  Nav,
  LeftSidebar,
  RightSidebar,
  RightPanel,
} from '../src';

const PageLayoutExample = () => {
  return (
    <Grid>
      <LeftPanel width="50px" isFixed>
        Left
      </LeftPanel>
      <Banner height="50px" isFixed>
        Banner
      </Banner>
      <Nav height="100px" isFixed>
        Nav bar here
      </Nav>
      <LeftSidebar width="80px" isFixed>
        Sidebar
      </LeftSidebar>
      <main css={{ gridArea: 'main' }}></main>
      <RightSidebar width="120px" isFixed>
        Sidebar
      </RightSidebar>
      <RightPanel width="90px" isFixed>
        Right
      </RightPanel>
    </Grid>
  );
};

export default PageLayoutExample;
