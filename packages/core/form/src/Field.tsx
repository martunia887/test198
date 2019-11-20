import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  MutableRefObject,
} from 'react';
import { uid } from 'react-uid';
import invariant from 'tiny-invariant';
import { FormContext, IsDisabledContext } from './Form';
import FieldWrapper, { Label, RequiredIndicator } from './styled/Field';
import { FieldState } from 'final-form';

function isChangeEvent<Element extends SupportedElements>(
  event: ChangeEvent<Element>,
) {
  return event && event.target && !!event.target.value;
}

function isFunction<T>(x: T | ((value?: T) => T)): x is (value?: T) => T {
  return typeof x === 'function';
}

type ChangeEvent<Element> = React.ChangeEvent<Element>;
type SupportedElements =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export interface FieldProps<
  FieldValue,
  Element extends SupportedElements = HTMLInputElement
> {
  id: string;
  isRequired: boolean;
  isDisabled: boolean;
  isInvalid: boolean;
  // This can be either an event or value as `onChange` might not be applied
  // directly to a DOM element. For example, it might be a react-select
  onChange: (value: ChangeEvent<Element> | FieldValue) => void;
  onBlur: () => void;
  onFocus: () => void;
  value: FieldValue;
  'aria-invalid': 'true' | 'false';
  'aria-labelledby': string;
}

export interface Meta {
  dirty: boolean;
  dirtySinceLastSubmit: boolean;
  submitFailed: boolean;
  submitting: boolean;
  touched: boolean;
  valid: boolean;
  error?: string;
  submitError?: boolean;
}

interface Props<FieldValue, Element extends SupportedElements> {
  /* Children to render in the field. Called with props for the field component and other information about the field. */
  children: (args: {
    fieldProps: FieldProps<FieldValue, Element>;
    error?: string;
    valid: boolean;
    meta: Meta;
  }) => React.ReactNode;
  /* The default value of the field. If a function is provided it is called with the current default value of the field. */
  defaultValue: FieldValue | ((currentDefaultValue?: FieldValue) => FieldValue);
  /* Passed to the ID attribute of the field. Randomly generated if not specified */
  id?: string;
  /* Whether the field is required for submission */
  isRequired?: boolean;
  /* Whether the field is disabled. If the parent Form component is disabled, then the field will always be disabled */
  isDisabled: boolean;
  /* Label displayed above the field */
  label?: ReactNode;
  /* The name of the field */
  name: string;
  /* Given what onChange was called with and the current field value return the next field value */
  transform?: (event: ChangeEvent<Element>, current: FieldValue) => FieldValue;
  /* validates the current value of field */
  validate?: (
    value: FieldValue,
    formState: Object,
    fieldState: Meta,
  ) => string | void | Promise<string | void>;
}

interface State<FieldValue, Element extends SupportedElements> {
  fieldProps: {
    onChange: (value: ChangeEvent<Element> | FieldValue) => void;
    onBlur: () => void;
    onFocus: () => void;
    value: FieldValue;
  };
  error?: string;
  valid: boolean;
  meta: Meta;
}

// Provides the id of the field to message components.
// This links the message with the field for screen-readers.
export const FieldId = React.createContext<string | undefined>(undefined);

function usePreviousRef<T>(current: T): MutableRefObject<T> {
  const ref = useRef(current);

  // will be updated on the next render
  useEffect(() => {
    ref.current = current;
  });

  // return the existing current (pre render)
  return ref;
}

function Field<
  FieldValue = string,
  Element extends SupportedElements = HTMLInputElement
