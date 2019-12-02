/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { P200 } from '@atlaskit/theme/colors';
import TopNav from '../components/top-nav';
import cssReset from '@atlaskit/css-reset';
import { gridSize as gridSizeFn } from '@atlaskit/theme';

const gridSize = gridSizeFn();

const Layout = ({ children, SideNavContents = () => <div /> }) => (
  <div>
    <Global
      styles={css`
        ${cssReset}
      `}
    />
    <div
      css={{
        display: 'grid',
        grid: `${gridSize * 7}px 1fr 50px / 200px 1fr`,
        gridTemplateAreas: `"head head"
                        "nav main"
                        "nav foot"`,
      }}
    >
      <div
        css={{
          gridArea: 'head',
        }}
      >
        <TopNav />
      </div>
      <div
        css={{
          gridArea: 'nav',
          paddingTop: gridSize * 2,
        }}
      >
        <SideNavContents />
      </div>
      <div css={{ gridArea: 'main' }} children={children} />
      <div
        css={{
          gridArea: 'foot',
          backgroundColor: P200,
          height: '50px',
        }}
      />
    </div>
  </div>
);

export default Layout;
