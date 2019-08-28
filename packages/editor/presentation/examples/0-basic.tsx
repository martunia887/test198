import * as React from 'react';
import { injectGlobal } from 'styled-components';
import { PresentationMode } from '../src';
import defaultADF from '../__tests__/__fixtures__/default.adf.json';

injectGlobal`
  @font-face {
    font-family: "Charlie_Display_Regular";
    src: url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Regular-1-7c1c0a53957fc3b9f2716e8f26d50cf1.woff") format("font-woff"),
         url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Regular-1-7c1c0a53957fc3b9f2716e8f26d50cf1.woff") format("woff2");
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: "Charlie_Display_Semibold";
    src: url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Semibold-1-aa4aa85c7ef84dd4cb06bba4cd08a1b6.woff") format("font-woff"),
         url("https://marketplace-cdn.atlassian.com/s/public/Charlie_Display-Semibold-1-aa4aa85c7ef84dd4cb06bba4cd08a1b6.woff") format("woff2");
    font-weight: normal;
    font-style: normal;
  }
`;

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
    return false;
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
