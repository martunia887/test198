// @flow
import React, { Component } from 'react';
import Button from '@atlaskit/button';
import { colors } from '@atlaskit/theme';
import Spinner from '../src';

const FauxPage = props => (
  <div
    {...props}
    style={{
      height: '200px',
      width: '200px',
      background: colors.P50,
      margin: '4px',
      padding: '8px',
      textAlign: 'center',
    }}
  />
);

const fakeLoading = () =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`This is realistic content for a page`);
    }, 2000);
  });

export default class Example extends Component<*, *> {
  state = {
    isSpinning: false,
    unsafeToRemoveSpinner: false,
    text: 'Initial text before loading',
  };

  getNextPage() {
    this.setState({ isSpinning: true, unsafeToRemoveSpinner: true });
    fakeLoading().then(text => this.setState({ text, isSpinning: false }));
  }

  render() {
    const { isSpinning, unsafeToRemoveSpinner, text } = this.state;
    return (
      <>
        <div>
          <Button onClick={() => this.getNextPage()}>Load Next Page</Button>
        </div>
        <FauxPage>
          {isSpinning || unsafeToRemoveSpinner ? (
            <Spinner
              size="large"
              isCompleting={isSpinning}
              onComplete={() => this.setState({ unsafeToRemoveSpinner: false })}
            />
          ) : (
            text
          )}
        </FauxPage>
      </>
    );
  }
}
