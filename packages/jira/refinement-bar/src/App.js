import React, { Component } from 'react';
import styled from 'styled-components';
import querystring from 'querystring';

import RefinementBar from './components/RefinementBar';
import { cloneObj, objectMap } from './utils';
import {
  AvatarAsyncSelectFilter,
  NumberFilter,
  SelectFilter,
  SearchFilter,
  TextFilter,
} from './fields';
import {
  RefinementBarConfig,
  RefinementBarConsumer,
} from './components/ContextProvider';

// UTIL
// function timeout(ms = 1000) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

const CAPITALS = [
  { label: 'Adelaide', value: 'adelaide' },
  { label: 'Brisbane', value: 'brisbane' },
  { label: 'Canberra', value: 'canberra' },
  { label: 'Darwin', value: 'darwin' },
  { label: 'Hobart', value: 'hobart' },
  { label: 'Melbourne', value: 'melbourne' },
  { label: 'Perth', value: 'perth' },
  { label: 'Sydney', value: 'sydney' },
];

const ASSIGNEES = [
  {
    value: 'dan-abromov',
    label: 'Dan Abromov',
    avatar: `http://i.pravatar.cc/48?u=dan-abromov`,
  },
  {
    value: 'kyle-mathews',
    label: 'Kyle Mathews',
    avatar: `http://i.pravatar.cc/48?u=kyle-mathews`,
  },
  {
    value: 'brian-vaughn',
    label: 'Brian Vaughn',
    avatar: `http://i.pravatar.cc/48?u=brian-vaughn`,
  },
  {
    value: 'sunil-pai',
    label: 'Sunil Pai',
    avatar: `http://i.pravatar.cc/48?u=sunil-pai`,
  },
  {
    value: 'michael-jackson',
    label: 'Michael Jackson',
    avatar: `http://i.pravatar.cc/48?u=michael-jackson`,
  },
  {
    value: 'ryan-florence',
    label: 'Ryan Florence',
    avatar: `http://i.pravatar.cc/48?u=ryan-florence`,
  },
];
const filterAssignees = inputValue => {
  return ASSIGNEES.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()),
  );
};

const FIELD_META = {
  approvals: {
    label: 'Approvals',
    type: SelectFilter,
    options: CAPITALS,
  },
  browser: {
    label: 'Browser',
    type: TextFilter,
    note: 'The browser(s) in which this issue is reproducible (if any)',
  },
  comment: {
    label: 'Comment',
    type: TextFilter,
  },
  description: {
    label: 'Description',
    type: TextFilter,
  },
  votes: {
    label: 'Votes',
    type: NumberFilter,
  },
  search: {
    type: SearchFilter,
    defaultValue: 'Hello w',
  },
  'issue-type': {
    type: SelectFilter,
    label: 'Type',
    options: [
      {
        label: 'Issue Types',
        options: [
          { value: 'all-standard', label: 'All standard issue types' },
          { value: 'all-sub-task', label: 'All sub-task issue types' },
        ],
      },
      {
        label: 'Standard Issue Types',
        options: [
          { value: 'story', label: 'Story' },
          { value: 'bug', label: 'Bug' },
          { value: 'task', label: 'Task' },
          { value: 'epic', label: 'Epic' },
          { value: 'change', label: 'Change' },
          { value: 'problem', label: 'Problem' },
        ],
      },
    ],
  },
  'issue-assignee': {
    type: AvatarAsyncSelectFilter,
    label: 'Assignee',
    cacheOptions: true,
    defaultOptions: [
      {
        value: '__current-user',
        label: 'Current User',
        avatar: `http://i.pravatar.cc/48?u=__current-user`,
      },
      {
        value: '__unassigned',
        label: 'Unassigned',
        avatar: null,
      },
    ],
    loadOptions: inputValue =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(filterAssignees(inputValue));
        }, 1000);
      }),
  },
  // 'issue-assignee': {
  //   type: AsyncSelectFilter,
  //   label: 'Assignee',
  //   cacheOptions: true,
  //   defaultOptions: true,
  //   // PROMISE
  //   loadOptions: inputValue =>
  //     new Promise(resolve => {
  //       setTimeout(() => {
  //         resolve(filterAssignees(inputValue));
  //       }, 1000);
  //     }),
  //   // CALLBACK
  //   // loadOptions: (inputValue, callback) => {
  //   //   setTimeout(() => {
  //   //     callback(filterAssignees(inputValue));
  //   //   }, 1000);
  //   // },
  // },
};

const Pre = styled.pre({
  backgroundColor: '#F4F5F7',
  borderRadius: 4,
  boxSizing: 'border-box',
  color: '#505F79',
  flex: 1,
  fontSize: '0.85rem',
  lineHeight: 1.6,
  maxWidth: '100%',
  overflow: 'auto',
  padding: 16,
});
const Heading = styled.h4({
  margin: '1em 0 0',
});

const Page = ({ children }) => (
  <div style={{ height: '100vh', display: 'flex' }}>
    <div style={{ width: 240, backgroundColor: '#eee' }} />
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        padding: 40,
      }}
    >
      {children}
    </div>
  </div>
);

const dataMap = ([key, val]) => (
  <div key={key}>
    <code>
      {key}: {JSON.stringify(val, null, 2)}
    </code>
  </div>
);

const decodeQuery = () => {
  const params = querystring.parse(window.location.search.replace('?', ''));
  const decoded = objectMap(params, v => JSON.parse(v));

  return decoded;
};

const EncodeQuery = ({ values }) => {
  const params = objectMap(values, v => JSON.stringify(v));
  const path = window.location.origin + window.location.pathname;
  const qs = '?' + querystring.stringify(params);

  window.history.replaceState({}, null, path + qs);

  return null;
};

class App extends Component {
  state = { values: decodeQuery() };
  addValue = add => {
    const values = cloneObj(this.state.values, { add });
    this.setState({ values });
  };
  removeValue = remove => {
    const values = cloneObj(this.state.values, { remove });
    this.setState({ values });
  };
  updateValue = add => {
    const values = cloneObj(this.state.values, { add });
    this.setState({ values });
  };

  render() {
    return (
      <RefinementBarConfig
        fields={FIELD_META}
        addValue={this.addValue}
        removeValue={this.removeValue}
        updateValue={this.updateValue}
        values={this.state.values}
      >
        <>
          {/* <style>
            {`
              input[type=number]::-webkit-inner-spin-button,
              input[type=number]::-webkit-outer-spin-button {
                -webkit-appearance: none;
                margin: 0;
              }
              input[type="number"] {
                -moz-appearance: textfield;
              }
          `}
          </style> */}
          <RefinementBarConsumer>
            {values => <EncodeQuery values={values} />}
          </RefinementBarConsumer>

          <Page className="App">
            <div>
              <h1>Refinement Bar: Prototype</h1>
              <RefinementBar
                constant={['search', 'issue-assignee', 'issue-type']}
                initialAvailable={[
                  'approvals',
                  'browser',
                  'comment',
                  'description',
                  'votes',
                ]}
                initialSelected={['browser', 'votes']}
              />
            </div>

            <RefinementBarConsumer>
              {values => (
                <>
                  <Heading>Values</Heading>
                  <Pre>{Object.entries(values).map(dataMap)}</Pre>
                </>
              )}
            </RefinementBarConsumer>
          </Page>
        </>
      </RefinementBarConfig>
    );
  }
}

export default App;
