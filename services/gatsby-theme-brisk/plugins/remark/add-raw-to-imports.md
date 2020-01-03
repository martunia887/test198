# Add raw to imports

The goal of this plugin is to make rendering examples easier by removing the requirement for the user to manually import the raw contents of a file.

Previously the API for examples looked like:

```js
// index.mdx
import Example from '../examples/01-basicAvatar';
import RawExample from '!!raw-loader!../examples/01-basicAvatar';

<Example Component={Example} source={RawExample} />;
```

while our new API looks like:

```js
// index.mdx
import Example from '../examples/01-basicAvatar';

<Example Component={Example} />;
```

We are doing this by modifying the AST before webpack checks the file to secretly add in the raw loaded content. We are doing this in the remark step so the output after remark has run is equivalent to:

```js
// index.mdx
import Example from '../examples/01-basicAvatar';
import RAW_UNSAFEEXample from '!!raw-loader!../examples/01-basicAvatar';

<div hidden>
    {Example.___raw = RAW_UNSAFEEXample}
</div>

<Example Component={Example} />;
```

## Some quick notes on methods:

### Why are we doing assignment in a div?

mdx does not execute code found in the file, only rendering jsx nodes. If we want to do this assignment, we need to do it in a jsx node.
