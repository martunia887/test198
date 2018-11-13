// @flow
import React, { type Node } from 'react';
import * as Formik from 'formik';

type Props = {
  onSubmit: Object => any,
  children: Node,
  initialValues?: Object,
};

const Form = ({ children, onSubmit, initialValues }: Props) => (
  <Formik.Formik
    onSubmit={onSubmit}
    initialValues={initialValues}
    validateOnBlur={false}
    validateOnChange={false}
  >
    <Formik.Form>{children}</Formik.Form>
  </Formik.Formik>
);

export default Form;
