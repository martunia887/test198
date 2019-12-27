import * as React from 'react';
import { ReactInstance } from 'react';
import * as ReactDOM from 'react-dom';
import { defineMessages, injectIntl, InjectedIntlProps } from 'react-intl';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import AddIcon from '@atlaskit/icon/glyph/editor/add';
import ExpandIcon from '@atlaskit/icon/glyph/chevron-down';
import TableIcon from '@atlaskit/icon/glyph/editor/table';
import EditorImageIcon from '@atlaskit/icon/glyph/editor/image';
import CodeIcon from '@atlaskit/icon/glyph/editor/code';
import InfoIcon from '@atlaskit/icon/glyph/editor/info';
import MentionIcon from '@atlaskit/icon/glyph/editor/mention';
import TaskIcon from '@atlaskit/icon/glyph/editor/task';
import DecisionIcon from '@atlaskit/icon/glyph/editor/decision';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import EditorMoreIcon from '@atlaskit/icon/glyph/editor/more';
import LinkIcon from '@atlaskit/icon/glyph/editor/link';
import EmojiIcon from '@atlaskit/icon/glyph/editor/emoji';
import DateIcon from '@atlaskit/icon/glyph/editor/date';
import StatusIcon from '@atlaskit/icon/glyph/status';
import ExpandNodeIcon from '@atlaskit/icon/glyph/chevron-right-circle';
import PlaceholderTextIcon from '@atlaskit/icon/glyph/media-services/text';
import LayoutTwoEqualIcon from '@atlaskit/icon/glyph/editor/layout-two-equal';
import HorizontalRuleIcon from '@atlaskit/icon/glyph/editor/horizontal-rule';
import { EmojiPicker as AkEmojiPicker } from '@atlaskit/emoji/picker';
import { EmojiProvider } from '@atlaskit/emoji/resource';
import { EmojiId } from '@atlaskit/emoji/types';
import { Popup, akEditorMenuZIndex } from '@atlaskit/editor-common';

import EditorActions from '../../../../actions';
import {
  analyticsService as analytics,
  withAnalytics,
} from '../../../../analytics';
import {
  toggleTable,
  tooltip,
  findKeymapByDescription,
  addLink,
  findShortcutByDescription,
  renderTooltipContent,
} from '../../../../keymaps';
import { InsertMenuCustomItem, CommandDispatch } from '../../../../types';
import DropdownMenu from '../../../../ui/DropdownMenu';
import ToolbarButton from '../../../../ui/ToolbarButton';
import {
  Wrapper,
  ButtonGroup,
  ExpandIconWrapper,
  Shortcut,
} from '../../../../ui/styles';
import { BlockType } from '../../../block-type/types';
import { MacroProvider } from '../../../macro/types';
import { createTable } from '../../../table/commands';
import { insertDate, openDatePicker } from '../../../date/actions';
import { showPlaceholderFloatingToolbar } from '../../../placeholder-text/actions';
import { createHorizontalRule } from '../../../rule/pm-plugins/input-rule';
import { TriggerWrapper } from './styles';
import { insertLayoutColumnsWithAnalytics } from '../../../layout/actions';
import { insertTaskDecision } from '../../../tasks-and-decisions/commands';
import { insertExpand } from '../../../expand/commands';
import { Command } from '../../../../types';
import { showLinkToolbar } from '../../../hyperlink/commands';
import { insertMentionQuery } from '../../../mentions/commands/insert-mention-query';
import { updateStatusWithAnalytics } from '../../../status/actions';
import {
  withAnalytics as commandWithAnalytics,
  ACTION,
  ACTION_SUBJECT,
  INPUT_METHOD,
  EVENT_TYPE,
  ACTION_SUBJECT_ID,
  DispatchAnalyticsEvent,
} from '../../../analytics';
import { insertEmoji } from '../../../emoji/commands/insert-emoji';
import { DropdownItem } from '../../../block-type/ui/ToolbarBlockType';

