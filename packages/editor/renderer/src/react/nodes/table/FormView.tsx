import * as React from 'react';
import { PureComponent } from 'react';
import Form, { Field, FormSection, FormFooter } from '@atlaskit/form';
import Button, { ButtonGroup } from '@atlaskit/button';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import UserPicker, { User } from '@atlaskit/user-picker';

import { WithProviders } from '@atlaskit/editor-common';
import { userPickerData } from '@atlaskit/util-data-test';

import { TableProps } from './';
import CheckboxWithState from './CheckboxWithState';

export const exampleUsers = userPickerData as User[];

const getText = node => node.content[0].text;
const getHeaderText = header => getText(header.content[0]);

export default class FormView extends PureComponent<TableProps> {
  formRef: any;

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  render() {
    const { providers } = this.props;
    if (!providers) {
      return null;
    }

    return (
      <WithProviders
        providers={['formProvider']}
        providerFactory={providers}
        renderNode={this.renderForm}
      />
    );
  }

  renderForm = (providers: { formProvider?: object } = {}) => {
    const { localId } = this.props;
    return (
      <div className="tableForm">
        <div className="tableForm__body">
          <Form
            name={localId}
            onSubmit={this.handleSubmit(providers.formProvider)}
            ref={this.formRef}
          >
            <FormSection>{this.renderFields()}</FormSection>
            <FormFooter actionsContent={[{ id: 'submit-button' }, {}]}>
              <ButtonGroup>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
                <Button appearance="subtle" type="reset">
                  Reset
                </Button>
              </ButtonGroup>
            </FormFooter>
          </Form>
        </div>
      </div>
    );
  };

  private handleSubmit = formProvider => event => {
    event.preventDefault();
    const headers = this.props.content[0].content;
    const values = this.formRef.current.fields.fieldStates.map(
      ({ value }, idx) => {
        return {
          cellType: headers[idx].attrs.cellType,
          value,
        };
      },
    );
    formProvider.insertRow(this.props.localId, values);
  };

  private renderFields = () => {
    const { content } = this.props;

    if (content.length < 2) {
      return null;
    }
    const headers = content[0].content;
    const firstRow = content[1].content;

    return headers.map((header, idx) => {
      const label = getHeaderText(header);
      switch (header.attrs.cellType) {
        case 'mention': {
          return (
            <Field key={idx} label={label}>
              <UserPicker name={idx} users={exampleUsers} width={360} />
            </Field>
          );
        }
        case 'single-select': {
          const options = firstRow[idx].content[0].content
            .map(getText)
            .map(option => ({
              label: option,
              value: option,
            }));
          return (
            <Field key={idx} label={label}>
              <Select name={idx} options={options} placeholder={label} />
            </Field>
          );
        }
        case 'checkbox': {
          return (
            <Field key={idx} label={label}>
              <CheckboxWithState name={idx} />
            </Field>
          );
        }
        default: {
          return (
            <Field key={idx} label={label}>
              <FieldText
                name={idx}
                value=""
                placeholder={label}
                shouldFitContainer
              />
            </Field>
          );
        }
      }
    });
  };
}
