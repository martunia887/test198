import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

import { ButtonGroup } from '@atlaskit/button';
import { borderRadius, gridSize } from '@atlaskit/theme';

import { FloatingToolbarItem } from '../types';
import { compareArrays } from '../utils';
import Button from './Button';
import Dropdown from './Dropdown';
import Select, { SelectOption } from './Select';
import Separator from './Separator';
import Input from './Input';
import Typeahead from './Typeahead';
import { ProviderFactory } from '@atlaskit/editor-common';

const akGridSize = gridSize();

export interface Props {
  items: Array<FloatingToolbarItem<Function>>;
  dispatchCommand: (command?: Function) => void;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  providerFactory: ProviderFactory;
}

const ToolbarContainer = styled.div`
  background-color: white;
  border-radius: ${borderRadius()}px;
  box-shadow: 0 0 1px rgba(9, 30, 66, 0.31),
    0 4px 8px -2px rgba(9, 30, 66, 0.25);
  padding: ${akGridSize / 2}px ${akGridSize}px;
  display: flex;
  line-height: 1;
  box-sizing: border-box;
  ${(props: { hasCompactLeftPadding: boolean }) =>
    props.hasCompactLeftPadding ? `padding-left: ${akGridSize / 2}px` : ''};
  & > div {
    align-items: center;
  }

  .hyperlink-toolbar {
    position: relative;
    left: 50%;
  }
`;

export default class Toolbar extends Component<Props> {
  render() {
    const {
      items,
      dispatchCommand,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      focusEditor,
    } = this.props;
    if (!items.length) {
      return null;
    }

    // Select has left padding of 4px to the border, everything else 8px
    const firstElementIsSelect = items[0].type === 'select';

    return (
      <ToolbarContainer
        aria-label="Floating Toolbar"
        hasCompactLeftPadding={firstElementIsSelect}
      >
        <ButtonGroup>
          {items
            .filter(item => !item.hidden)
            .map((item, idx) => {
              switch (item.type) {
                case 'button':
                  const ButtonIcon = item.icon;
                  return (
                    <Button
                      key={idx}
                      title={item.title}
                      href={item.href}
                      icon={<ButtonIcon label={item.title} />}
                      appearance={item.appearance}
                      target={item.target}
                      onClick={() => dispatchCommand(item.onClick)}
                      onMouseEnter={() => dispatchCommand(item.onMouseEnter)}
                      onMouseLeave={() => dispatchCommand(item.onMouseLeave)}
                      selected={item.selected}
                      disabled={item.disabled}
                    />
                  );

                case 'input':
                  return (
                    <Input
                      key={idx}
                      mountPoint={popupsMountPoint}
                      boundariesElement={popupsBoundariesElement}
                      defaultValue={item.defaultValue}
                      placeholder={item.placeholder}
                      onSubmit={value => dispatchCommand(item.onSubmit(value))}
                      onBlur={value => dispatchCommand(item.onBlur(value))}
                    />
                  );

                case 'typeahead':
                  console.log('focus is ', focusEditor);
                  return (
                    <Typeahead
                      key={idx}
                      boundariesElement={popupsBoundariesElement}
                      mountPoint={popupsMountPoint}
                      placeholder={item.placeholder}
                      provider={item.provider}
                      onSubmit={(href, text) => {
                        dispatchCommand(item.onSubmit(href, text));
                        focusEditor();
                        // return true;
                      }}
                      TypeaheadItems={item.TypeaheadItems}
                    />
                  );

                case 'dropdown':
                  const DropdownIcon = item.icon;
                  return (
                    <Dropdown
                      key={idx}
                      title={item.title}
                      icon={<DropdownIcon label={item.title} />}
                      dispatchCommand={dispatchCommand}
                      options={item.options}
                      hideExpandIcon={item.hideExpandIcon}
                      mountPoint={popupsMountPoint}
                      boundariesElement={popupsBoundariesElement}
                      scrollableElement={popupsScrollableElement}
                    />
                  );

                case 'select':
                  return (
                    <Select
                      key={idx}
                      dispatchCommand={dispatchCommand}
                      options={item.options}
                      hideExpandIcon={item.hideExpandIcon}
                      mountPoint={popupsMountPoint}
                      boundariesElement={popupsBoundariesElement}
                      scrollableElement={popupsScrollableElement}
                      defaultValue={item.defaultValue}
                      placeholder={item.placeholder}
                      onChange={(selected: SelectOption) =>
                        dispatchCommand(item.onChange(selected))
                      }
                    />
                  );

                case 'separator':
                  return <Separator key={idx} />;
              }
            })}
        </ButtonGroup>
      </ToolbarContainer>
    );
  }

  shouldComponentUpdate(nextProps: Props) {
    return !compareArrays(this.props.items, nextProps.items);
  }
}
