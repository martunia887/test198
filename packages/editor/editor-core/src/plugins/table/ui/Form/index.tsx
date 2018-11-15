import * as React from 'react';
import { EditorView } from 'prosemirror-view';
import { Node as PMNode } from 'prosemirror-model';
import { getCellsInColumn } from 'prosemirror-utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CellType } from '@atlaskit/editor-common';
import Button from '@atlaskit/button';
import FieldText from '@atlaskit/field-text';
import Select from '@atlaskit/select';
import { Checkbox } from '@atlaskit/checkbox';
import { RadioGroup } from '@atlaskit/radio';
import { DatePicker } from '@atlaskit/datetime-picker';
import RangeSlider from 'react-rangeslider';
import FieldTextArea from '@atlaskit/field-text-area';

import { TableCssClassName as ClassName } from '../../types';
import { closestElement } from '../../../../utils';
import FormField from './FormField';

import {
  updateCurrentUser,
  onDragEnd,
  appendColumn,
  getSelectOptions,
} from './utils';

export interface Column {
  type: CellType;
  index: number;
  label: string;
  options: Array<{ label: string; value: string }>;
}

export interface FormProps {
  editorView: EditorView;
  node: PMNode;
}

export interface State {
  slider: any;
  date: any;
  checkbox: any;
  radio: any;
}

