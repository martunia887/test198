import React from 'react';
import styled from 'styled-components';
import Select from '@atlaskit/select';
import pickBy from '../src/utils/pick-by';
import qs from 'query-string';
import Button from '@atlaskit/button';
import ListIcon from '@atlaskit/icon/glyph/list';
import { colors } from '@atlaskit/theme';

export const Sidebar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 400px;
  top: 0;
  bottom: 0;
  left: -416px;
  /* padding: 8px; */
  z-index: 1001;
  background: white;
  transition: transform 220ms cubic-bezier(0.2, 0, 0, 1) 0s,
    left 220ms cubic-bezier(0.2, 0, 0, 1) 0s;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  opacity: 0.3;
  z-index: 1000;
`;

const OpenDrawerButton = styled.div`
  position: absolute;
  z-index: 1000;
  width: 32px;
  height: 32px;
  /* content: ''; */
  cursor: pointer;
  border-radius: 50%;
  /* background: black; */
  left: 32px;
  bottom: 32px;
`;

const Label = styled.label`
  color: ${colors.N700};
  padding-left: 4px;
  margin-bottom: 8px;
  font-size: 16px;
`;

const OptionList = styled.div`
  padding: 16px;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 80px;
`;

const Option = styled.div`
  margin-bottom: 16px;
