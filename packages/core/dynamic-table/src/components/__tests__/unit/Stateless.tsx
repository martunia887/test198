import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import DynamicTableWithAnalytics, {
  DynamicTableWithoutAnalytics as StatelessDynamicTable,
} from '../../Stateless';
import TableHead from '../../TableHead';
import { StatelessProps } from '../../../types';
import { head, rowsWithKeys, sortKey, secondSortKey } from './_data';

const simulateOnSort = (wrapper: ShallowWrapper<StatelessProps>) => {
  const tableHead = wrapper.find(TableHead);
  const item = { key: sortKey };
  tableHead.prop('onSort')(item)();
  return item;
};

const createProps: () => StatelessProps = () => ({
  head,
  rows: rowsWithKeys,
  sortKey,
  sortOrder: 'ASC',
  onSort: jest.fn(),
});

test('onSort should change to ASC from DESC if table is not rankable', () => {
  const props = createProps();
  const wrapper = shallow(
    <StatelessDynamicTable {...props} sortOrder="DESC" />,
  );

  const item = simulateOnSort(wrapper);
  expect(props.onSort).toHaveBeenCalledTimes(1);
  expect(props.onSort).toHaveBeenLastCalledWith({
    key: sortKey,
    item,
    sortOrder: 'ASC',
  });
});

test('onSort should change to none if table is rankable and sort order was DESC', () => {
  const props = createProps();
  const wrapper = shallow(
    <StatelessDynamicTable {...props} sortOrder="DESC" isRankable />,
  );

  const item = simulateOnSort(wrapper);
  expect(props.onSort).toHaveBeenCalledTimes(1);
  expect(props.onSort).toHaveBeenLastCalledWith({
    key: null,
    item,
    sortOrder: null,
  });
});

test('onSort should change to DESC if table is rankable and sort order was ASC', () => {
  const props = createProps();
  const wrapper = shallow(
    <StatelessDynamicTable {...props} sortOrder="ASC" isRankable />,
  );

  const item = simulateOnSort(wrapper);
  expect(props.onSort).toHaveBeenCalledTimes(1);
  expect(props.onSort).toHaveBeenLastCalledWith({
    key: sortKey,
    item,
    sortOrder: 'DESC',
  });
});

test('onSort should change to ASC if table is rankable and was sorted using on different row', () => {
  const props = createProps();
  const wrapper = shallow(
    <StatelessDynamicTable
      {...props}
      sortOrder="DESC"
      sortKey={secondSortKey}
      isRankable
    />,
  );

  const item = simulateOnSort(wrapper);
  expect(props.onSort).toHaveBeenCalledTimes(1);
  expect(props.onSort).toHaveBeenLastCalledWith({
    key: sortKey,
    item,
    sortOrder: 'ASC',
  });
});

describe('DynamicTableWithAnalytics', () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'warn');
    jest.spyOn(global.console, 'error');
  });
  afterEach(() => {
    // @ts-ignore - property 'mockRestore' does not exist
    global.console.warn.mockRestore();

    // @ts-ignore - property 'mockRestore' does not exist
    global.console.error.mockRestore();
  });

  it('should mount without errors', () => {
    mount(<DynamicTableWithAnalytics {...createProps()} />);
    /* eslint-disable no-console */
    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();
    /* eslint-enable no-console */
  });
});
