import * as React from 'react';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';

import InlineEditUncontrolled from './InlineEditUncontrolled';
import { InlineEditProps } from '../types';

interface State {
  isEditing: boolean;
}

class InlineEdit extends React.Component<InlineEditProps, State> {
  static defaultProps = {
    startWithEditViewOpen: false,
  };

  editViewRef = React.createRef<HTMLElement>();

  state = {
    isEditing: this.props.startWithEditViewOpen || false,
  };

  componentDidMount() {
    if (this.props.startWithEditViewOpen && this.editViewRef.current) {
      this.editViewRef.current.focus();
    }
  }

  onConfirm = async (
    value: string,
    name: string,
    analyticsEvent: UIAnalyticsEvent,
  ) => {
    const error = await this.props.onConfirm(value, name, analyticsEvent);
    if (!error) {
      this.setState({ isEditing: false });
    }
    return error;
  };

  onCancel = () => {
    this.setState({
      isEditing: false,
    });
  };

  onEditRequested = () => {
    this.setState({ isEditing: true }, () => {
      if (this.editViewRef.current) {
        this.editViewRef.current.focus();
      }
    });
  };

  render() {
    return (
      <InlineEditUncontrolled
        {...this.props}
        defaultValue={this.props.defaultValue}
        editView={fieldProps =>
          this.props.editView(fieldProps, this.editViewRef)
        }
        readView={this.props.readView}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        isEditing={this.state.isEditing}
        onEditRequested={this.onEditRequested}
      />
    );
  }
}

export default InlineEdit;
