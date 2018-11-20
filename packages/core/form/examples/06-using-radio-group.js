// @flow
import React from 'react';
import { RadioGroup } from '@atlaskit/radio';
import Button from '@atlaskit/button';
import Form, { Field, FormFooter } from '../src';

export default () => (
  <Form onSubmit={things => console.log('What even is this', things)}>
    {someProps => (
      <form {...someProps.formProps} style={{ width: '400px' }}>
        <Field name="mah-fave" defaultValue="purple">
          {({ fieldProps }) => {
            const { value, ...otherProps } = fieldProps;
            return (
              <RadioGroup
                {...otherProps}
                checkedValue={value}
                options={[
                  { name: 'color', value: 'red', label: 'Red' },
                  { name: 'color', value: 'blue', label: 'Blue' },
                  { name: 'color', value: 'yellow', label: 'Yellow' },
                  { name: 'color', value: 'green', label: 'Green' },
                  { name: 'color', value: 'purple', label: 'Purple' },
                ]}
              />
            );
          }}
        </Field>
        <FormFooter>
          <Button appearance="primary" type="submit">
            Create repository
          </Button>
        </FormFooter>
      </form>
    )}
  </Form>
);
