// @flow

import React, { PureComponent } from 'react';
import { PopupSelect } from '@atlaskit/select';
import { StatusButton } from './components/status-button';
import { StatusLozenge } from './components/status-lozenge';
import { Transition, StatusCategory } from './model';

type Props = {
  options: Array<Transition>,
  selectedOption: Transition,
  statusCategories: Array<StatusCategory>,
  animateTransition: boolean,
  onChange: () => void,
};

export default class StatusSelect extends PureComponent<Props, State> {
  optionsFromTransitions = transitions => {
    return transitions.map(t => ({
      label: t.toStatusName,
      value: t.id,
      transition: t,
    }));
  };

  renderTarget() {
    const { toStatusName, toStatusCategory } = this.props.selectedOption;
    const isPending = false; // TODO fix this
    const isDropdownOpen = false; // TODO fix this
    const isDisabled = false; // TODO fix this
    const button = (
      <StatusButton
        isDisabled={isDisabled}
        isSelected={isDropdownOpen}
        category={toStatusCategory}
        showSpinner={isPending}
        statusCategories={this.props.statusCategories}
        externalId="status.dropdown"
        isAnimated={this.props.animateTransition}
      >
        {toStatusName}
      </StatusButton>
    );

    return button;
  }

  formatOptionLabel = (option, { context }) => {
    if (context === 'menu') {
      return (
        <StatusLozenge
          category={option.transition.toStatusCategory}
          name={option.transition.toStatusName}
        />
      );
    }

    return option.value;
  };

  render() {
    return (
      <PopupSelect
        className="single-select"
        classNamePrefix="react-select"
        options={this.optionsFromTransitions(this.props.options)}
        selectedOption={this.props.selectedOption}
        placeholder="Status"
        onChange={this.props.onChange}
        target={this.renderTarget()}
        formatOptionLabel={this.formatOptionLabel}
      />
    );
  }
}
