// @flow
import React, { Component } from 'react';
import Toggle, { ToggleLoading as LoadingToggle } from '../src';

const fakeAPIRequest = shouldResolve => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) resolve();
      else reject();
    }, 1000);
  });
};

export default class extends Component<*, *> {
  state = {
    isLoading: false,
    unsafeToUnmountSpinner: false,
    isChecked: false,
    apiRequestSucceeds: true,
  };

  onChange = () => {
    if (!this.state.unsafeToUnmountSpinner) {
      this.setState({
        isChecked: !this.state.isChecked,
        isLoading: true,
        unsafeToUnmountSpinner: true,
      });
    }

    fakeAPIRequest(this.state.apiRequestSucceeds)
      .then(() => this.setState({ isLoading: false }))
      .catch(() =>
        this.setState({
          isChecked: !this.state.isChecked,
          unsafeToUnmountSpinner: false,
          isLoading: false,
        }),
      );
  };

  render() {
    const {
      isLoading,
      unsafeToUnmountSpinner,
      isChecked,
      apiRequestSucceeds,
    } = this.state;
    return (
      <>
        <div>
          Api request succeeds:{' '}
          <Toggle
            isDefaultChecked
            onChange={() =>
              this.setState({ apiRequestSucceeds: !apiRequestSucceeds })
            }
          />
        </div>
        Loading toggle:
        <LoadingToggle
          isChecked={isChecked}
          isLoading={isLoading}
          showSpinner={unsafeToUnmountSpinner}
          onChange={this.onChange}
          spinnerProps={{
            onComplete: () => {
              this.setState({ unsafeToUnmountSpinner: false });
            },
          }}
        />
      </>
    );
  }
}
