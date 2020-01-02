import React, { Component, ReactNode } from 'react';
import { ThemeProvider, withTheme } from 'styled-components';

import { defaultGridColumns } from './internal/vars';
import Grid from './internal/GridElement';
import { ThemeProps } from './types';

interface Props {
  children?: ReactNode;
  spacing?: 'cosy' | 'comfortable' | 'compact';
  layout?: 'fixed' | 'fluid';
  theme?: ThemeProps;
  testId?: string;
}

export default withTheme(
  class AkGrid extends Component<Props> {
    static defaultProps: Props = {
      spacing: 'cosy',
      layout: 'fixed',
    };

    getTheme = (props: Props) => ({
      columns:
        props.theme && props.theme.columns
          ? props.theme.columns
          : defaultGridColumns,
      spacing:
        props.theme && props.theme.spacing
          ? props.theme.spacing
          : props.spacing,
      isNestedGrid:
        props.theme && props.theme.isNestedGrid
          ? props.theme.isNestedGrid
          : false,
    });

    render() {
      const { layout, spacing, testId } = this.props;
      return (
        <ThemeProvider theme={this.getTheme(this.props)}>
          <Grid data-testid={testId} spacing={spacing} layout={layout}>
            {this.props.children}
          </Grid>
        </ThemeProvider>
      );
    }
  },
);
