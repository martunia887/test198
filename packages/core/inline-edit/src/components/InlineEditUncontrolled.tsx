import * as React from 'react';

import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import ConfirmIcon from '@atlaskit/icon/glyph/check';
import CancelIcon from '@atlaskit/icon/glyph/cross';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import Form, { Field } from '@atlaskit/form';
import { colors } from '@atlaskit/theme';

import {
  InlineEditUncontrolledProps,
  FieldChildProps,
  FormChildProps,
} from '../types';
import ButtonsWrapper from '../styled/ButtonsWrapper';
import ButtonWrapper from '../styled/ButtonWrapper';
import ReadViewContentWrapper from '../styled/ReadViewContentWrapper';
import ContentWrapper from '../styled/ContentWrapper';
import EditButton from '../styled/EditButton';
import ReadViewWrapper from '../styled/ReadViewWrapper';
import ErrorDialog from '../styled/ErrorDialog';
import ErrorMessage from '../styled/ErrorMessage';
import HiddenButton from '../styled/HiddenButton';
import ButtonsContainer from '../styled/ButtonsContainer';

import {
  name as packageName,
  version as packageVersion,
} from '../version.json';

const DRAG_THRESHOLD = 5;

interface State {
  onReadViewHover: boolean;
  wasFocusReceivedSinceLastBlur: boolean;
  preventFocusOnEditButton: boolean;
}

class InlineEditUncontrolled extends React.Component<
  InlineEditUncontrolledProps,
  State
