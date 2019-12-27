import React from 'react';
import { KeyboardEvent } from 'react';
import { EditorView } from 'prosemirror-view';
import styled from 'styled-components';
import { colors } from '@atlaskit/theme';
import ChevronLeftLargeIcon from '@atlaskit/icon/glyph/chevron-left-large';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import { messages } from '../messages';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import Button from '../../../../floating-toolbar/ui/Button';
import PanelTextInput from '../../../../../ui/PanelTextInput';
import * as keymaps from '../../../../../keymaps';
import { closeMediaAltTextMenu, updateAltText } from '../commands';
import { undo, redo } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import { chainCommands } from 'prosemirror-commands';
import {
  withAnalyticsEvents,
  WithAnalyticsEventsProps,
} from '@atlaskit/analytics-next';
import {
  ACTION_SUBJECT,
  ACTION_SUBJECT_ID,
  EVENT_TYPE,
  fireAnalyticsEvent,
  ACTION,
  MediaAltTextActionType,
  FireAnalyticsCallback,
} from '../../../../analytics';
import { RECENT_SEARCH_WIDTH_IN_PX } from '../../../../../ui/RecentSearch/ToolbarComponents';

const tryUndoInputRuleElseUndoHistory = chainCommands(undoInputRule, undo);

export const CONTAINER_WIDTH_IN_PX = RECENT_SEARCH_WIDTH_IN_PX;
export const MAX_ALT_TEXT_LENGTH = 510; // double tweet length

const SupportText = styled.p`
  color: ${colors.N100};
  font-size: 12px;
  padding: 12px 40px;
  line-height: 20px;
  border-top: 1px solid ${colors.N30};
  margin: 0;
`;

const Container = styled.div`
  width: ${CONTAINER_WIDTH_IN_PX}px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  line-height: 2;
`;

const InputWrapper = styled.section`
  display: flex;
  line-height: 0;
  padding: 5px 0;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 4px 8px;
`;

const ClearText = styled.span`
  color: ${colors.N80};
`;

type Props = {
  view: EditorView;
  value?: string;
} & InjectedIntlProps &
  WithAnalyticsEventsProps;

export type AltTextEditComponentState = {
  showClearTextButton: boolean;
};

export class AltTextEditComponent extends React.Component<
  Props,
  AltTextEditComponentState
> {
  private fireCustomAnalytics?: FireAnalyticsCallback;
  state = {
    showClearTextButton: Boolean(this.props.value),
  };

  constructor(props: Props) {
    super(props);

    const { createAnalyticsEvent } = props;
    this.fireCustomAnalytics = fireAnalyticsEvent(createAnalyticsEvent);
  }

  prevValue: string | undefined;

  componentDidMount() {
    this.prevValue = this.props.value;
  }

  componentWillUnmount() {
    this.fireAnalytics(ACTION.CLOSED);
    if (!this.prevValue && this.props.value) {
      this.fireAnalytics(ACTION.ADDED);
    }
    if (this.prevValue && !this.props.value) {
      this.fireAnalytics(ACTION.CLEARED);
    }
    if (this.prevValue && this.prevValue !== this.props.value) {
      this.fireAnalytics(ACTION.EDITED);
    }
  }

  render() {
    const {
      intl: { formatMessage },
      value,
    } = this.props;
    const { showClearTextButton } = this.state;

    const backButtonMessage = formatMessage(messages.back);
    const backButtonMessageComponent = keymaps.renderTooltipContent(
      backButtonMessage,
      keymaps.escape,
      'Esc',
    );

    return (
      <Container>
        <InputWrapper>
          <ButtonWrapper>
            <Button
              title={formatMessage(messages.back)}
              icon={
                <ChevronLeftLargeIcon label={formatMessage(messages.back)} />
              }
              tooltipContent={backButtonMessageComponent}
              onClick={this.closeMediaAltTextMenu}
            />
          </ButtonWrapper>
          <PanelTextInput
            onUndo={this.onUndo}
            onRedo={this.onRedo}
            testId="alt-text-input"
            placeholder={formatMessage(messages.placeholder)}
            defaultValue={value ? value : ''}
            onCancel={this.dispatchCancelEvent}
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            onSubmit={this.closeMediaAltTextMenu}
            maxLength={MAX_ALT_TEXT_LENGTH}
            autoFocus
          />
          {showClearTextButton && (
            <ButtonWrapper>
              <Button
                title={formatMessage(messages.clear)}
                icon={
                  <ClearText>
                    <CrossCircleIcon label={formatMessage(messages.clear)} />
                  </ClearText>
                }
                tooltipContent={formatMessage(messages.clear)}
                onClick={this.handleClearText}
              />
            </ButtonWrapper>
          )}
        </InputWrapper>
        <SupportText>{formatMessage(messages.supportText)}</SupportText>
      </Container>
    );
  }

  private closeMediaAltTextMenu = () => {
    const { view } = this.props;
    closeMediaAltTextMenu(view.state, view.dispatch);
  };

  private onUndo = () => {
    const { view } = this.props;
    tryUndoInputRuleElseUndoHistory(view.state, view.dispatch);
  };

  private onRedo = () => {
    const { view } = this.props;
    redo(view.state, view.dispatch);
  };

  private fireAnalytics(actionType: MediaAltTextActionType) {
    const { createAnalyticsEvent } = this.props;
    if (createAnalyticsEvent && this.fireCustomAnalytics) {
      this.fireCustomAnalytics({
        payload: {
          action: actionType,
          actionSubject: ACTION_SUBJECT.MEDIA,
          actionSubjectId: ACTION_SUBJECT_ID.ALT_TEXT,
          eventType: EVENT_TYPE.TRACK,
        },
      });
    }
  }

  private dispatchCancelEvent = (event: KeyboardEvent) => {
    const { view } = this.props;

    // We need to pass down the ESCAPE keymap
    // because when we focus on the Toolbar, Prosemirror blur,
    // making all keyboard shortcuts not working
    view.someProp('handleKeyDown', (fn: any) => fn(view, event));
  };

  private updateAltText = (newAltText: string) => {
    const { view } = this.props;
    const newValue = newAltText.length === 0 ? null : newAltText;
    updateAltText(newValue)(view.state, view.dispatch);
  };

  private handleOnChange = (newAltText: string) => {
    this.setState({
      showClearTextButton: Boolean(newAltText),
    });
    this.updateAltText(newAltText);
  };

  private handleOnBlur = () => {
    // Handling the trimming onBlur() because PanelTextInput doesn't sync
    // defaultValue properly during unmount
    const { value } = this.props;
    const newAltText = (value || '').trim();

    this.handleOnChange(newAltText);
  };

  private handleClearText = () => {
    this.handleOnChange('');
  };
}

export default withAnalyticsEvents()(injectIntl(AltTextEditComponent));
