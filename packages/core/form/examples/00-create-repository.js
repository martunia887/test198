// @flow
import React, { PureComponent } from 'react';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';

import { FormHeader, FormSection, FormFooter } from '../src';
import Form from '../src/FormNext';
import Field from '../src/FieldNext';

type State = {
  eventResult: string,
};

export default class LayoutExample extends PureComponent<void, State> {
  state = {
    eventResult:
      'Click into and out of the input above to trigger onBlur & onFocus in the Fieldbase',
  };

  formRef: any;

  // Form Event Handlers
  onSubmitHandler = () => {
    console.log('onSubmitHandler');
  };

  onValidateHandler = () => {
    console.log('onValidateHandler');
  };

  onResetHandler = () => {
    console.log('onResetHandler');
  };

  onChangeHandler = () => {
    console.log('onChangeHandler');
  };
  onBlurHandler = () => {
    console.log('onBlurHandler');
  };
  onFocusHandler = () => {
    console.log('onFocusHandler');
  };

  // Footer Button Handlers
  submitClickHandler = () => {
    this.formRef.submit();
  };

  render() {
    return (
      <div
        style={{
          display: 'flex',
          width: '400px',
          margin: '0 auto',
          minHeight: '60vh',
          flexDirection: 'column',
        }}
      >
        <Form
          name="create-repo"
          initialValues={{ repo_name: '' }}
          onSubmit={console.log}
          onReset={this.onResetHandler}
          action="//httpbin.org/get"
          method="GET"
          target="submitFrame"
        >
          <FormHeader title="Create a new repository" />

          <FormSection>
            <Field name="owner" label="Owner">
              {({ field, form }) => (
                <Select
                  isSearchable={false}
                  defaultValue={{ label: 'Atlassian', value: 'atlassian' }}
                  options={[
                    { label: 'Atlassian', value: 'atlassian' },
                    { label: 'Sean Curtis', value: 'scurtis' },
                    { label: 'Mike Gardiner', value: 'mg' },
                    { label: 'Charles Lee', value: 'clee' },
                  ]}
                  {...field}
                  onChange={option => {
                    form.setFieldValue('owner', option);
                  }}
                />
              )}
            </Field>

            <Field name="project" label="Project" isRequired>
              {({ field, form }) => (
                <Select
                  options={[
                    { label: 'Atlaskit', value: 'brisbane' },
                    { label: 'Bitbucket', value: 'bb' },
                    { label: 'Confluence', value: 'conf' },
                    { label: 'Jira', value: 'jra' },
                    { label: 'Stride', value: 'stride' },
                  ]}
                  placeholder="Choose a project&hellip;"
                  isRequired
                  {...field}
                  onChange={option => {
                    form.setFieldValue('project', option);
                  }}
                />
              )}
            </Field>

            <Field
              name="repo_name"
              label="Repository name"
              isRequired
              helperText="Name needs to be more than three characters"
              validateOn="blur"
            >
              {({ field }) => (
                <FieldText isLabelHidden shouldFitContainer {...field} />
              )}
            </Field>

            <Field name="access-level" label="Access level">
              {({ field }) => (
                <Checkbox
                  label="This is a private repository"
                  value="private"
                  {...field}
                />
              )}
            </Field>

            <Field name="include_readme" label="Include a README?">
              {({ field, form }) => (
                <Select
                  isSearchable={false}
                  defaultValue={{ label: 'No', value: 'no' }}
                  options={[
                    { label: 'No', value: 'no' },
                    {
                      label: 'Yes, with a template',
                      value: 'yes-with-template',
                    },
                    {
                      label: 'Yes, with a tutorial (for beginners)',
                      value: 'yes-with-tutorial',
                    },
                  ]}
                  {...field}
                  onChange={option => {
                    form.setFieldValue('include_readme', option);
                  }}
                />
              )}
            </Field>
          </FormSection>

          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle">Cancel</Button>
              <Button appearance="primary" type="submit">
                Create repository
              </Button>
            </ButtonGroup>
          </FormFooter>
        </Form>
      </div>
    );
  }
}
