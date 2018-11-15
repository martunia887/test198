import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import Form, {
  Field as BaseField,
  FormSection,
  FormFooter,
} from '@atlaskit/form';
import Button, { ButtonGroup } from '@atlaskit/button';
import { RadioGroup } from '@atlaskit/radio';
import Select from '@atlaskit/select';
import FieldText from '@atlaskit/field-text';
import UserPicker, { User } from '@atlaskit/user-picker';
import { FieldTextAreaStateless } from '@atlaskit/field-text-area';
import { DatePicker } from '@atlaskit/datetime-picker';
import { format } from 'date-fns';
import FieldRange from '@atlaskit/field-range';

import { WithProviders } from '@atlaskit/editor-common';
import { userPickerData } from '@atlaskit/util-data-test';

import { TableProps } from './';
import CheckboxWithState from './CheckboxWithState';
import MultiCheckbox from './MultiCheckbox';

const Field = styled(BaseField)`
  margin-top: 24px;
`;

export const exampleUsers = userPickerData as User[];

const getText = node => node.content[0].text;
const getHeaderText = header => getText(header.content[0]);

const customStyles = {
  singleValue: (provided, state) => ({
    ...provided,
    background: state.data.color,
    padding: '2px 4px',
    borderRadius: 3,
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: 600,
  }),
};

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
            <FormSection>
              {this.renderFields(providers.formProvider)}
            </FormSection>
            <FormFooter actionsContent={[{ id: 'submit-button' }, {}]}>
              <ButtonGroup>
                <Button appearance="primary" type="submit">
                  Submit
                </Button>
                {/* <Button appearance="subtle" type="reset">
                  Reset
                </Button> */}
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
    // console.log(
    //   this.formRef.current.fields.fieldStates.map(field => field.value),
    // );
    formProvider.insertRow(this.props.localId, values);
  };

  private renderFields = formProvider => {
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
            <Field key={idx} name={idx} label={label}>
              <UserPicker
                defaultValue={
                  header.attrs.currentUser
                    ? formProvider.getCurrentUser()
                    : undefined
                }
                users={header.attrs.currentUser ? [] : exampleUsers}
                {...(header.attrs.currentUser
                  ? { value: formProvider.getCurrentUser() }
                  : {})}
                width={360}
              />
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
            <Field key={idx} name={idx} label={label}>
              <Select options={options} placeholder={label} />
            </Field>
          );
        }
        case 'checkbox': {
          return (
            <Field key={idx} name={idx} label={label}>
              <CheckboxWithState defaultValue="✅" />
            </Field>
          );
        }
        case 'multi-select': {
          const options = firstRow[idx].content[0].content.map(getText);
          return (
            <Field key={idx} name={idx} label={label}>
              <MultiCheckbox>
                {options.map((option, iidx) => (
                  <CheckboxWithState
                    key={iidx}
                    label={option}
                    defaultValue={option}
                  />
                ))}
              </MultiCheckbox>
            </Field>
          );
        }
        case 'radio-select': {
          const options = firstRow[idx].content[0].content
            .map(getText)
            .map(option => ({
              name: idx,
              label: option,
              value: option,
            }));
          return (
            <Field key={idx} name={idx} label={label}>
              <RadioGroup options={options} />
            </Field>
          );
        }
        case 'long-text': {
          return (
            <Field key={idx} name={idx} label={label}>
              <FieldTextAreaStateless
                minimumRows={3}
                shouldFitContainer={true}
                placeholder={label}
              />
            </Field>
          );
        }
        case 'date': {
          return (
            <Field key={idx} name={idx} label={label}>
              <DatePicker
                defaultValue={format(new Date(), 'YYYY/MM/DD')}
                shouldFitContainer={true}
              />
            </Field>
          );
        }
        case 'slider': {
          return (
            <Field key={idx} name={idx} label={label}>
              <FieldRange min={0} max={1.0} />
            </Field>
          );
        }
        case 'status-select': {
          const options = firstRow[idx].content[0].content
            .map(node => ({
              text: getText(node),
              color: node.attrs.color,
            }))
            .map(obj => ({
              label: obj.text,
              value: obj.text,
              color: obj.color,
            }));
          return (
            <Field key={idx} name={idx} label={label}>
              <Select
                styles={customStyles}
                options={options}
                placeholder={label}
              />
            </Field>
          );
        }
        default: {
          // console.log(header.attrs.cellType);
          return (
            <Field key={idx} name={idx} label={label}>
              <FieldText value="" placeholder={label} shouldFitContainer />
            </Field>
          );
        }
      }
    });
  };
}
