import React from 'react';
import styled from 'styled-components';
import Toggle from '@atlaskit/toggle';
import Select from '@atlaskit/select';
import pickBy from '../src/utils/pick-by';
import qs from 'query-string';
import Button, { ButtonGroup } from '@atlaskit/button';

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

const propList: Array<{ [key: string]: any }> = [
  {
    name: 'allowTasksAndDecisions',
    type: 'boolean',
    options: booleanOptions,
  },
];

const isNotNil = (val: any): boolean => val !== null && val !== undefined;

const getPropsFromQuery = () => {
  const propNames = propList.map((item: any) => item.name);
  return pickBy(
    (key: string, value: any) => propNames.indexOf(key) >= 0,
    qs.parse(window.location.search),
  );
};

const getPropsStateFromQuery = () => {
  const props = getPropsFromQuery();
  let result: any = {};
  Object.keys(props).map((key: string) => {
    const match = propList.find(item => item.name === key);
    const value =
      match && match.options.find(item => item.label === props[key]);

    if (isNotNil(value)) {
      result[key] = value;
    }
  });

  return result;
};

const applyOptions = (options: any) => {
  const obj = pickBy(
    (key: string, value: any) =>
      ['groupId', 'packageId', 'exampleId'].indexOf(key) >= 0,
    qs.parse(window.location.search),
  );

  let newObj = Object.assign(
    {},
    ...Object.keys(options).map(key => ({ [key]: options[key].label })),
  );

  const optionValues = pickBy(
    (key: string, value: any) => value !== null || value !== undefined,
    newObj,
  );

  window.location.search = qs.stringify({
    ...obj,
    ...optionValues,
  });
};

interface State {
  isDrawerOpen: boolean;
  options: { [key: string]: any };
}

export default class PropsToolbar extends React.Component<{}, State> {
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

  componentDidMount() {
    this.setState({ options: getPropsStateFromQuery() });
  }

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
                  onChange={(newValue: any, _actionMeta: any) => {
                    if (newValue) {
                      this.setState({
                        options: {
                          ...this.state.options,
                          [item.name]: newValue,
                        },
                      });
                    } else {
                      const {
                        [item.name]: deleted,
                        ...newOptions
                      } = this.state.options;

                      this.setState({
                        options: newOptions,
                      });
                    }
                  }}
                />
              </div>
            );
          })}
          <ButtonGroup appearance="primary">
            <Button
              onClick={() => {
                applyOptions(this.state.options);
              }}
            >
              Apply
            </Button>
            <Button
              onClick={() => {
                this.setState({ options: {} });
              }}
            >
              Clear
            </Button>
          </ButtonGroup>
        </Sidebar>

        {/* <OpenDrawerButton>X</OpenDrawerButton> */}
        <div style={{ width: '100%' }}>{this.props.children}</div>
      </App>
    );
  }
}