> {
  static defaultProps = {
    keepEditViewOpenOnBlur: false,
    hideActionButtons: false,
    isRequired: false,
    readViewFitContainerWidth: false,
    editButtonLabel: 'Edit',
    confirmButtonLabel: 'Confirm',
    cancelButtonLabel: 'Cancel',
  };

  editButtonRef?: HTMLElement;

  startX: number = 0;
  startY: number = 0;

  state = {
    onReadViewHover: false,
    wasFocusReceivedSinceLastBlur: false,
    preventFocusOnEditButton: false,
  };

  componentDidUpdate(prevProps: InlineEditUncontrolledProps) {
    /**
     * This logic puts the focus on the edit button after confirming using
     * the confirm button or using the keyboard to confirm, but not when
     * it is confirmed by wrapper blur
     */
    if (prevProps.isEditing && !this.props.isEditing) {
      if (this.state.preventFocusOnEditButton) {
        this.setState({ preventFocusOnEditButton: false });
      } else if (this.editButtonRef) {
        this.editButtonRef.focus();
      }
    }
  }

  onCancelClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    this.props.onCancel();
  };

  onReadViewClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => {
    const element = event.target as HTMLElement;
    /** If a link is clicked in the read view, default action should be taken */
    if (element.tagName.toLowerCase() !== 'a' && !this.mouseHasMoved(event)) {
      event.preventDefault();
      this.props.onEditRequested();
      this.setState({ preventFocusOnEditButton: true });
    }
  };

  mouseHasMoved = (event: { clientX: number; clientY: number }) => {
    return (
      Math.abs(this.startX - event.clientX) >= DRAG_THRESHOLD ||
      Math.abs(this.startY - event.clientY) >= DRAG_THRESHOLD
    );
  };

  /** Unless keepEditViewOpenOnBlur prop is true, will call confirmIfUnfocused() which
   *  confirms the value, unless the focus is transferred to the buttons
   */
  onWrapperBlur = (
    isInvalid: boolean,
    onSubmit: (e: React.FormEvent | any) => void,
    formRef: React.RefObject<HTMLFormElement>,
  ) => {
    if (!this.props.keepEditViewOpenOnBlur) {
      this.setState({ wasFocusReceivedSinceLastBlur: false });
      /**
       * This ensures that clicking on one of the action buttons will call
       * onWrapperFocus before confirmIfUnfocused is called
       */
      setTimeout(() => this.confirmIfUnfocused(isInvalid, onSubmit, formRef));
    }
  };

  /** Gets called when focus is transferred to the editView, or action buttons */
  onWrapperFocus = () => {
    this.setState({ wasFocusReceivedSinceLastBlur: true });
  };

  confirmIfUnfocused = (
    isInvalid: boolean,
    onSubmit: (e: React.FormEvent | any) => void,
    formRef: React.RefObject<HTMLFormElement>,
  ) => {
    if (
      !isInvalid &&
      !this.state.wasFocusReceivedSinceLastBlur &&
      formRef.current
    ) {
      this.setState({ preventFocusOnEditButton: true });
      if (formRef.current.checkValidity()) {
        onSubmit({});
      }
    }
  };

  renderReadView = () => {
    const { editButtonLabel, readView, readViewFitContainerWidth } = this.props;
    return (
      <ReadViewWrapper>
        <EditButton
          aria-label={editButtonLabel}
          type="button"
          onClick={this.props.onEditRequested}
          innerRef={ref => {
            this.editButtonRef = ref;
          }}
        />
        <ReadViewContentWrapper
          onMouseEnter={() => this.setState({ onReadViewHover: true })}
          onMouseLeave={() => this.setState({ onReadViewHover: false })}
          onClick={this.onReadViewClick}
          onMouseDown={e => {
            this.startX = e.clientX;
            this.startY = e.clientY;
          }}
          readViewFitContainerWidth={readViewFitContainerWidth}
        >
          {readView()}
        </ReadViewContentWrapper>
      </ReadViewWrapper>
    );
  };

  renderActionButtons = () => {
    const { confirmButtonLabel, cancelButtonLabel } = this.props;
    return (
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button
            aria-label={confirmButtonLabel}
            type="submit"
            iconBefore={<ConfirmIcon label="Confirm" size="small" />}
            shouldFitContainer
            onMouseDown={() => {
              /** Prevents focus on edit button only if mouse is used to click button */
              this.setState({ preventFocusOnEditButton: true });
            }}
          />
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            aria-label={cancelButtonLabel}
            iconBefore={<CancelIcon label="Cancel" size="small" />}
            onClick={this.onCancelClick}
            onMouseDown={() => {
              /** Prevents focus on edit button only if mouse is used to click button */
              this.setState({ preventFocusOnEditButton: true });
            }}
            shouldFitContainer
          />
        </ButtonWrapper>
      </ButtonsWrapper>
    );
  };

  render() {
    const {
      defaultValue,
      hideActionButtons,
      isEditing,
      isRequired,
      label,
      name,
      onConfirm,
      validate,
    } = this.props;
    return (
      <Form
        onSubmit={async (data: Record<string, any>) => {
          // @ts-ignore - HOC passes analytics event
          const error = await onConfirm(data[name], name);
          return { [name]: error };
        }}
      >
        {({
          formProps: { onKeyDown, onSubmit, ref: formRef },
        }: FormChildProps) => (
          <form
            onKeyDown={e => {
              onKeyDown(e);
              if (e.key === 'Esc' || e.key === 'Escape') {
                this.props.onCancel();
              }
            }}
            onSubmit={onSubmit}
            ref={formRef}
          >
            {isEditing ? (
              <Field
                name={name}
                label={label}
                defaultValue={defaultValue}
                validate={validate}
                isRequired={isRequired}
              >
                {({ fieldProps, error }: FieldChildProps) => (
                  <ContentWrapper
                    onBlur={() =>
                      this.onWrapperBlur(
                        fieldProps.isInvalid,
                        onSubmit,
                        formRef,
                      )
                    }
                    onFocus={this.onWrapperFocus}
                  >
                    {this.props.editView(fieldProps)}
                    <ButtonsContainer>
                      {error && (
                        <ErrorDialog>
                          <ErrorIcon label="Error" primaryColor={colors.R400} />
                          <ErrorMessage>{error}</ErrorMessage>
                        </ErrorDialog>
                      )}
                      {!hideActionButtons ? (
                        this.renderActionButtons()
                      ) : (
                        /** This is to allow Ctrl + Enter to submit without action buttons */
                        <HiddenButton type="submit" />
                      )}
                    </ButtonsContainer>
                  </ContentWrapper>
                )}
              </Field>
            ) : (
              /** Field is used here only for the label */
              <Field
                name={name}
                label={label}
                defaultValue=""
                isRequired={isRequired}
              >
                {() => this.renderReadView()}
              </Field>
            )}
          </form>
        )}
      </Form>
    );
  }
}

const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'inlineEdit',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onConfirm: createAndFireEventOnAtlaskit({
      action: 'confirmed',
      actionSubject: 'inlineEdit',

      attributes: {
        componentName: 'inlineEdit',
        packageName,
        packageVersion,
      },
    }),
  })(InlineEditUncontrolled),
);
