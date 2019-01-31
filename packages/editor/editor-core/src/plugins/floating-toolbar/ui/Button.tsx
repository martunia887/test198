import * as React from 'react';
import { ReactElement, MouseEvent } from 'react';

import Tooltip from '@atlaskit/tooltip';
import UiButton, { themeNamespace } from '@atlaskit/button';
import { colors, themed } from '@atlaskit/theme';

import styled, { ThemeProvider } from 'styled-components';

const editorButtonTheme = {
  danger: {
    background: {
      default: colors.background,
      hover: colors.backgroundHover,
      active: colors.backgroundActive,
      disabled: themed({ light: 'none', dark: 'none' }),
      selected: themed({ light: colors.N700, dark: colors.N700 }),
      focusSelected: themed({ light: colors.N700, dark: colors.N700 }),
    },
    color: {
      default: themed({ light: colors.N400, dark: colors.DN600 }),
      hover: themed({ light: colors.R300, dark: colors.R300 }),
      active: themed({ light: colors.R300, dark: colors.R300 }),
      disabled: themed({ light: colors.N70, dark: colors.N70 }),
      selected: themed({ light: colors.N20, dark: colors.N20 }),
      focusSelected: themed({ light: colors.N20, dark: colors.N20 }),
    },
  },
};

const Button = styled(UiButton)`
  padding: 0 2px;
`;

export type ButtonAppearance = 'subtle' | 'danger';

export interface Props {
  title: string;
  icon: ReactElement<any>;
  onClick: React.MouseEventHandler;
  onMouseEnter?: <T>(event: MouseEvent<T>) => void;
  onMouseLeave?: <T>(event: MouseEvent<T>) => void;
  selected?: boolean;
  disabled?: boolean;
  appearance?: ButtonAppearance;
}

export default ({
  title,
  icon,
  onClick,
  onMouseEnter,
  onMouseLeave,
  selected,
  disabled,
  appearance = 'subtle',
}: Props) => {
  return (
    <Tooltip content={title} hideTooltipOnClick={true} position="top">
      <ThemeProvider theme={{ [themeNamespace]: editorButtonTheme }}>
        <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <Button
            ariaLabel={title}
            spacing="compact"
            appearance={appearance}
            ariaHaspopup={true}
            iconBefore={icon}
            onClick={onClick}
            isSelected={selected}
            isDisabled={disabled}
          />
        </div>
      </ThemeProvider>
    </Tooltip>
  );
};
