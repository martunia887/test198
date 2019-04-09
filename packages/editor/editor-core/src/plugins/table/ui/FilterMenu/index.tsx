import * as React from 'react';
import {
  findDomRefAtPos,
  findCellRectClosestToPos,
  getCellsInColumn,
} from 'prosemirror-utils';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
  akEditorTableToolbarSize,
} from '@atlaskit/editor-common';
import { uuid } from '@atlaskit/adf-schema';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import Select from '@atlaskit/select';
import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import TextField from '@atlaskit/field-text';
import { TableCssClassName as ClassName } from '../../types';
import { toggleFilterMenu } from '../../actions';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import { closestElement } from '../../../../utils';
import { contextualMenuTriggerSize } from '../styles';
import { FilterMenuProps, Rule, FilterMenuState } from './types';

const PopupWithOutsideListeners = withOuterListeners(Popup);

const getDefaultState = () => ({
  rules: [],
});

export default class FilterMenu extends React.Component<
  FilterMenuProps,
  FilterMenuState
> {
  constructor(props: FilterMenuProps) {
    super(props);
    this.state = getDefaultState();
  }

  // getting tableHeader cell filter
  componentDidUpdate(nextProps: FilterMenuProps) {
    const { targetCellPosition, isOpen, editorView } = nextProps;
    const { state } = editorView;
    if (targetCellPosition && isOpen !== this.props.isOpen) {
      const cell = state.doc.nodeAt(targetCellPosition);
      if (!cell) {
        return;
      }
      const { filter } = cell.attrs;
      if (filter) {
        this.setState({
          rules: filter.rules,
        });
      } else {
        this.setState(getDefaultState());
      }
    }
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
        offset={[-contextualMenuTriggerSize / 2, akEditorTableToolbarSize - 1]}
        fitHeight={200}
        fitWidth={320}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        zIndex={akEditorFloatingOverlapPanelZIndex}
        handleClickOutside={this.handleClickOutside}
        handleEscapeKeydown={this.handleClickOutside}
        forcePlacement={true}
      >
        <div
          className={`${ClassName.MENU_WRAP} ${ClassName.FORMATTING_MENU_WRAP}`}
        >
          <div className={`${ClassName.MENU_TITLE} ${ClassName.SECTION}`}>
            Filtering
          </div>
          <div className={`${ClassName.MENU_DESCRIPTION} ${ClassName.SECTION}`}>
            Choose the filtering condition for the current column
          </div>
          {this.state.rules.map(rule => (
            <div key={rule.id} className={`${ClassName.SECTION}`}>
              <div className={`${ClassName.RULE_WRAP}`}>
                <div style={{ width: 165 }}>
                  <Select
                    options={CONDITION_ITEMS}
                    placeholder="Condition"
                    defaultValue={CONDITION_ITEMS.find(
                      item => item.value === rule.condition,
                    )}
                    onChange={(item: any) =>
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
                  onClick={event => this.deleteRule(rule.id)}
                  iconBefore={<EditorCloseIcon label="Detele rule" />}
                />
              </div>
              <div className={`${ClassName.SECTION}`}>
                <Checkbox
                  label="Reference value"
                  onChange={(event: any) =>
                    this.handleOnChange(
                      (event.target as HTMLInputElement).checked,
                      rule.id,
                      'useAsReference',
                    )
                  }
                  isChecked={!!rule.useAsReference}
                  value={!!rule.useAsReference}
                />
              </div>
            </div>
          ))}
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
    value: string | boolean,
    ruleId: string,
    fieldName: string,
  ) => {
    const rules: Rule[] = [];
    this.state.rules.forEach(rule => {
      const newRule: any = { ...rule };
      if (rule.id === ruleId) {
        newRule[fieldName] = value;
      }
      rules.push(newRule);
    });
    console.log({ rules });
    this.setState({
      rules,
    });
  };

  private deleteRule = (ruleId: string) => {
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

  private dismiss = () => {
    const { state, dispatch } = this.props.editorView;
    toggleFilterMenu(state, dispatch);
    this.setState(getDefaultState());
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
    const { rules } = this.state;
    const filter = {
      rules,
    };

    dispatch(
      state.tr.setNodeMarkup(pos, node.type, {
        ...node.attrs,
        filter,
      }),
    );

    this.dismiss();
    return true;
  };
}

export const CONDITION_ITEMS = [
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
