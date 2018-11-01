// @flow

import React, { PureComponent } from 'react';
import { PopupSelect } from '@atlaskit/select';
import Arrow from '@atlaskit/icon/glyph/arrow-right';
import { StatusButton } from './components/status-button';
import { StatusLozenge, ItemContainer } from './components/status-lozenge';
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

  containsOnlyGlobalTransitions = transitions =>
    transitions && transitions.every(transition => transition.isGlobal);

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
        isAnimated={!!this.props.animateTransition}
      >
        {toStatusName}
      </StatusButton>
    );

    return button;
  }

  formatOptionWithTransitionNames = (option, { context }) => {
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

  formatOptionWithoutTransitionNames = (option, { context }) => {
    if (context === 'menu') {
      return (
        <div>
          <span>
            {option.transition.name || 'Transition to ' /* TODO intl */}
          </span>
          <ItemContainer>
            <Arrow label="" size="small" />
            <StatusLozenge
              category={option.transition.toStatusCategory}
              name={option.transition.toStatusName}
            />
          </ItemContainer>
        </div>
      );
    }
  };

  render() {
    const options = this.props.options;
    const useTransitionNames = this.containsOnlyGlobalTransitions(options);
    const optionFormatter = useTransitionNames
      ? this.formatOptionWithTransitionNames
      : this.formatOptionWithoutTransitionNames;

    return (
      <PopupSelect
        className="single-select"
        classNamePrefix="react-select"
        options={this.optionsFromTransitions(options)}
        selectedOption={this.props.selectedOption}
        placeholder="Status"
        onChange={this.props.onChange}
        target={this.renderTarget()}
        formatOptionLabel={optionFormatter}
      />
    );
  }
}
