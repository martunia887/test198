import * as React from 'react';
import { PresentationMode } from '../src';
import defaultADF from '../__tests__/__fixtures__/default.adf.json';

export default class Example extends React.Component<
  {},
  { adf: string; showPresentation: boolean }
> {
  inputBox?: HTMLTextAreaElement | null;
  constructor(props: {}) {
    super(props);

    this.state = {
      adf: JSON.stringify(defaultADF),
      showPresentation: false,
    };
  }

  render() {
    const { adf, showPresentation } = this.state;

    return (
      <>
        {!showPresentation && (
          <>
            <textarea
              id="presentation-value-input"
              style={{
                boxSizing: 'border-box',
                border: '1px solid lightgray',
                fontFamily: 'monospace',
                fontSize: 16,
                padding: 10,
                width: '100%',
                height: 320,
              }}
              ref={ref => {
                this.inputBox = ref;
              }}
              value={this.state.adf}
              onChange={this.onADFChange}
            />
            <button onClick={this.startPresentation} disabled={!adf}>
              Start!
            </button>
          </>
        )}
        {showPresentation && (
          <PresentationMode adf={JSON.parse(adf)} onExit={this.onExit} />
        )}
      </>
    );
  }

  private onExit = () => {
    this.setState({ showPresentation: false });
  };

  private onADFChange = () => {
    if (this.inputBox) {
      this.setState({ adf: this.inputBox.value });
    }
  };

  private startPresentation = () => {
    this.setState({ showPresentation: true });
  };
}