export const messages = defineMessages({
  action: {
    id: 'fabric.editor.action',
    defaultMessage: 'Action item',
    description: 'Also known as a “task”, “to do item”, or a checklist',
  },
  actionDescription: {
    id: 'fabric.editor.action.description',
    defaultMessage: 'Create and assign action items',
    description: '',
  },
  link: {
    id: 'fabric.editor.link',
    defaultMessage: 'Link',
    description: 'Insert a hyperlink',
  },
  linkDescription: {
    id: 'fabric.editor.link.description',
    defaultMessage: 'Insert a link',
    description: 'Insert a hyperlink',
  },
  filesAndImages: {
    id: 'fabric.editor.filesAndImages',
    defaultMessage: 'Files & images',
    description: 'Insert one or more files or images',
  },
  filesAndImagesDescription: {
    id: 'fabric.editor.filesAndImages.description',
    defaultMessage: 'Add images and other files to your page',
    description: 'Insert one or more files or images',
  },
  image: {
    id: 'fabric.editor.image',
    defaultMessage: 'Image',
    description: 'Insert an image.',
  },
  mention: {
    id: 'fabric.editor.mention',
    defaultMessage: 'Mention',
    description: 'Reference another person in your document',
  },
  mentionDescription: {
    id: 'fabric.editor.mention.description',
    defaultMessage: 'Mention someone to send them a notification',
    description: 'Reference another person in your document',
  },
  emoji: {
    id: 'fabric.editor.emoji',
    defaultMessage: 'Emoji',
    description: 'Insert an emoticon or smiley :-)',
  },
  emojiDescription: {
    id: 'fabric.editor.emoji.description',
    defaultMessage: 'Use emojis to express ideas 🎉 and emotions 😄',
    description: 'Insert an emoticon or smiley :-)',
  },
  table: {
    id: 'fabric.editor.table',
    defaultMessage: 'Table',
    description: 'Inserts a table in the document',
  },
  tableDescription: {
    id: 'fabric.editor.table.description',
    defaultMessage: 'Insert a table',
    description: 'Inserts a table in the document',
  },
  expand: {
    id: 'fabric.editor.expand',
    defaultMessage: 'Expand',
    description: 'Inserts an expand in the document',
  },
  expandDescription: {
    id: 'fabric.editor.expand.description',
    defaultMessage: 'Insert an expand',
    description: 'Inserts an expand in the document',
  },
  decision: {
    id: 'fabric.editor.decision',
    defaultMessage: 'Decision',
    description: 'Capture a decision you’ve made',
  },
  decisionDescription: {
    id: 'fabric.editor.decision.description',
    defaultMessage: 'Capture decisions so they’re easy to track',
    description: 'Capture a decision you’ve made',
  },
  feedbackDialog: {
    id: 'fabric.editor.feedbackDialog',
    defaultMessage: 'Give feedback',
    description: 'Open the feedback dialog from editor',
  },
  feedbackDialogDescription: {
    id: 'fabric.editor.feedbackDialog.description',
    defaultMessage: 'Tell us about your experience using the new editor',
    description: 'Description for feedback option under quick insert dropdown',
  },
  horizontalRule: {
    id: 'fabric.editor.horizontalRule',
    defaultMessage: 'Divider',
    description: 'A horizontal rule or divider',
  },
  horizontalRuleDescription: {
    id: 'fabric.editor.horizontalRule.description',
    defaultMessage: 'Separate content with a horizontal line',
    description: 'A horizontal rule or divider',
  },
  date: {
    id: 'fabric.editor.date',
    defaultMessage: 'Date',
    description: 'Opens a date picker that lets you select a date',
  },
  dateDescription: {
    id: 'fabric.editor.date.description',
    defaultMessage: 'Add a date using a calendar',
    description: 'Opens a date picker that lets you select a date',
  },
  placeholderText: {
    id: 'fabric.editor.placeholderText',
    defaultMessage: 'Placeholder text',
    description: '',
  },
  columns: {
    id: 'fabric.editor.columns',
    defaultMessage: 'Layouts',
    description: 'Create a multi column section or layout',
  },
  columnsDescription: {
    id: 'fabric.editor.columns.description',
    defaultMessage: 'Structure your page using sections',
    description: 'Create a multi column section or layout',
  },
  status: {
    id: 'fabric.editor.status',
    defaultMessage: 'Status',
    description:
      'Inserts an item representing the status of an activity to task.',
  },
  statusDescription: {
    id: 'fabric.editor.status.description',
    defaultMessage: 'Add a custom status label',
    description:
      'Inserts an item representing the status of an activity to task.',
  },
  viewMore: {
    id: 'fabric.editor.viewMore',
    defaultMessage: 'View more',
    description: '',
  },
  insertMenu: {
    id: 'fabric.editor.insertMenu',
    defaultMessage: 'Insert',
    description:
      'Opens a menu of additional items that can be inserted into your document.',
  },
  help: {
    id: 'fabric.editor.help',
    defaultMessage: 'Help',
    description: 'Opens up the help dialog',
  },
  helpDescription: {
    id: 'fabric.editor.help.description',
    defaultMessage: 'Browse all the keyboard shortcuts and markdown options',
    description: 'Browse all the keyboard shortcuts and markdown options',
  },
});

