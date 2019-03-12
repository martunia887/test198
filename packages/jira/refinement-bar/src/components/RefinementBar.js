// @flow
/** @jsx jsx */

import {
  PureComponent,
  Children,
  // $FlowFixMe "there is no `forwardRef` export in `react`"
  forwardRef,
  createRef,
  type ElementRef,
} from 'react';
import memo from 'memoize-one';
import { applyRefs } from 'apply-ref';
import { jsx } from '@emotion/core';
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';

import {
  RefinementBarProvider,
  withRefinementBarContext,
} from './ContextProvider';
import { cloneObj } from '../utils';
import Popup, { DialogInner } from './Popup';
import { FilterButton } from './FilterButton';
import { FilterManager } from './FilterManager';

type Props = {
  tempContextFromProps: Object,
};
type State = {
  activePopupKey: string | null,
  invalid: Object,
  isExpanded: boolean,
  values: Object,
};

class ActualRefinementBar extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    // TEMP: until `static contextType` is available
    this.ctx = props.tempContextFromProps;

    // declared here once so react-select can keep track of the keys;
    // helps with the focused option, scroll tracking etc.
    this.filterOptions = this.ctx.removeableKeys.map(this.mapKeyToOption);

    this.state = {
      activePopupKey: null,
      invalid: {},
      isExpanded: true,
      values: this.ctx.value,
    };
  }
  ctx: Object;
  filterOptions: Array<Object>;
  showLessRef: ElementRef<*> = createRef();
  showMoreRef: ElementRef<*> = createRef();

  // Required until atlaskit upgrades to react >= 16.6 😞
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.ctx = nextProps.tempContextFromProps;
  }

  // ==============================
  // Popups
  // ==============================

  openPopup = key => () => {
    this.setState({ activePopupKey: key });
  };
  closePopup = () => {
    this.setState({ activePopupKey: null });
  };

  // ==============================
  // Field Handlers
  // ==============================

  handleFieldAdd = async (key: string) => {
    const field = this.ctx.fieldConfig[key];
    const data = field.getInitialValue();
    const meta = { action: 'add', key, data };
    const values = await cloneObj(this.state.values, { add: { [key]: data } });

    this.setState({ activePopupKey: key, values, isExpanded: true }, () => {
      this.ctx.onChange(values, meta);
    });
  };
  handleFieldRemove = async (key: string, event?: Event) => {
    if (event) {
      event.preventDefault();
    }

    const values = await cloneObj(this.state.values, { remove: key });

    this.setState({ values }, () => {
      this.ctx.onChange(values, { action: 'remove', key });
    });
  };
  handleFieldChange = (key: string) => (value: *) => {
    const { fieldConfig } = this.ctx;
    const oldInvalid = this.state.invalid;
    const values = cloneObj(this.state.values, { add: { [key]: value } });

    const field = fieldConfig[key];
    const { message, isInvalid } = field.validateValue(value);

    let invalid = oldInvalid;

    if (isInvalid) {
      invalid = cloneObj(oldInvalid, { add: { [key]: message } });
    } else if (oldInvalid[key]) {
      invalid = cloneObj(oldInvalid, { remove: key });
    }

    const liveUpdateStoredValues = () => {
      // don't commit changes to context if there's invalid keys
      if (invalid[key]) {
        return;
      }

      // avoid unnecessary calls
      if (values[key] === this.ctx.value[key]) {
        return;
      }

      const data = values[key];
      const meta = { action: 'update', key, data };

      this.ctx.onChange(values, meta);
    };

    this.setState({ invalid, values }, liveUpdateStoredValues);
  };

  makeField = (config: Object) => (key: string) => {
    const { type, ...field } = this.ctx.fieldConfig[key];
    const Field = type.view;
    const invalidMessage = this.state.invalid[key];
    const isInvalid = Boolean(invalidMessage);
    const storedValue = this.ctx.value[key] || field.getInitialValue();
    const localValue = this.state.values[key] || field.getInitialValue();
    const hasPopup = typeof field.formatButtonLabel === 'function';
    const popupIsOpen = this.state.activePopupKey === key;

    // this shouldn't be possible, but better to be safe
    if (!Field) {
      throw new Error(
        `There's something wrong with the renderer (${
          type.name
        }) for "${key}".`,
      );
    }

    const fieldUI = ({ scheduleUpdate }) => {
      const extra = scheduleUpdate ? { ...config, scheduleUpdate } : config;
      console.log('makeField', key);

      return (
        <Field
          closePopup={this.closePopup}
          field={field}
          invalidMessage={invalidMessage}
          key={key}
          onChange={this.handleFieldChange(key)}
          refinementBarValue={this.ctx.value}
          storedValue={storedValue}
          value={localValue}
          {...extra}
        />
      );
    };

    return hasPopup ? (
      <Popup
        key={key}
        isOpen={popupIsOpen}
        onOpen={this.openPopup(key)}
        onClose={this.closePopup}
        allowClose={!isInvalid}
        target={({ isOpen, onClick, ref }: *) => (
          <FilterButton
            field={field}
            isInvalid={isInvalid}
            isSelected={isOpen}
            onClick={onClick}
            onRemove={
              config.isRemovable
                ? event => this.handleFieldRemove(key, event)
                : null
            }
            ref={ref}
            value={storedValue.value}
          >
            {field.formatButtonLabel(storedValue)}
          </FilterButton>
        )}
      >
        {fieldUI}
      </Popup>
    ) : (
      fieldUI({})
    );
  };
  onChangeFilter = (options: *, meta) => {
    this.closePopup();
    switch (meta.action) {
      case 'clear-options':
        options.forEach(o => this.handleFieldRemove(o.value));
        break;
      case 'select-option':
        this.handleFieldAdd(meta.option.value);
        break;
      case 'deselect-option':
        this.handleFieldRemove(meta.option.value);
        break;
      default:
    }
  };
  getFilterValue = memo(keys => {
    return keys.map(this.mapKeyToOption);
  });
  showMore = isExpanded => () => {
    this.setState({ isExpanded }, () => {
      // NOTE: focus is managed manually here because the show/hide buttons are
      // removed from the DOM and the user should stay focused _somewhere_ in
      // the refinement bar
      const target = isExpanded
        ? this.showLessRef.current
        : this.showMoreRef.current;

      if (target && typeof target.focus === 'function') {
        target.focus();
      }
    });
  };

  mapKeyToOption = value => {
    const field = this.ctx.fieldConfig[value];
    const label = field.label || value;
    return { label, value };
  };

  render() {
    const { irremovableKeys, selectedKeys } = this.ctx;
    const { activePopupKey, isExpanded } = this.state;
    const FILTER_POPUP_KEY = 'filter-menu';

    return (
      <Group>
        {irremovableKeys.map(this.makeField({ isRemovable: false }))}
        {isExpanded && selectedKeys.map(this.makeField({ isRemovable: true }))}

        {/* Show More/Less Control */}
        {!isExpanded && selectedKeys.length ? (
          <Button
            innerRef={applyRefs(this.showMoreRef)}
            onClick={this.showMore(true)}
            iconAfter={
              <Badge appearance="primary">{selectedKeys.length}</Badge>
            }
          >
            Show More
          </Button>
        ) : null}

        {/* Add Filter Popup */}
        <Popup
          onOpen={this.openPopup(FILTER_POPUP_KEY)}
          onClose={this.closePopup}
          isOpen={activePopupKey === FILTER_POPUP_KEY}
          target={({ isOpen, onClick, ref }: *) => (
            <Button
              appearance="link"
              iconBefore={<AddIcon />}
              innerRef={ref}
              isSelected={isOpen}
              onClick={onClick}
            >
              Add Filter
            </Button>
          )}
        >
          {({ scheduleUpdate }) => (
            <DialogInner minWidth={220}>
              <FilterManager
                options={this.filterOptions}
                onChange={this.onChangeFilter}
                scheduleUpdate={scheduleUpdate}
                value={this.getFilterValue(selectedKeys)}
              />
            </DialogInner>
          )}
        </Popup>

        {isExpanded && selectedKeys.length ? (
          <Button
            innerRef={applyRefs(this.showLessRef)}
            appearance="subtle-link"
            onClick={this.showMore(false)}
          >
            Show Less
          </Button>
        ) : null}
      </Group>
    );
  }
}

// ==============================
// Styled Components
// ==============================

const Group = forwardRef(({ children }: *, ref) => {
  const gutter = 4;
  const childArray = Children.toArray(children).filter(Boolean); // filter out null and undefined children
  return (
    <div
      ref={ref}
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        margin: -gutter,
      }}
    >
      {childArray.map((child, idx) => (
        <div css={{ margin: gutter }} key={child.key || idx}>
          {child}
        </div>
      ))}
    </div>
  );
});

// ==============================
// Main Export
// ==============================

export const RefinementBarUI = withRefinementBarContext(ActualRefinementBar);

// ==============================
// Put it together
// ==============================

export const RefinementBar = (props: *) => (
  <RefinementBarProvider {...props}>
    <RefinementBarUI />
  </RefinementBarProvider>
);
