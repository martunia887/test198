import React from 'react';
import Button from '@atlaskit/button';
import { FieldTextStateless } from '@atlaskit/field-text';
import { FieldTextAreaStateless } from '@atlaskit/field-text-area';
import TextArea from '@atlaskit/textarea';
import TextField from '@atlaskit/textfield';

import Form, { Field, FormFooter } from '../src';

export default () => (
  <div
    style={{
      display: 'flex',
      width: '400px',
      margin: '0 auto',
      flexDirection: 'column',
    }}
  >
    <Form onSubmit={data => console.log(data)}>
      {({ formProps }) => (
        <form {...formProps} name="text-fields">
          <Field name="firstname" defaultValue="" label="First name" isRequired>
            {({ fieldProps }) => <TextField {...fieldProps} />}
          </Field>

          <Field name="lastname" defaultValue="" label="Last name" isRequired>
            {({ fieldProps: { isRequired, isDisabled, ...others } }) => (
              <FieldTextStateless
                isLabelHidden
                shouldFitContainer
                disabled={isDisabled}
                required={isRequired}
                {...others}
              />
            )}
          </Field>

          <Field<string, HTMLTextAreaElement>
            name="description"
            defaultValue=""
            label="Description"
          >
            {({ fieldProps }) => <TextArea {...fieldProps} />}
          </Field>

          <Field name="comments" defaultValue="" label="Additional comments">
            {({ fieldProps: { isRequired, isDisabled, ...others } }) => (
              <FieldTextAreaStateless
                isLabelHidden
                shouldFitContainer
                disabled={isDisabled}
                required={isRequired}
                {...others}
              />
            )}
          </Field>

          <FormFooter>
            <Button type="submit" appearance="primary">
              Submit
            </Button>
          </FormFooter>
        </form>
      )}
    </Form>
  </div>
);
