import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import {
  findDomRefAtPos,
  findCellRectClosestToPos,
  getCellsInColumn,
} from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
  uuid,
  TableFormattingMarks,
  TableFormattingCondition,
} from '@atlaskit/editor-common';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import EditorBoldIcon from '@atlaskit/icon/glyph/editor/bold';
import EditorItalicIcon from '@atlaskit/icon/glyph/editor/italic';
import EditorUnderlineIcon from '@atlaskit/icon/glyph/editor/underline';
import EditorStrikethroughIcon from '@atlaskit/icon/glyph/editor/strikethrough';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import TextField from '@atlaskit/field-text';
import { TableCssClassName as ClassName } from '../../types';
import { pluginKey } from '../../pm-plugins/main';
import { toggleFormattingMenu } from '../../actions';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import { closestElement } from '../../../../utils';

const PopupWithOutsideListeners = withOuterListeners(Popup);

const calculateOffset = (targetCellRef, state) => {
  const { tableRef } = pluginKey.getState(state);
  let top = -6;

  if (tableRef && targetCellRef) {
    const targetOffset = targetCellRef.getBoundingClientRect();
    const tableOffset = tableRef.getBoundingClientRect();
    let topDiff = targetOffset.top - tableOffset.top;
    if (topDiff < 100) {
      top -= topDiff + 4;
    }
  }
  return [-8, -top];
};

const CONDITION_ITEMS = [
  {
    label: 'contains...',
    value: 'contains',
  },
  {
    label: 'does not contain...',
    value: 'does_not_contain',
  },
  {
    label: 'is...',
    value: 'is',
  },
  {
    label: 'is not...',
    value: 'is_not',
  },
  {
    label: 'is empty',
    value: 'is_empty',
  },
  {
    label: 'is not empty',
    value: 'is_not_empty',
  },
];

const formattingItems = [
  {
    label: 'strong',
    icon: <EditorBoldIcon label="strong" />,
  },
  {
    label: 'em',
    icon: <EditorItalicIcon label="italic" />,
  },
  {
    label: 'underline',
    icon: <EditorUnderlineIcon label="underline" />,
  },
  {
    label: 'strike',
    icon: <EditorStrikethroughIcon label="strike" />,
  },
] as Array<{ label: TableFormattingMarks; icon: React.ReactChild }>;

export interface Rule {
  id: string;
  condition?: TableFormattingCondition;
  value?: string;
}

export interface FormattingMenuProps {
  editorView: EditorView;
  isOpen: boolean;
  targetCellPosition?: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
}

export interface FormattingMenuState {
  rules: Rule[];
  marks: TableFormattingMarks[];
}

export default class FormattingMenu extends React.Component<
  FormattingMenuProps,
  FormattingMenuState
