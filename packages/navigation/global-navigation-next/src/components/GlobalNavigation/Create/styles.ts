import { colors, gridSize as gridSizeFn, fontSizeSmall } from '@atlaskit/theme';

const gridSize = gridSizeFn();

// export const CreateBtn = styled.button`
//   align-items: center;
//   padding: 0px ${gridSize}px;
//   border-radius: 3px;
//   display: flex;
//   height: inherit;
//   text-decoration: inherit;
//   transition: box-shadow 0.15s cubic-bezier(0.2, 0, 0, 1);
// `;

const buttonOverrides = {
  backgroundColor: colors.B75,
  color: colors.B500,
  fontSize: fontSizeSmall(),
  fontWeight: 'bold',
  height: gridSize * 4,
  textTransform: 'uppercase',
};

export const buttonTheme: any = (
  currentTheme: Function,
  themeProps: { appearance: string },
) => {
  const { buttonStyles, spinnerStyles } = currentTheme(themeProps);
  return {
    buttonStyles: {
      ...buttonStyles,
      ...buttonOverrides,
    },
    spinnerStyles,
  };
};
