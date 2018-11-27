// @flow
import React, { Component } from 'react';
import {
  DateTimePicker,
  DatePicker,
  TimePicker,
} from '@atlaskit/datetime-picker';
import Button from '@atlaskit/button';
import Form, { Field, ErrorMessage } from '../src';

type State = { data: {} };

export default class DTPExample extends Component<*, State> {
  state = {
    data: {},
  };
  render() {
    return (
      <Form onSubmit={data => this.setState({ data })}>
        {({ formProps }) => (
          <>
            {JSON.stringify(this.state.data)}
            <form {...formProps}>
              <Field name="datetime" isRequired>
                {({ fieldProps, error }) => (
                  <>
                    <DateTimePicker {...fieldProps} />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                  </>
                )}
              </Field>
              <Field name="date">
                {({ fieldProps }) => <DatePicker {...fieldProps} />}
              </Field>
              <Field name="time">
                {({ fieldProps }) => <TimePicker {...fieldProps} />}
              </Field>
              <Button type="submit">Submit</Button>
            </form>
          </>
        )}
      </Form>
    );
  }
}
