/** @jsx jsx */
import { css, jsx, Global } from '@emotion/core';
import { P200 } from '@atlaskit/theme/colors';
import TopNav from '../components/top-nav';
import cssReset from '@atlaskit/css-reset';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import { N30 } from '@atlaskit/theme/colors';

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
        minHeight: '100vh',
        grid: `${gridSize * 7}px 1fr 50px / ${gridSize * 40}px 1fr`,
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
          borderRight: `1px solid ${N30}`,
          paddingTop: gridSize * 2,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 56px)',
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