`;

export const objectMap = (
  object: any,
  func: (key: string, value: any) => any,
) =>
  Object.assign(
    {},
    ...Object.keys(object).map(key => ({
      [key]: func(key, object[key]),
    })),
  );

const setValue = (object: any, path: Array<string>, value: any): any => {
  if (path.length === 1) {
    object[path[0]] = value;
    return object;
  } else if (path.length > 1) {
    const [key, ...others] = path;
    if (isNotNil(object[key])) {
      if (typeof object[key] !== 'object') {
        return object;
      }
    } else {
      object[key] = {};
    }

    return setValue(object[key], others, value);
  }
  return object;
};

interface EditorPropOption {
  label: string;
  value: any;
}

interface EditorPropDefinition {
  name: string;
  type: string;
  options: Array<EditorPropOption>;
}

const booleanOptions: Array<EditorPropOption> = [
  { label: 'true', value: true },
  { label: 'false', value: false },
];

const propList: Array<EditorPropDefinition> = [
  {
    name: 'allowTasksAndDecisions',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowCodeBlocks',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowBreakout',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowRule',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowLists',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowTables',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowPanel',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowDate',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowDynamicTextSizing',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowTextAlignment',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowIndentation',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'allowNewInsertionBehaviour',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'media.allowMediaSingle',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'media.allowResizing',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'media.allowResizingInTables',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'media.allowAnnotation',
    type: 'boolean',
    options: booleanOptions,
  },
  {
    name: 'media.allowLinking',
    type: 'boolean',
    options: booleanOptions,
  },

  /*
  advanced?: boolean;
  allowBackgroundColor?: boolean;
  allowColumnResizing?: boolean;
  allowHeaderColumn?: boolean;
  allowHeaderRow?: boolean;
  allowMergeCells?: boolean;
  allowNumberColumn?: boolean;
  allowColumnSorting?: boolean;
  isHeaderRowRequired?: boolean;
  stickToolbarToBottom?: boolean;
  */
  //   {
  //   name: 'allowTables.advanced',
  //   type: 'boolean',
  //   options: booleanOptions,
  // },

  // {
  //   name: 'allowTables.allowLinking',
  //   type: 'boolean',
  //   options: booleanOptions,
  // },

  // {
  //   name: 'allowTables.allowLinking',
  //   type: 'boolean',
  //   options: booleanOptions,
  // },

  // {
  //   name: 'allowTables.allowLinking',
  //   type: 'boolean',
  //   options: booleanOptions,
  // },

  // {
  //   name: 'allowTables.allowLinking',
  //   type: 'boolean',
  //   options: booleanOptions,
  // },

  // {
  //   name: 'allowTables.allowLinking',
  //   type: 'boolean',
  //   options: booleanOptions,
  // },

  // {
  //   name: 'allowTables.allowLinking',
  //   type: 'boolean',
  //   options: booleanOptions,
  // },
];

const isNotNil = (val: any): boolean => val !== null && val !== undefined;

export const getPropsFromQuery = () => {
  const propNames = propList.map((item: any) => item.name);
  const props = pickBy(
    (key: string, value: any) => propNames.indexOf(key) >= 0,
    qs.parse(window.location.search),
  );
  let result: any = {};
  Object.keys(props).map((key: string) => {
    const match = propList.find(item => item.name === key);
    const value =
      match && match.options.find((item: any) => item.label === props[key]);

    if (isNotNil(value)) {
      result[key] = value;
    }
  });

  return result;
};

export const getEditorProps = () => {
  const props = getPropsFromQuery();
  const result: { [key: string]: any } = {};
  Object.keys(props).forEach((key: string) => {
    const keyPath = key.split('.').filter(val => val !== '');
    if (keyPath.length > 1) {
      setValue(result, keyPath, props[key]);
    } else {
      result[key] = props[key];
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

  const newObj = objectMap(options, (_key, value) => value.label);

  const optionValues = pickBy(
    (_key: string, value: any) => value !== null || value !== undefined,
    newObj,
  );

  window.location.search = qs.stringify({
    ...obj,
    ...optionValues,
  });
};

interface State {
  isDrawerOpen: boolean;
  options: { [key: string]: EditorPropOption };
}

export default class PropsToolbar extends React.Component<{}, State> {
  state: State = {
    isDrawerOpen: false,
    options: {},
  };

  openDrawer = () =>
    this.setState({
      isDrawerOpen: true,
    });

  closeDrawer = () => {
    this.setState({
      isDrawerOpen: false,
    });
  };

  componentDidMount() {
    this.setState({ options: getPropsFromQuery() });
    console.log(this.state.options);
  }

  renderPropOption(prop: EditorPropDefinition) {
    const { name } = prop;
    const { options } = this.state;
    return (
      <Option>
        <Label>{name}</Label>
        <Select
          isClearable
          value={options[name]}
          className="single-select"
          classNamePrefix="react-select"
          styles={
            {
              // container: css => ({ ...css, width: 105 }),
              // dropdownIndicator: css => ({ ...css, paddingLeft: 0 }),
              // menu: css => ({ ...css, width: 300 }),
            }
          }
          options={prop.options}
          onChange={(newValue: EditorPropOption, _actionMeta: any) => {
            if (newValue) {
              this.setState({
                options: {
                  ...options,
                  [name]: newValue,
                },
              });
            } else {
              const { [name]: deleted, ...newOptions } = options;
              this.setState({
                options: newOptions,
              });
            }
          }}
        />
      </Option>
    );
  }

  render() {
    const styles = this.state.isDrawerOpen ? { left: 0 } : {};

    return (
      <>
        {this.state.isDrawerOpen ? (
          <Overlay
            onClick={() => {
              this.closeDrawer();
            }}
          />
        ) : (
          <OpenDrawerButton
            onClick={() => {
              this.openDrawer();
            }}
          >
            <ListIcon label="list-icon" />
          </OpenDrawerButton>
        )}
        <Sidebar style={styles}>
          <OptionList>
            {propList.map(item => this.renderPropOption(item))}
          </OptionList>
          <div
            style={{
              display: 'flex',
              padding: '16px',
              justifyContent: 'space-between',
            }}
          >
            <Button
              onClick={() => {
                this.setState({ options: {} });
              }}
            >
              Clear
            </Button>
            <Button
              onClick={() => {
                applyOptions(this.state.options);
              }}
              appearance="primary"
            >
              Apply
            </Button>
          </div>
        </Sidebar>
        {this.props.children}
      </>
    );
  }
}
