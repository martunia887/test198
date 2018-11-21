// @flow
import React, { createContext, type Node, type Ref } from 'react';
import { createForm, type FormApi } from 'final-form';
import createDecorator from 'final-form-focus';
import shallowEqual from 'shallow-equal/objects';

export const FormContext = createContext();

type FormProps = {
  ref: Ref<'form'>,
  onSubmit: (SyntheticEvent<HTMLFormElement> | any) => any,
};

type Props = {
  /* Children rendered inside the Form component. Function will be passed props from the form. */
  children: ({ formProps: FormProps }) => Node,
  /* the initial values of the form */
  initialValues: Object,
  /* Called when the form is submitted without errors */
  onSubmit: Object => any,
};

type State = {
  form: FormApi,
};

const createFinalForm = (initialValues, onSubmit, formRef) => {
  const form = createForm({
    initialValues,
    onSubmit,
  });
  // mutate state
  const withFocusDecorator = createDecorator(() =>
    formRef.current
      ? Array.from(formRef.current.querySelectorAll('input'))
      : [],
  );
  withFocusDecorator(form);
  return form;
};

class Form extends React.Component<Props, State> {
  static defaultProps = {
    initialValues: {},
  };

  formRef = React.createRef();
  state = {
    form: createFinalForm(
      this.props.initialValues,
      this.props.onSubmit,
      this.formRef,
    ),
  };

  componentDidUpdate(prevProps: Props) {
    if (!shallowEqual(prevProps.initialValues, this.props.initialValues)) {
      this.state.form.reset(this.props.initialValues);
    }
  }

  handleSubmit = (e: SyntheticEvent<HTMLFormElement> | any) => {
    if (typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    this.state.form.submit();
  };

  render() {
    return (
      <FormContext.Provider value={this.state.form}>
        {this.props.children({
          formProps: {
            onSubmit: this.handleSubmit,
            ref: this.formRef,
          },
        })}
      </FormContext.Provider>
    );
  }
}

export default Form;
