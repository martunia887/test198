import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode, Fragment } from 'prosemirror-model';
import * as uuid from 'uuid';
import {
  Popup,
  akEditorFloatingOverlapPanelZIndex,
  CellType,
  tableBackgroundColorPalette,
  tableBackgroundBorderColors,
} from '@atlaskit/editor-common';
import { colors } from '@atlaskit/theme';
import { Checkbox } from '@atlaskit/checkbox';
import TextField from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close';
import withOuterListeners from '../../../../ui/with-outer-listeners';
import {
  pluginKey,
  getColumnTypesButtonRef,
  setColumnType,
} from '../../pm-plugins/column-types';
import { TableCssClassName as ClassName } from '../../types';
import ColorPalette from '../../../../ui/ColorPalette';

const PopupWithListeners = withOuterListeners(Popup);

interface Option {
  value: string;
  id: string;
  color?: string;
}

export interface Props {
  editorView: EditorView;
  columnIndex: number;
  mountPoint?: HTMLElement;
  boundariesElement?: HTMLElement;
  scrollableElement?: HTMLElement;
  selectMenuType?: CellType;
}

export interface State {
  options: Option[];
  isColorPickerOpen: any;
  allowCreateOptions: boolean;
}

export default class ColumnTypesSettingsMenu extends React.Component<
  Props,
  State
> {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      isColorPickerOpen: {},
      allowCreateOptions: false,
    };
  }
  render() {
    const {
      mountPoint,
      boundariesElement,
      scrollableElement,
      selectMenuType,
      columnIndex,
      editorView,
    } = this.props;

    if (!selectMenuType) {
      return null;
    }
    const target = getColumnTypesButtonRef(columnIndex)(editorView);
    if (!target) {
      return null;
    }

    return (
      <PopupWithListeners
        alignX="left"
        alignY="bottom"
        offset={[27, -24]}
        target={target}
        mountTo={mountPoint}
        boundariesElement={boundariesElement}
        scrollableElement={scrollableElement}
        fitHeight={100}
        fitWidth={200}
        zIndex={akEditorFloatingOverlapPanelZIndex}
        handleClickOutside={this.dismiss}
      >
        <div className={ClassName.COLUMN_TYPES_SETTINGS_MENU}>
          <div className={ClassName.COLUMN_TYPES_SETTINGS_MENU_TITLE}>
            Options
          </div>
          {this.state.options.map(option => (
            <div
              key={option.id}
              className={ClassName.SINGLE_SELECT_OPTION_SETTINGS}
            >
              <TextField
                autoFocus
                compact
                value={option.value}
                isLabelHidden={true}
                shouldFitContainer
                onChange={event => this.handleOnChange(event, option)}
              />
              {selectMenuType === 'status-select' && (
                <div className={ClassName.STATUS_COLOR_PICKER}>
                  <div
                    className={ClassName.STATUS_COLOR_PICKER_ICON}
                    style={{ background: option.color }}
                    onClick={() => {
                      const { isColorPickerOpen } = this.state;
                      const newValue = { ...isColorPickerOpen };
                      newValue[option.id] = !newValue[option.id];
                      this.setState({ isColorPickerOpen: newValue });
                    }}
                  />
                  {this.state.isColorPickerOpen[option.id] && (
                    <div
                      onMouseDown={e => e.preventDefault()}
                      className={ClassName.STATUS_COLOR_PICKER_PALETTE}
                    >
                      <ColorPalette
                        palette={tableBackgroundColorPalette}
                        borderColors={tableBackgroundBorderColors}
                        onClick={color => this.setColor(color, option)}
                        selectedColor={option.color}
                        checkMarkColor={colors.N500}
                      />
                    </div>
                  )}
                </div>
              )}
              <button onMouseDown={event => this.onRemoveOption(event, option)}>
                <EditorCloseIcon size="medium" label="Remove option" />
              </button>
            </div>
          ))}
          <Button shouldFitContainer={true} onClick={this.onAddOption}>
            Add an option
          </Button>
          {selectMenuType === 'single-select' && (
            <div
              className={ClassName.COLUMN_TYPES_SETTINGS_MENU_ALLOW_CREATE_WRAP}
            >
              <Checkbox
                isChecked={this.state.allowCreateOptions}
                label="Allow respondents to create options"
                onChange={this.updateAllowCreateOptions}
              />
            </div>
          )}
          <div className={ClassName.COLUMN_TYPES_SETTINGS_MENU_BUTTONS_WRAP}>
            <Button appearance="subtle" onClick={this.dismiss}>
              Cancel
            </Button>
            <Button appearance="primary" onClick={this.onSave}>
              Save
            </Button>
          </div>
        </div>
      </PopupWithListeners>
    );
  }

  private updateAllowCreateOptions = () => {
    this.setState({ allowCreateOptions: !this.state.allowCreateOptions });
  };

  private setColor = (color: string, option: Option) => {
    const newOptions = [...this.state.options];
    newOptions.forEach(item => {
      if (item.id === option.id) {
        item.color = color;
      }
    });
    const { isColorPickerOpen } = this.state;
    const newValue = { ...isColorPickerOpen };
    newValue[option.id] = false;
    this.setState({ options: newOptions, isColorPickerOpen: newValue });
  };

  private handleOnChange = (event, option: Option) => {
    const newOptions = [...this.state.options];
    newOptions.forEach(item => {
      if (item.id === option.id) {
        item.value = event.target.value;
      }
    });
    this.setState({ options: newOptions });
  };

  private onRemoveOption = (event, option: Option) => {
    event.preventDefault();
    this.setState({
      options: this.state.options.filter(opt => opt.id !== option.id),
    });
  };

  private onAddOption = () => {
    this.setState({
      options: [
        ...this.state.options,
        { id: uuid(), value: '', color: 'white' },
      ],
    });
  };

  private onSave = () => {
    const { columnIndex, editorView, selectMenuType } = this.props;
    const { state, dispatch } = editorView;
    const { singleSelect, selectOption } = state.schema.nodes;
    if (!selectMenuType) {
      return;
    }
    const options: PMNode[] = [];
    this.state.options.forEach(option => {
      const attrs: any = {};
      if (selectMenuType === 'status-select') {
        attrs.color = option.color;
      }
      options.push(
        selectOption.createChecked(attrs, state.schema.text(option.value)),
      );
    });
    const content = singleSelect.createChecked(
      {
        allowCreateOptions: this.state.allowCreateOptions,
      },
      Fragment.from(options),
    );

    setColumnType(columnIndex, selectMenuType, content)(state, dispatch);

    this.dismiss();
  };

  private dismiss = (event?) => {
    if (event) {
      const { target } = event;
      let elem = target;
      while (elem) {
        if (
          elem.classList &&
          elem.classList.contains(ClassName.STATUS_COLOR_PICKER_PALETTE)
        ) {
          return false;
        }
        elem = elem.parentNode;
      }
    }
    const { dispatch, state } = this.props.editorView;
    dispatch(
      state.tr.setMeta(pluginKey, {
        columnIndex: undefined,
        selectMenuType: undefined,
      }),
    );
    this.setState({ options: [], allowCreateOptions: false });
  };
}
