// @flow

import React, { createContext, type ComponentType, type Node } from 'react';

export type ThemeProp<ThemeTokens = {}, ThemeProps = *> = (
  (ThemeProps) => ThemeTokens,
  ThemeProps,
) => ThemeTokens;

export type ThemeTokens = {
  [string]: any,
};

export type ThemeFn = ThemeTokens => ThemeTokens;

export type Theme = {
  Consumer: ComponentType<{
    children: ThemeTokens => Node,
    mode: 'light' | 'dark',
  }>,
  Provider: ComponentType<{
    children?: Node,
    value?: ThemeFn,
  }>,
};

const pipe = (first: ThemeFn, second: ThemeFn) => {
  return x => second(first(x));
};

export function createTheme(defaultTheme: ThemeTokens): Theme {
  const unary = t => t;
  const ThemeCtx = createContext(unary);
  function Provider({ value: vfn = unary, children }) {
    return (
      <ThemeCtx.Consumer>
        {tfn => {
          const newTfn = pipe(
            vfn,
            tfn,
          );
          return (
            <ThemeCtx.Provider value={newTfn}>{children}</ThemeCtx.Provider>
          );
        }}
      </ThemeCtx.Consumer>
    );
  }
  function Consumer({ mode, children }) {
    return (
      <ThemeCtx.Consumer>
        {tfn => {
          const tokens = tfn(defaultTheme);
          return children(tokens);
        }}
      </ThemeCtx.Consumer>
    );
  }
  return { Provider, Consumer };
}

// export function createTheme<ThemeTokens, ThemeProps>(
//   defaultThemeFn: ThemeProps => ThemeTokens,
// ): {
//   Consumer: ComponentType<
//     ThemeProps & {
//       children: ThemeTokens => Node,
//     },
//   >,
//   Provider: ComponentType<{
//     children?: Node,
//     value?: ThemeProp<ThemeTokens, ThemeProps>,
//   }>,
// } {
//   const emptyThemeFn = (tokens, props) => tokens(props);
//   const ThemeContext = createContext(defaultThemeFn);
//
//   function Consumer(props: ThemeProps & { children: ThemeTokens => Node }) {
//     const { children, ...themeProps } = props;
//     return (
//       <ThemeContext.Consumer>
//         {theme => {
//           const themeFn = theme || emptyThemeFn;
//           return props.children(themeFn(themeProps));
//         }}
//       </ThemeContext.Consumer>
//     );
//   }
//
//   function Provider(props: {
//     children?: Node,
//     value?: ThemeProp<ThemeTokens, ThemeProps>,
//   }) {
//     return (
//       <ThemeContext.Consumer>
//         {themeFn => {
//           const valueFn = props.value || emptyThemeFn;
//           const mixedFn = (themeProps: ThemeProps) =>
//             valueFn(themeFn, themeProps);
//           return (
//             <ThemeContext.Provider value={mixedFn}>
//               {props.children}
//             </ThemeContext.Provider>
//           );
//         }}
//       </ThemeContext.Consumer>
//     );
//   }
//
//   return { Consumer, Provider };
// }
