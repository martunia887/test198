import React, { Component, Fragment, ReactElement } from 'react';
import { CheckboxSelect, RadioSelect } from '../../src';
import { OptionType } from '../../src/components/types';
import PropStatus from './propStatus';

const allOptions = [
  { value: 'removed', label: 'removed' },
  { value: 'unchanged', label: 'unchanged' },
  { value: 'renamed', label: 'renamed' },
  { value: 'changed', label: 'changed' },
];

const packageOptions = [
  { value: 'all', label: 'all' },
  { value: 'single', label: 'single only' },
  { value: 'multi', label: 'multi only' },
];

const filterOptions = [
  { value: 'propName', label: 'propName' },
  { value: 'status', label: 'status' },
];

const Header = ({ children }: { children: string }) => (
  <td
    css={{
      fontWeight: 'bold',
      padding: '4px 8px 4px 0',
      borderBottom: '3px solid #eee',
    }}
  >
    {children}
  </td>
);

const Table = ({ children }: { children: Array<ReactElement<any>> }) => (
  <table
    css={{
      width: '100%',
      marginTop: '30px',
      borderCollapse: 'collapse',
    }}
  >
    {children}
  </table>
);

const getDisplayedStatus = (status: string) => {
  if (status === 'components' || status === 'styles') return 'removed';
  return status;
};

const matchPackageFilter = (packages: Array<string>, packageFilter: string) => {
  switch (packageFilter) {
    case 'single':
      if (packages.includes('single')) {
        return true;
      }
      return false;
    case 'multi':
      if (!packages.includes('single')) {
        return true;
      }
      return false;
    case 'all':
    default:
      return true;
  }
};

interface Prop {
  data: Array<{
    content?: ReactElement<any>,
    label: string,
    key: string,
    status: string,
    packages: Array<string>,
  }>,
};

interface State {
  selectedOptions: Array<string>,
  filterValue: string,
  packageFilter: string,
};

const stringAllOptions: Array<string> = allOptions.map(
  (opt: { value: string }): string => opt.value,
);

export default class PropChanges extends Component<Prop, State> {
  state = {
    selectedOptions: stringAllOptions,
    filterValue: filterOptions[0].value,
    packageFilter: 'all',
  };

  onFilterChange = (option: Array<OptionType>) => {
    this.setState({ selectedOptions: option.map(opt => opt.value) });
  };

  onPackageChange = (option: { value: string }) => {
    this.setState({
      packageFilter: option.value,
    });
  };

  onSortChange = (option: { value: string, label: string }) => {
    this.setState({ filterValue: option.value });
  };

  render() {
    const { data } = this.props;
    const { selectedOptions, filterValue, packageFilter } = this.state;
    return (
      <Fragment>
        <h4> Filter by Props </h4>
        <CheckboxSelect
          defaultValue={allOptions}
          options={allOptions}
          onChange={this.onFilterChange}
        />
        <h4> Filter by Package</h4>
        <RadioSelect
          defaultValue={packageOptions[0]}
          options={packageOptions}
          onChange={this.onPackageChange}
        />
        <h4> Sort Props </h4>
        <RadioSelect
          defaultValue={filterOptions[0]}
          options={filterOptions}
          onChange={this.onSortChange}
        />
        <Table>
          <thead>
            <tr>
              <Header>Prop</Header>
              <Header>Status</Header>
              <Header>Notes</Header>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => {
                if (filterValue === 'propName')
                  return a.key.localeCompare(b.key);
                return getDisplayedStatus(a.status).localeCompare(
                  getDisplayedStatus(b.status),
                );
              })
              .map(entry => {
                const { key, status, content, packages } = entry;

                if (selectedOptions.includes(getDisplayedStatus(status))) {
                  return matchPackageFilter(packages, packageFilter) ? (
                    <PropStatus
                      key={key}
                      prop={key}
                      status={status}
                      content={content}
                    />
                  ) : null;
                }
              })}
          </tbody>
        </Table>
      </Fragment>
    );
  }
}
