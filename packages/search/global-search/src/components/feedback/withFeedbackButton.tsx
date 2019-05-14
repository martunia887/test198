import * as React from 'react';
import { ComponentType } from 'react';
import FeedbackButton from './FeedbackButton';
import FeedbackCollector, { FeedbackFlag } from '@atlaskit/feedback-collector';
import { FlagGroup } from '@atlaskit/flag';

const EMBEDDABLE_KEY = '85dc6027-c074-4800-ba54-4ecb844b29f8';
const REQUEST_TYPE_ID = '182';

export interface FeedbackCollectorProps {
  name: string;
  email: string;
}

export interface InjectedInputControlProps {
  inputControls?: JSX.Element;
}

interface State {
  isOpen: boolean;
  displayFlag: boolean;
}

export default function withFeedbackButton<P>(
  WrappedComponent: ComponentType<P & InjectedInputControlProps>,
): ComponentType<P & FeedbackCollectorProps> {
  return class WithFeedbackButton extends React.Component<
    P & FeedbackCollectorProps,
    State
  > {
    static displayName = `WithFeedbackButton(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    state = {
      isOpen: false,
      displayFlag: false,
    };

    open = () => this.setState({ isOpen: true });

    close = () => {
      this.setState({ isOpen: false });
    };

    displayFlag = () => this.setState({ displayFlag: true });

    hideFlag = () => this.setState({ displayFlag: false });

    renderFeedbackButton() {
      return <FeedbackButton onClick={this.open} />;
    }

    render() {
      const { isOpen, displayFlag } = this.state;

      const { name, email } = this.props;

      return (
        <div>
          <WrappedComponent
            {...this.props}
            inputControls={this.renderFeedbackButton()}
          />
          {isOpen && (
            <FeedbackCollector
              onClose={this.close}
              onSubmit={this.displayFlag}
              email={email}
              name={name}
              requestTypeId={REQUEST_TYPE_ID}
              embeddableKey={EMBEDDABLE_KEY}
            />
          )}

          {displayFlag && (
            <FlagGroup onDismissed={this.hideFlag}>
              <FeedbackFlag />
            </FlagGroup>
          )}
        </div>
      );
    }
  };
}