export default class FormBuilder extends React.Component<FormProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      slider: {},
      date: {},
      checkbox: {},
      radio: {},
    };
  }

  render() {
    const formData = this.props.node.attrs.form;

    return (
      <div
        className={ClassName.FORM_WRAPPER}
        onKeyPress={e => e.preventDefault()}
        onMouseDown={this.handleMouseDown}
      >
        <div className={ClassName.FORM}>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div className={ClassName.FORM_SECTION} ref={provided.innerRef}>
                  {this.getColumns().map((column: Column) => {
                    const { slider } = this.state;
                    const sliderValue =
                      slider && slider[column.index]
                        ? slider[column.index].toFixed(1)
                        : 0.0;

                    return (
                      <Draggable
                        key={column.index}
                        draggableId={column.index}
                        index={column.index}
                      >
                        {(provided, snapshot) => (
                          <div
                            className={`${ClassName.FORM_BODY} ${
                              ClassName.FORM_SECTION
                            } ${snapshot.isDragging ? 'dragging' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <FormField
                              label={column.label}
                              columnIndex={column.index}
                              editorView={this.props.editorView}
                            >
                              {[
                                'text',
                                'number',
                                'currency',
                                'decision',
                                'emoji',
                              ].indexOf(column.type) > -1 && (
                                <FieldText isLabelHidden shouldFitContainer />
                              )}
                              {column.type === 'long-text' && (
                                <FieldTextArea
                                  minimumRows={3}
                                  isLabelHidden
                                  shouldFitContainer
                                />
                              )}
                              {(column.type === 'single-select' ||
                                column.type === 'status-select') && (
                                <Select
                                  options={column.options}
                                  shouldFitContainer
                                />
                              )}
                              {column.type === 'multi-select' && (
                                <div style={{ display: 'block' }}>
                                  {column.options.map((option, idx) => {
                                    const index = `${option.label}-${
                                      column.index
                                    }-${idx}`;
                                    return (
                                      <Checkbox
                                        key={index}
                                        name={index}
                                        value={index}
                                        label={option.label}
                                        isChecked={!!this.state.checkbox[index]}
                                        onChange={event =>
                                          this.handleCheckboxOnChange(
                                            event,
                                            index,
                                          )
                                        }
                                      />
                                    );
                                  })}
                                </div>
                              )}
                              {column.type === 'radio-select' && (
                                <div style={{ display: 'block' }}>
                                  <RadioGroup
                                    defaultCheckedValue={
                                      column.options[0].value
                                    }
                                    options={column.options}
                                    shouldFitContainer
                                    value={this.state.radio[column.index]}
                                    onChange={event => {
                                      const { radio } = this.state;
                                      event.preventDefault();
                                      radio[column.index] =
                                        event.currentTarget.value;
                                      this.setState({
                                        radio: [...radio],
                                      });
                                    }}
                                  />
                                </div>
                              )}
                              {column.type === 'mention' && (
                                <div className={ClassName.FORM_MENTION_FIELD}>
                                  <FieldText isLabelHidden shouldFitContainer />
                                  <div
                                    className={
                                      ClassName.FORM_MENTION_FIELD_CHECHBOX_WRAP
                                    }
                                    style={{ marginTop: 10 }}
                                  >
                                    <Checkbox
                                      label="Populate with the current user."
                                      isChecked={this.isCurrentUserEnabled(
                                        column.index,
                                      )}
                                      onChange={() =>
                                        this.updateCurrentUser(column.index)
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                              {column.type === 'checkbox' && (
                                <Checkbox
                                  isChecked={this.state.checkbox[column.index]}
                                  onChange={event =>
                                    this.handleCheckboxOnChange(
                                      event,
                                      column.index,
                                    )
                                  }
                                />
                              )}
                              {column.type === 'date' && (
                                <DatePicker
                                  value={this.state.date[column.index]}
                                  onChange={value => {
                                    const { date } = this.state;
                                    date[column.index] = value;
                                    this.setState({
                                      date: [...date],
                                    });
                                  }}
                                />
                              )}
                              {column.type === 'slider' && (
                                <div
                                  className={`${
                                    ClassName.FORM_SLIDER_WRAPPER
                                  } slider ${
                                    sliderValue < 0.7 ? 'danger' : ''
                                  }`}
                                >
                                  <RangeSlider
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={this.state.slider[column.index]}
                                    onChange={value => {
                                      const { slider } = this.state;
                                      const newSlider = { ...slider };
                                      newSlider[column.index] = value;
                                      this.setState({
                                        slider: newSlider,
                                      });
                                    }}
                                  />
                                  <div className="slider__value">
                                    {sliderValue}
                                  </div>
                                </div>
                              )}
                            </FormField>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div
            className={`${ClassName.FORM_ADD_FIELD_BUTTON} ${
              ClassName.FORM_SECTION
            } ${ClassName.FORM_FOOTER}`}
          >
            <Button onClick={this.appendColumn} shouldFitContainer>
              Add a field
            </Button>
          </div>
          <div className={`${ClassName.FORM_SECTION} ${ClassName.FORM_FOOTER}`}>
            <Button appearance="primary">
              {formData.submitButtonTitle || 'Submit'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  private handleMouseDown = event => {
    if (closestElement(event.target, '.pm-table-form-input')) {
      event.preventDefault();
    }
  };

  private handleCheckboxOnChange = (event, index) => {
    event.preventDefault();
    const { checkbox } = this.state;
    const newCheckbox = { ...checkbox };
    newCheckbox[index] = event.target.checked;
    this.setState({
      checkbox: newCheckbox,
    });
  };

  private getColumns = () => {
    const { node, editorView } = this.props;
    const { state } = editorView;
    const cellTypes: Column[] = [];
    const firstRow = node && node.firstChild;
    if (firstRow) {
      for (let i = 0; i < firstRow.childCount; i++) {
        const headerCell = firstRow.child(i);
        const column = {
          type: headerCell.attrs.cellType,
          index: i,
          label: headerCell.textContent,
          options: [] as any,
        };
        if (headerCell.attrs.cellType.indexOf('-select') > -1) {
          column.options = getSelectOptions(i, state);
        }
        cellTypes.push(column);
      }
    }

    return cellTypes;
  };

  private appendColumn = () => {
    const { state, dispatch } = this.props.editorView;
    appendColumn(state, dispatch);
  };

  private updateCurrentUser = (columnIndex: number) => {
    const { state, dispatch } = this.props.editorView;
    updateCurrentUser(columnIndex)(state, dispatch);
  };

  private isCurrentUserEnabled = (columnIndex: number) => {
    const { state } = this.props.editorView;
    const cells = getCellsInColumn(columnIndex)(state.selection);
    if (!cells) {
      return false;
    }
    return cells[0].node.attrs.currentUser;
  };

  private onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    const { state, dispatch } = this.props.editorView;
    const {
      draggableId,
      destination: { index },
    } = result;
    onDragEnd(draggableId, index)(state, dispatch);
  };
}
