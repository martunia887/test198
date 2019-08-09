// @flow

import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import Calendar from '../src';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';
import ja from 'react-intl/locale-data/ja';

const log = msg => e => console.log(msg, e);

export default class IntlCalendar extends Component {
  state = {
    locale: 'ja',
  };

  onLocaleChange = event => {
    const localeString = event.target.innerText;

    // TODO: Cache this
    import('react-intl/locale-data/' + localeString)
      .then(localeImport => addLocaleData(localeImport.default))
      .then(() => this.setState({ locale: localeString }));
  };

  render() {
    return (
      <div>
        <DropdownMenu
          trigger="Choices"
          triggerType="button"
          onOpenChange={e => console.log('dropdown opened', e)}
        >
          <DropdownItemGroup>
            <DropdownItem onClick={this.onLocaleChange}>en</DropdownItem>
            <DropdownItem onClick={this.onLocaleChange}>ja</DropdownItem>
            <DropdownItem onClick={this.onLocaleChange}>es</DropdownItem>
          </DropdownItemGroup>
        </DropdownMenu>

        <IntlProvider locale={this.state.locale}>
          <Calendar
            defaultDisabled={['2020-12-04']}
            defaultPreviouslySelected={['2020-12-06']}
            defaultSelected={['2020-12-08']}
            defaultMonth={12}
            defaultYear={2020}
            innerProps={{
              style: {
                border: '1px solid red',
                display: 'inline-block',
              },
            }}
            onBlur={log('blur')}
            onChange={log('change')}
            onFocus={log('focus')}
            onSelect={log('select')}
          />
        </IntlProvider>
      </div>
    );
  }
}