export interface Props {
  buttons: number;
  isReducedSpacing: boolean;
  isDisabled?: boolean;
  isTypeAheadAllowed?: boolean;
  editorView: EditorView;
  editorActions?: EditorActions;
  tableSupported?: boolean;
  mentionsEnabled?: boolean;
  actionSupported?: boolean;
  decisionSupported?: boolean;
  mentionsSupported?: boolean;
  insertMentionQuery?: () => void;
  mediaUploadsEnabled?: boolean;
  mediaSupported?: boolean;
  imageUploadSupported?: boolean;
  imageUploadEnabled?: boolean;
  handleImageUpload?: (event?: Event) => Command;
  dateEnabled?: boolean;
  horizontalRuleEnabled?: boolean;
  placeholderTextEnabled?: boolean;
  layoutSectionEnabled?: boolean;
  expandEnabled?: boolean;
  emojiProvider?: Promise<EmojiProvider>;
  availableWrapperBlockTypes?: BlockType[];
  linkSupported?: boolean;
  linkDisabled?: boolean;
  emojiDisabled?: boolean;
  nativeStatusSupported?: boolean;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  macroProvider?: MacroProvider | null;
  insertMenuItems?: InsertMenuCustomItem[];
  onShowMediaPicker?: () => void;
  onInsertBlockType?: (name: string) => Command;
  onInsertMacroFromMacroBrowser?: (
    macroProvider: MacroProvider,
    node?: PMNode,
    isEditing?: boolean,
  ) => (state: EditorState, dispatch: CommandDispatch) => void;
  dispatchAnalyticsEvent?: DispatchAnalyticsEvent;
}

export interface State {
  isOpen: boolean;
  emojiPickerOpen: boolean;
}

export type TOOLBAR_MENU_TYPE = INPUT_METHOD.TOOLBAR | INPUT_METHOD.INSERT_MENU;

const blockTypeIcons = {
  codeblock: CodeIcon,
  panel: InfoIcon,
  blockquote: QuoteIcon,
};

/**
 * Checks if an element is detached (i.e. not in the current document)
 */
const isDetachedElement = (el: HTMLElement) => !document.body.contains(el);
const noop = () => {};

class ToolbarInsertBlock extends React.PureComponent<
  Props & InjectedIntlProps,
  State
