# Brisk Gatsby theme

## Theme Options

`packages` is required, and takes an array of package names
`docsFolder` defines the location of the mdx files in within the package folder. Defaults to 'constellation'

## Rendering Examples

In a `.mdx` docs folder, you can easily include an example. The `<Example />` component is available by default, in any mdx file the website will render.

To render an example you need to write:

```js
// some-file.mdx
import MyExample from '../examples/my-example';

<Example componentName="@atlaskit/my-component" Component={Example} />;
```

Note that the code found in the `my-example` file will also be visible with the rendered example.

There are some rules that you need to follow for this to work smoothly:

1. All imports for examples must be at the top of the mdx file. If the imports are placed further down, it will almost certainly cause compile errors.
2. You must provide a `componentName` property - if you do not, references to `../src` in the example's raw form will be left in, instead of being replaced by the component name. Note that it replaces specifically `../src` by default. Please ask the maintainer if your examples will live somewhere where a different path needs to be replaced.
3. All examples should be imported from a `/examples` folder. If they are not, the code will not be visible, and the app may crash. If for some reason you cannot do this, you can provide the source code yourself using:

```js
// some-file.mdx
import MyExample from '../somewhere/out-there';
import source from '!!raw-loader!../somewhere/out-there';

<Example
  componentName="@atlaskit/my-component"
  Component={Example}
  source={source}
/>;
```

Note that only the contents of the example file will be visible. If information is not in this file (for example, it is in a helper file), this obfuscates how to use the components from users.

This is currently using the `<Example />` component from `@atlaskit/docs`, except modifying how the source is provided. Other props are passed down directly.