> {
  constructor(props) {
    super(props);

    this.state = {
      rules: [],
      marks: [],
    };
  }

  render() {
    const {
      mountPoint,
      boundariesElement,
      scrollableElement,
      editorView,
      isOpen,
      targetCellPosition,
    } = this.props;

    if (!isOpen || !targetCellPosition) {
      return null;
    }

    const domAtPos = editorView.domAtPos.bind(editorView);
    const targetCellRef = findDomRefAtPos(
      targetCellPosition,
      domAtPos,
    ) as HTMLElement;
    if (!targetCellRef) {
      return null;
    }

    return (
      <PopupWithOutsideListeners
        alignX="right"
        alignY="top"
        target={targetCellRef}
        mountTo={mountPoint}
        offset={calculateOffset(targetCellRef, editorView.state)}
        fitHeight={200}
        fitWidth={320}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        zIndex={akEditorFloatingOverlapPanelZIndex}
        handleClickOutside={this.handleClickOutside}
        handleEscapeKeydown={this.handleClickOutside}
      >
        <div
          className={`${ClassName.MENU_WRAP} ${ClassName.FORMATTING_MENU_WRAP}`}
        >
          <div className={`${ClassName.MENU_TITLE} ${ClassName.SECTION}`}>
            Conditional formatting
          </div>
          <div className={`${ClassName.MENU_DESCRIPTION} ${ClassName.SECTION}`}>
            Choose the formatting condition for the current column
          </div>
          {this.state.rules.map(rule => (
            <div
              key={rule.id}
              className={`${ClassName.SECTION} ${ClassName.RULE_WRAP}`}
            >
              <div style={{ width: 165 }}>
                <Select
                  options={CONDITION_ITEMS}
                  placeholder="Condition"
                  onChange={item =>
                    this.handleOnChange(item.value, rule.id, 'condition')
                  }
                />
              </div>
              <div style={{ width: 100, flex: 'initial' }}>
                <TextField
                  isLabelHidden
                  onChange={event =>
                    this.handleOnChange(
                      (event.target as HTMLInputElement).value,
                      rule.id,
                      'value',
                    )
                  }
                  value={rule.value}
                />
              </div>
              <Button
                onClick={event => this.deleteRule(event, rule.id)}
                iconBefore={<EditorCloseIcon label="Detele rule" />}
              />
            </div>
          ))}
          {!!this.state.rules.length && (
            <div
              className={`${ClassName.SECTION} ${
                ClassName.FORMATTING_BUTTONS_WRAP
              }`}
            >
              {formattingItems.map(formattingItem => (
                <Button
                  key={formattingItem.label}
                  onClick={event => this.toggleFormatting(formattingItem.label)}
                  iconBefore={formattingItem.icon}
                  isSelected={
                    this.state.marks.indexOf(formattingItem.label) > -1
                  }
                />
              ))}
            </div>
          )}
          <div className={ClassName.SECTION}>
            <Button onClick={this.addNewRule} shouldFitContainer>
              Add new rule
            </Button>
          </div>
          <div className={ClassName.BUTTONS_WRAP}>
            <Button onClick={this.dismiss}>Cancel</Button>
            <Button appearance="primary" onClick={this.handleSave}>
              Save
            </Button>
          </div>
        </div>
      </PopupWithOutsideListeners>
    );
  }

  private handleOnChange = (
    value: string,
    ruleId: string,
    fieldName: string,
  ) => {
    const rules: Rule[] = [];
    this.state.rules.forEach(rule => {
      const newRule = { ...rule };
      if (rule.id === ruleId) {
        newRule[fieldName] = value;
      }
      rules.push(newRule);
    });
    this.setState({
      rules,
    });
  };

  private deleteRule = (event: React.SyntheticEvent, ruleId: string) => {
    this.setState({
      rules: this.state.rules.filter(rule => rule.id !== ruleId),
    });
  };

  private addNewRule = () => {
    this.setState({
      rules: [
        ...this.state.rules,
        {
          id: String(uuid.generate()),
        },
      ],
    });
  };

  private toggleFormatting = (mark: TableFormattingMarks) => {
    const { marks } = this.state;
    let newMarks;
    if (marks.indexOf(mark) > -1) {
      newMarks = marks.filter(markName => markName !== mark);
    } else {
      newMarks = [...marks, mark];
    }
    this.setState({
      marks: newMarks,
    });
  };

  private dismiss = () => {
    const { state, dispatch } = this.props.editorView;
    toggleFormattingMenu(state, dispatch);

    this.setState({
      rules: [],
    });
  };

  private handleClickOutside = (event: React.SyntheticEvent) => {
    const target = event.target as HTMLElement;
    if (
      closestElement(target, `.${ClassName.MENU_WRAP}`) ||
      target.getAttribute('role') === 'option' ||
      !document.contains(target)
    ) {
      event.preventDefault();
      return false;
    }
    this.dismiss();
  };

  private handleSave = () => {
    const { editorView } = this.props;
    const { state, dispatch } = editorView;
    const { selection } = state;
    const rect = findCellRectClosestToPos(selection.$from);
    if (!rect) {
      return false;
    }
    const cells = getCellsInColumn(rect.left)(selection);
    if (!cells) {
      return;
    }
    // header cell
    const { node, pos } = cells[0];

    const formatting = {
      rules: this.state.rules.map(rule => ({
        condition: rule.condition,
        value: rule.value,
      })),
      marks: this.state.marks,
    };

    dispatch(
      state.tr.setNodeMarkup(pos, node.type, {
        ...node.attrs,
        formatting,
      }),
    );

    this.dismiss();

    return true;
  };
}
