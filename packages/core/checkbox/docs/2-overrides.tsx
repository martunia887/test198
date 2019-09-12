import React from 'react';
import { md, Example, code, Props } from '@atlaskit/docs';

export default md`
The overrides prop is an escape hatch for more granular customisation of the checkbox component. 
The signature for this prop is as follows:

${(
  <Props
    heading="Overrides Prop"
    props={require('!!extract-react-types-loader!../docs/type-docs/Overrides')}
  />
)}

## Customising components using the \`overrides\` prop
There may be scenarios where neither \`style\` customisation, nor \`theme\` customisations will be enough 
to satisfy your usecase. For example you may want to add additional state logic to a component, or a more complex / alternative dom tree.
In these scenarios please leverage the \`component\` property of the overrides prop to switch out the default component provided by @atlaskit/checkbox 
for your own custom component. 

Below is an example of leveraging this property to switch out the default icons used within @atlaskit/checkbox for an alternative set.

${(
  <Example
    packageName="@atlaskit/checkbox"
    Component={require('../examples/09-switching-icons').default}
    title="Switching icons via the overrides prop"
    source={require('!!raw-loader!../examples/09-switching-icons')}
  />
)}

## Passing custom props using the \`overrides\` prop

At other times, passing a property down to a specific dom element may be the only customisation you need, 
in these scenarios having to provide a custom component whole sale is unnecessary and time consuming; this is why @atlaskit/checkbox also provides an 
\`attributesFn\` for providing custom attributes to the underlying dom elements of customisable components.

Below is an example of us passing form and data-testId attributes to the rendered label element. 

${(
  <Example
    packageName="@atlaskit/checkbox"
    Component={require('../examples/10-passing-custom-attributes').default}
    title="Passing custom attributes"
    source={require('!!raw-loader!../examples/10-passing-custom-attributes')}
  />
)}

## Applying CSS customisations using the \`overrides\` prop
There will be scenarios where theme isn't adequate for the type of style customisations your usecase requires. 
In these cases, @atlaskit/checkbox exposes more granular control of the application of CSS through a \`cssFn\` property that can specified in the passed in overrides object.
This is useful for scenarios where you want to augment how a particular theme token is being applied to your styles or if you have customisations 
that the theme tokens do not support.

### Using the cssFn
The \`cssFn\` property on the overrides prop is a function of the following signature:

${code`
{
  IconWrapper: {
    cssFn: (defaultStyles, state) => {...}
  }
}
`}

As it takes the default CSS styles as the first argument, spreading is an easy way to compose your desired new styles together with the default styles of the component:

${code`
const customIconWrapperStyles = (defaultStyles: any) => {
  return {
    ...defaultStyles,
    fill: 'green',
  };
};
`}

Below is an example of using the \`cssFn\` to augment the transition styles of an instance of @atlaskit/checkbox
${(
  <Example
    packageName="@atlaskit/checkbox"
    Component={require('../examples/11-custom-styles').default}
    title="Custom Styles"
    source={require('!!raw-loader!../examples/11-custom-styles')}
  />
)}

`;
