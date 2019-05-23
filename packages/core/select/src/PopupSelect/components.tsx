import React from 'react';
import { components } from 'react-select';

import { colors, layers } from '@atlaskit/theme';
import SearchIcon from '@atlaskit/icon/glyph/editor/search';
import { IndicatorProps } from 'react-select/lib/components/indicators';
import { ControlProps } from 'react-select/lib/components/Control';

// ==============================
// Styled Components
// ==============================

interface MenuProps extends React.HTMLAttributes<HTMLElement> {
  maxWidth: number;
  minWidth: number;
}

export const MenuDialog: React.SFC<MenuProps> = ({
  maxWidth,
  minWidth,
  ...props
}) => {
  const shadow = colors.N40A;
  return (
    <div
      css={{
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        maxWidth,
        minWidth,
        zIndex: layers.layer(),
      }}
      {...props}
    />
  );
};

// ==============================
// Custom Components
// ==============================

const DropdownIndicator: React.SFC<IndicatorProps<any>> = () => (
  <div css={{ marginRight: 2, textAlign: 'center', width: 32 }}>
    <SearchIcon label="Search" />
  </div>
);

const Control: React.SFC<ControlProps<any>> = ({
  innerRef,
  innerProps,
  ...props
}) => {
  const ControlComponent = components.Control as React.ComponentType<any>;

  return (
    <div ref={innerRef} css={{ padding: '8px 8px 4px' }}>
      <ControlComponent {...props} innerProps={innerProps} />
    </div>
  );
};
export const DummyControl = (props: ControlProps<HTMLElement>) => (
  <div
    css={{
      border: 0,
      clip: 'rect(1px, 1px, 1px, 1px)',
      height: 1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      whiteSpace: 'nowrap',
      width: 1,
    }}
  >
    <components.Control {...props} />
  </div>
);
// NOTE `props` intentionally omitted from `Fragment`
// eslint-disable-next-line
const Menu = ({
  children,
  innerProps,
}: {
  children: any;
  innerProps: React.HTMLAttributes<HTMLElement>;
}) => <div {...innerProps}>{children}</div>;
export const defaultComponents = { Control, DropdownIndicator, Menu };
