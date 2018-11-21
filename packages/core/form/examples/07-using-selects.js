// @flow
import React, { PureComponent, Fragment } from 'react';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import Form, { Field, ErrorMessage, HelperMessage } from '../src';

const colors = [
  { label: 'blue', value: 'blue' },
  { label: 'red', value: 'red' },
  { label: 'purple', value: 'purple' },
  { label: 'black', value: 'black' },
  { label: 'white', value: 'white' },
  { label: 'gray', value: 'gray' },
  { label: 'yellow', value: 'yellow' },
  { label: 'orange', value: 'orange' },
  { label: 'teal', value: 'teal' },
];

const flavors = [
  { label: 'vanilla', value: 'vanilla' },
  { label: 'strawberry', value: 'strawberry' },
  { label: 'chocolate', value: 'chocolate' },
  { label: 'mango', value: 'mango' },
  { label: 'rum', value: 'rum' },
  { label: 'hazelnut', value: 'hazelnut' },
  { label: 'durian', value: 'durian' },
];

export default class extends PureComponent {
  render() {
    return (
      <Form onSubmit={data => console.log(data)}>
        {({ formProps }) => (
          <form {...formProps}>
            <Field name="colors" label="Select a colour">
              {({ fieldProps, error, meta }) => (
                <Fragment>
                  <Select {...fieldProps} options={colors} />
                </Fragment>
              )}
            </Field>
            <Field name="ice-cream" label="Select a flavor">
              {({ fieldProps, error, meta }) => (
                <Fragment>
                  <Select {...fieldProps} options={flavors} isMulti />
                </Fragment>
              )}
            </Field>
            <Button type="submit" appearance="primary">
              Submit Form
            </Button>
          </form>
        )}
      </Form>
    );
  }
}
