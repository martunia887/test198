/** @jsx jsx */
import React from 'react';
import { jsx, css, CSSObject } from '@emotion/core';

export const ThemeContext = React.createContext(null);

const getFixedStyles = (isFixed: boolean, fixedStyles: CSSObject) =>
  isFixed ? { position: 'fixed', ...fixedStyles } : {};

const div = 'div';
export default div;

const Banner = props => {
  const { children, height, isFixed } = props;
  const { setBannerHeight, bannerStyles } = React.useContext(ThemeContext);

  setBannerHeight(height);

  return (
    <div
      css={{
        background: 'red',
        gridArea: 'banner',
        ...getFixedStyles(isFixed, bannerStyles),
      }}
    >
      {children}
    </div>
  );
};

const Nav = props => {
  const { children, height, isFixed } = props;
  const { setNavHeight, navStyles } = React.useContext(ThemeContext);
  setNavHeight(height);

  return (
    <div
      css={{
        background: 'blue',
        gridArea: 'nav',
        ...getFixedStyles(isFixed, navStyles),
      }}
    >
      {children}
    </div>
  );
};
const LeftSideBar = props => {
  const { children, width, isFixed } = props;
  const { setLeftSidebarWidth, leftSidebarStyles } = React.useContext(
    ThemeContext,
  );

  setLeftSidebarWidth(width);

  return (
    <div
      css={{
        gridArea: 'left-sidebar',
        background: 'lightgray',
        ...getFixedStyles(isFixed, leftSidebarStyles),
      }}
    >
      {children}
    </div>
  );
};

const LeftPanel = props => {
  const { children, width, isFixed } = props;
  const { setLeftPanelWidth, leftPanelStyles } = React.useContext(ThemeContext);

  setLeftPanelWidth(width);

  return (
    <div
      css={{
        gridArea: 'left-panel',
        background: 'grey',
        ...getFixedStyles(isFixed, leftPanelStyles),
      }}
    >
      {children}
    </div>
  );
};
const RightPanel = props => {
  const { children, width, isFixed } = props;
  const { setRightPanelWidth, rightPanelStyles } = React.useContext(
    ThemeContext,
  );

  setRightPanelWidth(width);

  return (
    <div
      css={{
        gridArea: 'right-panel',
        background: 'rebeccapurple',
        ...getFixedStyles(isFixed, rightPanelStyles),
      }}
    >
      {children}
    </div>
  );
};

const Grid = props => {
  const { children } = props;
  const [bannerHeight, setBannerHeight] = React.useState(0);
  const [navHeight, setNavHeight] = React.useState(0);
  const [leftPanelWidth, setLeftPanelWidth] = React.useState(0);
  const [leftSidebarWidth, setLeftSidebarWidth] = React.useState(0);
  const [rightPanelWidth, setRightPanelWidth] = React.useState(0);
  const [rightSidebarWidth, setRightSidebarWidth] = React.useState(0);

  const areas = `"left-panel banner banner banner right-panel"
                 "left-panel nav nav nav right-panel"
                 "left-panel left-sidebar main right-sidebar right-panel"`;
  return (
    <div
      css={{
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: `${leftPanelWidth}px ${leftSidebarWidth}px auto ${rightSidebarWidth} ${rightPanelWidth}px`,
        gridTemplateRows: `${bannerHeight}px ${navHeight}px auto`,
        gridTemplateAreas: areas,
      }}
    >
      <ThemeContext.Provider
        value={{
          backgroundColor: 'red',
          setBannerHeight,
          setNavHeight,
          setLeftPanelWidth,
          setLeftSidebarWidth,
          setRightPanelWidth,
          setRightSidebarWidth,
          bannerStyles: {
            top: 0,
            right: rightPanelWidth,
            bottom: 'auto',
            left: leftPanelWidth,
            height: bannerHeight,
          },
          navStyles: {
            top: bannerHeight,
            right: rightPanelWidth,
            bottom: 'auto',
            left: leftPanelWidth,
            height: navHeight,
          },
          leftPanelStyles: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 'auto',
            width: leftPanelWidth,
          },
          leftSidebarStyles: {
            top: bannerHeight + navHeight,
            right: leftPanelWidth + leftSidebarWidth,
            bottom: 0,
            left: leftPanelWidth,
          },
          rightPanelStyles: {
            top: 0,
            left: 'auto',
            right: 0,
            bottom: 0,
            width: rightPanelWidth,
          },
          rightSidebarStyles: {
            top: bannerHeight + navHeight,
            right: rightPanelWidth,
            bottom: 0,
            left: 'auto',
            width: rightSidebarWidth,
          },
        }}
      >
        {children}
      </ThemeContext.Provider>
    </div>
  );
};
export { Banner, Nav, LeftPanel, RightPanel, LeftSideBar, Grid };
