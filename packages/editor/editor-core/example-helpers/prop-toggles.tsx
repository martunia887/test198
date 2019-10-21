import React from 'react';
import styled from 'styled-components';
import Toggle from '@atlaskit/toggle';
import Select from '@atlaskit/select';
import pickBy from '../src/utils/pick-by';
import qs from 'query-string';

export const App = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Sidebar = styled.div`
  flex: 0 0 256px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
`;

const OpenDrawerButton = styled.button`
  position: absolute;
`;

const booleanOptions = [
  { label: 'true', value: true },
  { label: 'false', value: false },
];

const propList = [
  {
    name: 'allowTasksAndDecisions',
    type: 'boolean',
    options: booleanOptions,
  },
];

const getPropsFromQuery = () => {
  const propNames = propList.map((item: any) => item.name);
  return pickBy(
    (key: string, value: any) => propNames.indexOf(key) >= 0,
    qs.parse(window.location.search),
  );
};

interface State {
  isDrawerOpen: boolean;
  options: any;
}

export default class PropsToolbar extends React.Component {
  state = {
    isDrawerOpen: false,
    options: {},
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  onClose = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  renderBooleanPropToggle(propName: string) {
    return (
      <div key={propName}>
        <Toggle onChange={value => console.log(value)} label="" />
        {propName}
      </div>
    );
  }

  render() {
    return (
      <App>
        <Sidebar>
          {propList.map(item => {
            return (
              <div>
                <label>{item.name}</label>
                <Select
                  isClearable
                  value={this.state.options[item.name]}
                  className="single-select"
                  classNamePrefix="react-select"
                  styles={
                    {
                      // container: css => ({ ...css, width: 105 }),
                      // dropdownIndicator: css => ({ ...css, paddingLeft: 0 }),
                      // menu: css => ({ ...css, width: 300 }),
                    }
                  }
                  options={item.options}
                  onChange={(newValue: any, _actionMeta: any) =>
                    this.setState({
                      options: {
                        ...this.state.options,
                        [item.name]: newValue,
                      },
                    })
                  }
                />
              </div>
            );
          })}
          <button>apply</button>
        </Sidebar>

        <OpenDrawerButton>X</OpenDrawerButton>
        <div style={{ width: '100%' }}>{this.props.children}</div>
      </App>
    );
  }
}
