import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import { Slider } from '../src/next-gen/slider';

interface State {
  zoom: number;
}

class Example extends React.Component<{}, State> {
  state: State = {
    zoom: 0,
  };

  render() {
    const { zoom } = this.state;
    return (
      <div>
        <h2>So Slider, so slow...</h2>
        <p>
          This example demonstrates the slow speed of Slider when running
          locally :(
        </p>
        <Page>
          <Grid>
            <GridColumn medium={2} />
            <GridColumn medium={8}>
              <Slider
                value={zoom}
                onChange={(zoom: number) => {
                  this.setState({ zoom });
                }}
              />
            </GridColumn>
            <GridColumn medium={2} />
          </Grid>
        </Page>
      </div>
    );
  }
}

export default () => <Example />;
