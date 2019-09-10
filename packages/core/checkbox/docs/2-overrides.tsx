import { md, Example, code } from '@atlaskit/docs';
export default md`
# Overrides 
The overrides prop is an escape hatch for more granular customisation of the checkbox component. 
The signature for this prop is as follows:

${code`
{
  LabelText: {
    component: React.ComponentType<IconProps>
    cssFn: (defaultState)
  },
  Label,
  IconWrapper, 
  Icon,
  IconIndeterminate,
}
`}

## Customising components using the \`overrides\` prop

${(
  <Example
    packageName="@atlaskit/checkbox"
    Component={require('../examples/09-switching-icons').default}
    title="Switching icons via the overrides prop"
    source={require('!!raw-loader!../examples/09-switching-icons')}
  />
)}

## Passing custom props using the \`overrides\` prop

## Applying style customisations using the \`overrides\` prop

For simpler control of the specific CSS applied to components, a \`cssFn\` property can specified in the passed in overrides object:




### Creating the Styles Prop
The \`cssFn\` property on the overrides prop is a function of the following signature:

${code`
{
  IconWrapper: {
    cssFn: (defaultStyles, state) => {...}
  }
}
`}

Style keys relate to different internal components that support custom styling. Currently, the \`iconWrapper\` component is supported.

Style values take the default CSS styles, and return new ones. Spreading is an easy way to add one or two new values:

${code`
const customIconWrapperStyles = (defaultStyles: any) => {
  return {
    ...defaultStyles,
    fill: 'green',
  };
};
`}

`;
