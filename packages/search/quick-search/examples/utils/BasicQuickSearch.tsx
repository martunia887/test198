import * as React from 'react';
import { objectData, personData, containerData } from './mockData';
import {
  QuickSearch,
  ResultItemGroup,
  ContainerResult,
  PersonResult,
  ObjectResult,
  quickSearchFilterItem,
} from '../../src';

type DataShape = {
  title: string;
  items: Array<any>;
};

const data: DataShape[] = [
  {
    title: 'Objects',
    items: objectData(5),
  },
  {
    title: 'People',
    items: personData(5),
  },
  {
    title: 'Containers',
    items: containerData(5),
  },
];

const availableResultTypes = {
  person: PersonResult,
  object: ObjectResult,
  container: ContainerResult,
};

const mapResultsDataToComponents = resultData => {
  if (!resultData || !resultData.length) {
    return 'Nothin` to see here';
  }

  return resultData.map(group => (
    <ResultItemGroup title={group.title} key={group.title}>
      {group.items.map(props => {
        const Result = availableResultTypes[props.type];
        return Result ? <Result key={props.resultId} {...props} /> : null;
      })}
    </ResultItemGroup>
  ));
};

function contains(string, query) {
  return string.toLowerCase().indexOf(query.toLowerCase()) > -1;
}

function searchData(query: string): DataShape[] {
  const results = data
    .map(({ title, items }) => {
      const filteredItems = items.filter(item => contains(item.name, query));
      return { title, items: filteredItems };
    })
    .filter(group => group.items.length);
  return results;
}

// a little fake store for holding the query after a component unmounts
type Store = {
  query?: string;
};
const store: Store = {};

type Props = {
  fakeNetworkLatency?: number;
  labels: quickSearchFilterItem[];
};

type State = {
  query: string;
  results: DataShape[];
  isLoading: boolean;
  labels: quickSearchFilterItem[];
};

export default class BasicQuickSearch extends React.Component<Props, State> {
  static defaultProps = {
    fakeNetworkLatency: 0,
    labels: [],
  };

  state = {
    query: store.query || '',
    results: searchData(''),
    isLoading: false,
    labels: this.props.labels,
  };

  searchTimeoutId: any;

  setQuery(query: string) {
    store.query = query;
    this.setState({
      query,
    });
  }

  search = (query: string) => {
    if (this.searchTimeoutId) {
      clearTimeout(this.searchTimeoutId);
    }
    this.setState({
      isLoading: true,
    });
    this.setQuery(query);
    const results = searchData(query);
    this.searchTimeoutId = window.setTimeout(() => {
      this.setState({
        results,
        isLoading: false,
      });
    }, this.props.fakeNetworkLatency);
  };

  onLabelsUpdated = newLabels => {
    this.setState({
      labels: newLabels,
    });
  };

  render() {
    return (
      <QuickSearch
        isLoading={this.state.isLoading}
        onSearchInput={event => {
          this.search(event.currentTarget.value);
        }}
        onSearchSubmit={() => console.log('onSearchSubmit', this.state.query)}
        value={this.state.query}
        labels={this.state.labels}
        onLabelsUpdated={this.onLabelsUpdated}
      >
        <div style={{ paddingLeft: '10px' }}>
          {mapResultsDataToComponents(this.state.results)}
        </div>
      </QuickSearch>
    );
  }
}