>(props: Props<FieldValue, Element>) {
  const registerField = useContext(FormContext);
  const isDisabled = useContext(IsDisabledContext) || props.isDisabled;
  const [state, setState] = useState<State<FieldValue, Element>>({
    fieldProps: {
      onChange: () => {},
      onBlur: () => {},
      onFocus: () => {},
      value: isFunction(props.defaultValue)
        ? props.defaultValue()
        : props.defaultValue,
    },
    error: undefined,
    valid: false,
    meta: {
      dirty: false,
      dirtySinceLastSubmit: false,
      touched: false,
      valid: false,
      submitting: false,
      submitFailed: false,
      error: undefined,
      submitError: undefined,
    },
  });

  const latestPropsRef = usePreviousRef(props);
  const latestStateRef = usePreviousRef(state);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !process.env.CI) {
      invariant(
        latestPropsRef.current.name,
        '@atlaskit/form: Field components have a required name prop',
      );
    }

    function fieldStateToMeta(
      value: Partial<FieldState<FieldValue>> = {},
    ): Meta {
      return {
        dirty: value.dirty || false,
        dirtySinceLastSubmit: value.dirtySinceLastSubmit || false,
        touched: value.touched || false,
        valid: value.valid || false,
        submitting: value.submitting || false,
        submitFailed: value.submitFailed || false,
        error: value.error,
        submitError: value.submitError,
      };
    }

    const unregister = registerField<FieldValue>(
      latestPropsRef.current.name,
      latestPropsRef.current.defaultValue,
      fieldState => {
        /** Do not update dirtySinceLastSubmit until submission has finished. */
        const modifiedDirtySinceLastSubmit = fieldState.submitting
          ? latestStateRef.current.meta.dirtySinceLastSubmit
          : fieldState.dirtySinceLastSubmit;

        /** Do not update submitFailed until submission has finished. */
        const modifiedSubmitFailed = fieldState.submitting
          ? latestStateRef.current.meta.submitFailed
          : fieldState.submitFailed;

        /** Do not use submitError if the value has changed. */
        const modifiedSubmitError =
          modifiedDirtySinceLastSubmit && latestPropsRef.current.validate
            ? undefined
            : fieldState.submitError;
        const modifiedError =
          modifiedSubmitError ||
          ((fieldState.touched || fieldState.dirty) && fieldState.error);

        /**
         * If there has been a submit error, then use logic in modifiedError to determine validity,
         * so we can determine when there is a submit error which we do not want to display
         * because the value has been changed.
         */
        const modifiedValid = modifiedSubmitFailed
          ? modifiedError === undefined
          : fieldState.valid;

        function getTransform() {
          if (latestPropsRef.current.transform) {
            return latestPropsRef.current.transform;
          }

          return function fallback(event: ChangeEvent<Element>) {
            return isChangeEvent(event) ? event.target.value : event;
          };
        }

        setState({
          fieldProps: {
            onChange: e => {
              fieldState.change(
                getTransform()(
                  (e as unknown) as ChangeEvent<Element>,
                  fieldState.value!,
                ),
              );
            },
            onBlur: fieldState.blur,
            onFocus: fieldState.focus,
            value: fieldState.value!,
          },
          error: modifiedError,
          /**
           * The following parameters are optionally typed in final-form to indicate that not all parameters need
           * to be subscribed to. We cast them as booleans (using || false), since this is what they are semantically.
           */
          valid: modifiedValid || false,
          meta: fieldStateToMeta(fieldState),
        });
      },
      {
        dirty: true,
        dirtySinceLastSubmit: true,
        touched: true,
        valid: true,
        submitting: true,
        submitFailed: true,
        value: true,
        error: true,
        submitError: true,
      },
      {
        getValidator: () =>
          function validate(
            value: FieldValue,
            formState: Object,
            fieldState?: FieldState<FieldValue>,
          ) {
            const supplied = latestPropsRef.current.validate;
            if (supplied && fieldState) {
              return supplied(value, formState, fieldStateToMeta(fieldState));
            }
          },
      },
    );
    return unregister;
  }, [
    latestPropsRef,
    latestStateRef,
    props.defaultValue,
    props.name,
    registerField,
  ]);

  const fieldId = useMemo(
    () => (props.id ? props.id : `${name}-${uid({ id: name })}`),
    [props.id],
  );

  const extendedFieldProps = {
    ...state.fieldProps,
    name: props.name,
    isDisabled,
    isInvalid: Boolean(state.error),
    isRequired: Boolean(props.isRequired),
    'aria-invalid': (state.error ? 'true' : 'false') as 'true' | 'false',
    'aria-labelledby': `${fieldId}-label ${fieldId}-helper ${fieldId}-valid ${fieldId}-error`,
    id: fieldId,
  };

  return (
    <FieldWrapper>
      {props.label && (
        <Label id={`${fieldId}-label`} htmlFor={fieldId}>
          {props.label}
          {props.isRequired && (
            <RequiredIndicator aria-hidden="true">*</RequiredIndicator>
          )}
        </Label>
      )}
      <FieldId.Provider value={fieldId}>
        {props.children({
          fieldProps: extendedFieldProps,
          error: state.error,
          valid: state.valid,
          meta: state.meta,
        })}
      </FieldId.Provider>
    </FieldWrapper>
  );
}

Field.defaultProps = {
  defaultValue: undefined,
  isDisabled: false,
};

export default Field;