> {
  private pickerRef?: ReactInstance;
  private button?: HTMLElement;

  state: State = {
    isOpen: false,
    emojiPickerOpen: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    // If number of visible buttons changed, close emoji picker
    if (nextProps.buttons !== this.props.buttons) {
      this.setState({ emojiPickerOpen: false });
    }
  }

  private onOpenChange = (attrs: { isOpen: boolean; open?: boolean }) => {
    const state = {
      isOpen: attrs.isOpen,
      emojiPickerOpen: this.state.emojiPickerOpen,
    };
    if (this.state.emojiPickerOpen && !attrs.open) {
      state.emojiPickerOpen = false;
    }
    this.setState(state);
  };

  private handleTriggerClick = () => {
    const { isOpen } = this.state;
    this.onOpenChange({ isOpen: !isOpen });
  };

  private toggleEmojiPicker = (
    inputMethod: TOOLBAR_MENU_TYPE = INPUT_METHOD.TOOLBAR,
  ) => {
    this.setState(
      prevState => ({ emojiPickerOpen: !prevState.emojiPickerOpen }),
      () => {
        if (this.state.emojiPickerOpen) {
          const { dispatchAnalyticsEvent } = this.props;
          if (dispatchAnalyticsEvent) {
            dispatchAnalyticsEvent({
              action: ACTION.OPENED,
              actionSubject: ACTION_SUBJECT.PICKER,
              actionSubjectId: ACTION_SUBJECT_ID.PICKER_EMOJI,
              attributes: { inputMethod },
              eventType: EVENT_TYPE.UI,
            });
          }
        }
      },
    );
  };

  private renderPopup() {
    const { emojiPickerOpen } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      emojiProvider,
    } = this.props;
    if (!emojiPickerOpen || !this.button || !emojiProvider) {
      return null;
    }

    return (
      <Popup
        target={this.button}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        scrollableElement={popupsScrollableElement}
      >
        <AkEmojiPicker
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          onPickerRef={this.onPickerRef}
        />
      </Popup>
    );
  }

  private handleButtonRef = (ref: HTMLElement): void => {
    const buttonRef = ref || null;
    if (buttonRef) {
      this.button = ReactDOM.findDOMNode(buttonRef) as HTMLElement;
    }
  };

  private handleDropDownButtonRef = (
    ref: ToolbarButton | null,
    items: Array<any>,
  ) => {
    items.forEach(item => item.handleRef && item.handleRef(ref));
  };

  private onPickerRef = (ref: any) => {
    if (ref) {
      document.addEventListener('click', this.handleClickOutside);
    } else {
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.pickerRef = ref;
  };

  private handleClickOutside = (e: MouseEvent) => {
    const picker = this.pickerRef && ReactDOM.findDOMNode(this.pickerRef);
    // Ignore click events for detached elements.
    // Workaround for FS-1322 - where two onClicks fire - one when the upload button is
    // still in the document, and one once it's detached. Does not always occur, and
    // may be a side effect of a react render optimisation
    if (
      !picker ||
      (e.target &&
        !isDetachedElement(e.target as HTMLElement) &&
        !picker.contains(e.target as HTMLElement))
    ) {
      this.toggleEmojiPicker();
    }
  };

  private getShortcutBlock = (blockType: BlockType) => {
    switch (blockType.name) {
      case 'blockquote':
        return '>';
      case 'codeblock':
        return '```';
      default:
        return tooltip(findKeymapByDescription(blockType.title.defaultMessage));
    }
  };

  render() {
    const { isOpen } = this.state;
    const {
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      isDisabled,
      buttons: numberOfButtons,
      isReducedSpacing,
      intl: { formatMessage },
    } = this.props;

    const items = this.createItems();
    const buttons = items.slice(0, numberOfButtons);
    const dropdownItems = items.slice(numberOfButtons);

    if (items.length === 0) {
      return null;
    }

    const labelInsertMenu = formatMessage(messages.insertMenu);

    findShortcutByDescription(messages.insertMenu.description);

    const toolbarButtonFactory = (disabled: boolean, items: Array<any>) => (
      <ToolbarButton
        ref={el => this.handleDropDownButtonRef(el, items)}
        selected={isOpen}
        disabled={disabled}
        onClick={this.handleTriggerClick}
        spacing={isReducedSpacing ? 'none' : 'default'}
        title={renderTooltipContent(labelInsertMenu, undefined, '/')}
        iconBefore={
          <TriggerWrapper>
            <AddIcon label={labelInsertMenu} />
            <ExpandIconWrapper>
              <ExpandIcon label={labelInsertMenu} />
            </ExpandIconWrapper>
          </TriggerWrapper>
        }
      />
    );

    return (
      <ButtonGroup width={isReducedSpacing ? 'small' : 'large'}>
        {buttons.map(btn => (
          <ToolbarButton
            ref={btn.handleRef || noop}
            key={btn.content}
            spacing={isReducedSpacing ? 'none' : 'default'}
            disabled={isDisabled || btn.isDisabled}
            iconBefore={btn.elemBefore}
            selected={btn.isActive}
            title={renderTooltipContent(btn.content, undefined, btn.shortcut)}
            onClick={() => this.insertToolbarMenuItem(btn)}
          />
        ))}
        <Wrapper>
          {this.renderPopup()}
          {dropdownItems.length > 0 &&
            (!isDisabled ? (
              <DropdownMenu
                items={[{ items: dropdownItems }]}
                onItemActivated={this.insertInsertMenuItem}
                onOpenChange={this.onOpenChange}
                mountTo={popupsMountPoint}
                boundariesElement={popupsBoundariesElement}
                scrollableElement={popupsScrollableElement}
                isOpen={isOpen}
                fitHeight={188}
                fitWidth={175}
                zIndex={akEditorMenuZIndex}
              >
                {toolbarButtonFactory(false, dropdownItems)}
              </DropdownMenu>
            ) : (
              <div>{toolbarButtonFactory(true, dropdownItems)}</div>
            ))}
        </Wrapper>
      </ButtonGroup>
    );
  }

  private createItems = () => {
    const {
      isTypeAheadAllowed,
      tableSupported,
      mediaUploadsEnabled,
      mediaSupported,
      imageUploadSupported,
      imageUploadEnabled,
      mentionsSupported,
      availableWrapperBlockTypes,
      actionSupported,
      decisionSupported,
      macroProvider,
      linkSupported,
      linkDisabled,
      emojiDisabled,
      emojiProvider,
      nativeStatusSupported,
      insertMenuItems,
      dateEnabled,
      placeholderTextEnabled,
      horizontalRuleEnabled,
      layoutSectionEnabled,
      expandEnabled,
      intl: { formatMessage },
    } = this.props;
    let items: any[] = [];

    if (actionSupported) {
      const labelAction = formatMessage(messages.action);
      items.push({
        content: labelAction,
        value: { name: 'action' },
        elemBefore: <TaskIcon label={labelAction} />,
        elemAfter: <Shortcut>{'[]'}</Shortcut>,
        shortcut: '[]',
      });
    }

    if (linkSupported) {
      const labelLink = formatMessage(messages.link);
      const shortcutLink = tooltip(addLink);
      items.push({
        content: labelLink,
        value: { name: 'link' },
        isDisabled: linkDisabled,
        elemBefore: <LinkIcon label={labelLink} />,
        elemAfter: shortcutLink && <Shortcut>{shortcutLink}</Shortcut>,
        shortcut: shortcutLink,
      });
    }
    if (mediaSupported && mediaUploadsEnabled) {
      const labelFilesAndImages = formatMessage(messages.filesAndImages);
      items.push({
        content: labelFilesAndImages,
        value: { name: 'media' },
        elemBefore: <EditorImageIcon label={labelFilesAndImages} />,
      });
    }
    if (imageUploadSupported) {
      const labelImage = formatMessage(messages.image);
      items.push({
        content: labelImage,
        value: { name: 'image upload' },
        isDisabled: !imageUploadEnabled,
        elemBefore: <EditorImageIcon label={labelImage} />,
      });
    }
    if (mentionsSupported) {
      const labelMention = formatMessage(messages.mention);
      items.push({
        content: labelMention,
        value: { name: 'mention' },
        isDisabled: !isTypeAheadAllowed,
        elemBefore: <MentionIcon label={labelMention} />,
        elemAfter: <Shortcut>@</Shortcut>,
        shortcut: '@',
      });
    }
    if (emojiProvider) {
      const labelEmoji = formatMessage(messages.emoji);
      items.push({
        content: labelEmoji,
        value: { name: 'emoji' },
        isDisabled: emojiDisabled || !isTypeAheadAllowed,
        elemBefore: <EmojiIcon label={labelEmoji} />,
        handleRef: this.handleButtonRef,
        elemAfter: <Shortcut>:</Shortcut>,
        shortcut: ':',
      });
    }
    if (tableSupported) {
      const labelTable = formatMessage(messages.table);
      const shortcutTable = tooltip(toggleTable);
      items.push({
        content: labelTable,
        value: { name: 'table' },
        elemBefore: <TableIcon label={labelTable} />,
        elemAfter: shortcutTable && <Shortcut>{shortcutTable}</Shortcut>,
        shortcut: shortcutTable,
      });
    }
    if (layoutSectionEnabled) {
      const labelColumns = formatMessage(messages.columns);
      items.push({
        content: labelColumns,
        value: { name: 'layout' },
        elemBefore: <LayoutTwoEqualIcon label={labelColumns} />,
      });
    }
    if (availableWrapperBlockTypes) {
      availableWrapperBlockTypes.forEach(blockType => {
        const BlockTypeIcon =
          blockTypeIcons[blockType.name as keyof typeof blockTypeIcons];
        const labelBlock = formatMessage(blockType.title);
        const shortcutBlock = this.getShortcutBlock(blockType);
        items.push({
          content: labelBlock,
          value: blockType,
          elemBefore: <BlockTypeIcon label={labelBlock} />,
          elemAfter: shortcutBlock && <Shortcut>{shortcutBlock}</Shortcut>,
          shortcut: shortcutBlock,
        });
      });
    }
    if (decisionSupported) {
      const labelDecision = formatMessage(messages.decision);
      items.push({
        content: labelDecision,
        value: { name: 'decision' },
        elemBefore: <DecisionIcon label={labelDecision} />,
        elemAfter: <Shortcut>{'<>'}</Shortcut>,
        shortcut: '<>',
      });
    }
    if (
      horizontalRuleEnabled &&
      this.props.editorView.state.schema.nodes.rule
    ) {
      const labelHorizontalRule = formatMessage(messages.horizontalRule);
      items.push({
        content: labelHorizontalRule,
        value: { name: 'horizontalrule' },
        elemBefore: <HorizontalRuleIcon label={labelHorizontalRule} />,
        elemAfter: <Shortcut>---</Shortcut>,
        shortcut: '---',
      });
    }

    if (expandEnabled && this.props.editorView.state.schema.nodes.expand) {
      const labelExpand = formatMessage(messages.expand);
      items.push({
        content: labelExpand,
        value: { name: 'expand' },
        elemBefore: <ExpandNodeIcon label={labelExpand} />,
      });
    }

    if (dateEnabled) {
      const labelDate = formatMessage(messages.date);
      items.push({
        content: labelDate,
        value: { name: 'date' },
        elemBefore: <DateIcon label={labelDate} />,
        elemAfter: <Shortcut>//</Shortcut>,
        shortcut: '//',
      });
    }

    if (placeholderTextEnabled) {
      const labelPlaceholderText = formatMessage(messages.placeholderText);
      items.push({
        content: labelPlaceholderText,
        value: { name: 'placeholder text' },
        elemBefore: <PlaceholderTextIcon label={labelPlaceholderText} />,
      });
    }

    if (nativeStatusSupported) {
      const labelStatus = formatMessage(messages.status);
      items.push({
        content: labelStatus,
        value: { name: 'status' },
        elemBefore: <StatusIcon label={labelStatus} />,
      });
    }

    if (insertMenuItems) {
      items = items.concat(insertMenuItems);
      // keeping this here for backwards compatibility so confluence
      // has time to implement this button before it disappears.
      // Should be safe to delete soon. If in doubt ask Leandro Lemos (llemos)
    } else if (typeof macroProvider !== 'undefined' && macroProvider) {
      const labelViewMore = formatMessage(messages.viewMore);
      items.push({
        content: labelViewMore,
        value: { name: 'macro' },
        elemBefore: <EditorMoreIcon label={labelViewMore} />,
      });
    }
    return items;
  };

  private toggleLinkPanel = withAnalytics(
    'atlassian.editor.format.hyperlink.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      showLinkToolbar(inputMethod)(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private insertMention = withAnalytics(
    'atlassian.fabric.mention.picker.trigger.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      insertMentionQuery(inputMethod)(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private insertTable = withAnalytics(
    'atlassian.editor.format.table.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      return commandWithAnalytics({
        action: ACTION.INSERTED,
        actionSubject: ACTION_SUBJECT.DOCUMENT,
        actionSubjectId: ACTION_SUBJECT_ID.TABLE,
        attributes: { inputMethod },
        eventType: EVENT_TYPE.TRACK,
      })(createTable)(editorView.state, editorView.dispatch);
    },
  );

  private createDate = withAnalytics(
    'atlassian.editor.format.date.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      insertDate(undefined, inputMethod)(editorView.state, editorView.dispatch);
      openDatePicker()(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private createPlaceholderText = withAnalytics(
    'atlassian.editor.format.placeholder.button',
    (): boolean => {
      const { editorView } = this.props;
      showPlaceholderFloatingToolbar(editorView.state, editorView.dispatch);
      return true;
    },
  );

  private insertLayoutColumns = withAnalytics(
    'atlassian.editor.format.layout.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      insertLayoutColumnsWithAnalytics(inputMethod)(
        editorView.state,
        editorView.dispatch,
      );
      return true;
    },
  );

  private createStatus = withAnalytics(
    'atlassian.editor.format.status.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;
      updateStatusWithAnalytics(inputMethod)(
        editorView.state,
        editorView.dispatch,
      );
      return true;
    },
  );

  private openMediaPicker = withAnalytics(
    'atlassian.editor.format.media.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { onShowMediaPicker, dispatchAnalyticsEvent } = this.props;
      if (onShowMediaPicker) {
        onShowMediaPicker();
        if (dispatchAnalyticsEvent) {
          dispatchAnalyticsEvent({
            action: ACTION.OPENED,
            actionSubject: ACTION_SUBJECT.PICKER,
            actionSubjectId: ACTION_SUBJECT_ID.PICKER_CLOUD,
            attributes: { inputMethod },
            eventType: EVENT_TYPE.UI,
          });
        }
      }
      return true;
    },
  );

  private insertTaskDecision = (
    name: 'action' | 'decision',
    inputMethod: TOOLBAR_MENU_TYPE,
  ) =>
    withAnalytics(`atlassian.fabric.${name}.trigger.button`, (): boolean => {
      const { editorView } = this.props;
      if (!editorView) {
        return false;
      }
      const listType = name === 'action' ? 'taskList' : 'decisionList';
      insertTaskDecision(
        editorView,
        listType,
        inputMethod,
      )(editorView.state, editorView.dispatch);
      return true;
    });

  private insertHorizontalRule = withAnalytics(
    'atlassian.editor.format.horizontalrule.button',
    (inputMethod: TOOLBAR_MENU_TYPE): boolean => {
      const { editorView } = this.props;

      const tr = createHorizontalRule(
        editorView.state,
        editorView.state.selection.from,
        editorView.state.selection.to,
        inputMethod,
      );

      if (tr) {
        editorView.dispatch(tr);
        return true;
      }

      return false;
    },
  );

  private insertExpand = (): boolean => {
    const { state, dispatch } = this.props.editorView;
    return insertExpand(state, dispatch);
  };

  private insertBlockType = (itemName: string) =>
    withAnalytics(`atlassian.editor.format.${itemName}.button`, () => {
      const { editorView, onInsertBlockType } = this.props;
      const { state, dispatch } = editorView;

      onInsertBlockType!(itemName)(state, dispatch);
      return true;
    });

  private handleSelectedEmoji = withAnalytics(
    'atlassian.editor.emoji.button',
    (emojiId: EmojiId): boolean => {
      this.props.editorView.focus();
      insertEmoji(emojiId, INPUT_METHOD.PICKER)(
        this.props.editorView.state,
        this.props.editorView.dispatch,
      );
      this.toggleEmojiPicker();
      return true;
    },
  );

  private onItemActivated = ({
    item,
    inputMethod,
  }: {
    item: any;
    inputMethod: TOOLBAR_MENU_TYPE;
  }): void => {
    const {
      editorView,
      editorActions,
      onInsertMacroFromMacroBrowser,
      macroProvider,
      handleImageUpload,
      expandEnabled,
    } = this.props;

    // need to do this before inserting nodes so scrollIntoView works properly
    if (!editorView.hasFocus()) {
      editorView.focus();
    }

    switch (item.value.name) {
      case 'link':
        this.toggleLinkPanel(inputMethod);
        break;
      case 'table':
        this.insertTable(inputMethod);
        break;
      case 'image upload':
        if (handleImageUpload) {
          const { state, dispatch } = editorView;
          handleImageUpload()(state, dispatch);
        }
        break;
      case 'media':
        this.openMediaPicker(inputMethod);
        break;
      case 'mention':
        this.insertMention(inputMethod);
        break;
      case 'emoji':
        this.toggleEmojiPicker(inputMethod);
        break;
      case 'codeblock':
      case 'blockquote':
      case 'panel':
        this.insertBlockType(item.value.name)();
        break;
      case 'action':
      case 'decision':
        this.insertTaskDecision(item.value.name, inputMethod)();
        break;

      case 'horizontalrule':
        this.insertHorizontalRule(inputMethod);
        break;
      case 'macro':
        analytics.trackEvent(
          `atlassian.editor.format.${item.value.name}.button`,
        );
        onInsertMacroFromMacroBrowser!(macroProvider!)(
          editorView.state,
          editorView.dispatch,
        );
        break;
      case 'date':
        this.createDate();
        break;
      case 'placeholder text':
        this.createPlaceholderText();
        break;
      case 'layout':
        this.insertLayoutColumns(inputMethod);
        break;
      case 'status':
        this.createStatus(inputMethod);
        break;

      // https://product-fabric.atlassian.net/browse/ED-8053
      // It's expected to fall through to default
      // @ts-ignore
      case 'expand':
        if (expandEnabled) {
          this.insertExpand();
          break;
        }

      // eslint-disable-next-line no-fallthrough
      default:
        if (item && item.onClick) {
          item.onClick(editorActions);
          break;
        }
    }
    this.setState({ isOpen: false });
  };

  private insertToolbarMenuItem = (btn: any) =>
    this.onItemActivated({
      item: btn,
      inputMethod: INPUT_METHOD.TOOLBAR,
    });

  private insertInsertMenuItem = ({ item }: { item: DropdownItem }) =>
    this.onItemActivated({
      item,
      inputMethod: INPUT_METHOD.INSERT_MENU,
    });
}

export default injectIntl(ToolbarInsertBlock);
