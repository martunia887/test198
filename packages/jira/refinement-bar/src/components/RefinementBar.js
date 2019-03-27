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
import memoize from 'memoize-one';
import { applyRefs } from 'apply-ref';
import { jsx } from '@emotion/core';
import Badge from '@atlaskit/badge';
import Button from '@atlaskit/button';
import AddIcon from '@atlaskit/icon/glyph/add';

import {
  RefinementBarProvider,
  withRefinementBarContext,
} from './ContextProvider';
import Popup, { DialogInner } from './Popup';
import { FilterButton } from './FilterButton';
import { FilterManager } from './FilterManager';

import { cloneObj, objectMap, stringCompare } from '../utils';
import {
  createAndFire,
  defaultAttributes,
  withAnalyticsContext,
  withAnalyticsEvents,
} from '../analytics';

type Props = {
  createAnalyticsEvent: (*) => any,
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
  showAllRef: ElementRef<*> = createRef();
  analyticsTimer: TimeoutID;

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
  // Analytics
  // ==============================

  handleIdleAnalyticsEvent = values => {
    clearTimeout(this.analyticsTimer);

    // NOTE: Five seconds is arbitrary. Our assumption is that it's enough time
    // to ensure the user has "committed" to a search/filter.
    const idleDuration = 5000;
    const { createAnalyticsEvent } = this.props;

    this.analyticsTimer = setTimeout(() => {
      // NOTE: we must avoid personally identifiable information, so the payload
      // SHOULD NOT contain any actual values.
      const filters = objectMap(values, (val, key) => {
        const field = this.ctx.fieldConfig[key];
        const filterType = field.type.name;

        // Augment where possible with additional data related to the filter
        // type. For example, number may be greater than / less than etc.
        let additionalData = null;
        switch (filterType) {
          case 'Number':
          case 'Text':
            additionalData = { type: val.type };
            break;
          default:
        }

        return {
          filterType,
          additionalData,
        };
      });

      createAndFire({
        action: 'idle-submit',
        attributes: defaultAttributes,
        filters,
      })(createAnalyticsEvent);
    }, idleDuration);
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
  handleFieldClear = async (key: string) => {
    const field = this.ctx.fieldConfig[key];
    const value = field.getInitialValue();
    const values = cloneObj(this.state.values, { add: { [key]: value } });

    this.setState({ values }, () => {
      this.handleIdleAnalyticsEvent(values);
      this.ctx.onChange(values, { action: 'clear', key });
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

      this.handleIdleAnalyticsEvent(values);
      this.ctx.onChange(values, meta);
    };

    this.setState({ invalid, values }, liveUpdateStoredValues);
  };

  makeField = (config: Object) => (key: string) => {
    const { type, ...field } = this.ctx.fieldConfig[key];
    const Field = type.view;
    const invalidMessage = this.state.invalid[key];
    const isInvalid = Boolean(invalidMessage);
    const initialValue = field.getInitialValue();
    const storedValue = this.ctx.value[key] || initialValue;
    const localValue = this.state.values[key] || initialValue;
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
            onClear={
              stringCompare(storedValue, initialValue)
                ? null
                : () => this.handleFieldClear(key)
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
  getFilterValue = memoize(keys => {
    return keys.map(this.mapKeyToOption);
  });
  showAll = isExpanded => () => {
    this.setState({ isExpanded }, () => {
      // NOTE: focus is managed manually here because the show/hide buttons are
      // removed from the DOM and the user should stay focused _somewhere_ in
      // the refinement bar
      const target = isExpanded
        ? this.showLessRef.current
        : this.showAllRef.current;

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
    const FILTER_POPUP_KEY = '__refinement-bar-more-menu__';

    return (
      <Group>
        {irremovableKeys.map(this.makeField({ isRemovable: false }))}
        {isExpanded && selectedKeys.map(this.makeField({ isRemovable: true }))}

        {/* Show More/Less Control */}
        {!isExpanded && selectedKeys.length ? (
          <Button
            innerRef={applyRefs(this.showAllRef)}
            onClick={this.showAll(true)}
            iconAfter={
              <Badge appearance="primary">{selectedKeys.length}</Badge>
            }
          >
            Show All
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
              More
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
            onClick={this.showAll(false)}
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

// eslint-disable-next-line react/no-multi-comp
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
        <div css={{ margin: gutter, minWidth: 0 }} key={child.key || idx}>
          {child}
        </div>
      ))}
    </div>
  );
});

// ==============================
// Main Export
// ==============================

export const RefinementBarUI = withAnalyticsContext(defaultAttributes)(
  withAnalyticsEvents()(withRefinementBarContext(ActualRefinementBar)),
);

// ==============================
// Put it together
// ==============================

export const RefinementBar = (props: *) => (
  <RefinementBarProvider {...props}>
    <RefinementBarUI />
  </RefinementBarProvider>
);
