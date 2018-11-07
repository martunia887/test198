//@flow
import { code, md } from '@atlaskit/docs';

export default md`
## v8 to v9

### 🎉 Render Prop

Pagination now supports render props.

The render prop function is called my with four arguments which are these four components:

1. **Page**: This is the actual component that you will use to display you page

2. **LeftNavigation**: A react component that displays the left navigation button

3. **RightNavigation**: A react component that displays the right navigation button

4. **Ellipses**: This will pring '...'  in the page, this is used to skip the pages

and there is a new export from the package:

**collapseRange**: This is a util function which takes in maximumVisiblePages, current page value and pages as arguments
and returns an array of items to know

### 🚗 Upgrade from v8

To see an example of a pagination in v8 to show 10 pages:

${code`
<Pagination
    value={5}    // selected value
    total={10}  // Total number of pages
    onChange={e => console.log('page changed', e)} // onChange hook with page selected
/>
`}

**Drawbacks with the above approach:**

- You cannot control the total number of pagesNumber's displayed, as it is constant 7 defined in component.
- You have no control over what you display on page number, by that I mean it always displays 1,2,3... there is no
support for localisation.
- We cannot render Link component for routing with react-router, etc.

In v9 we can re-write the above component as:

${code`
import Pagination, { collapseRange } from '@atlaskit/pagination';

const MAX_VISIBLE_PAGES = 7;

export default class ManagedPagination extends Component<Props> {
  onChange = (newValue: number) => {
    this.props.onChange(newValue);
  };

  render() {
    const { total, value = 1, i18n } = this.props;
    const items = [...Array(total)].map((_, index) => index + 1);
    const pageLinksCollapsed = collapseRange(MAX_VISIBLE_PAGES, value, items);
    return (
      <Pagination>
        {(LeftNavigator, Page, RightNavigator, Ellipses) => (
          <Fragment>
            <LeftNavigator
              ariaLabel={i18n.prev}
              isDisabled={value === 1}
              onClick={() => this.onChange(value - 1)}
            />
            {pageLinksCollapsed.map((pageNumber, key) => {
              if (pageNumber === '...') {
                //eslint-disable-next-line
                return <Ellipses key={\`\${pageNumber}-\${key}\`} />;
              }
              return (
                <Page
                  key={\`\${pageNumber}\`}
                  isSelected={pageNumber === this.props.value}
                  onClick={() => this.onChange(pageNumber)}
                >
                  {pageNumber}
                </Page>
              );
            })}
            <RightNavigator
              ariaLabel={i18n.next}
              isDisabled={value === total}
              onClick={() => this.onChange(value + 1)}
            />
          </Fragment>
        )}
      </Pagination>
    );
  }
}
`}

This might look a lot of code at first but if you look closely we will find this API gives us more control over the component.

**Advantages over old API:**

- You have full control over the total number of pages's displayed, it is the first argument in the \`collapseRange\` function.
- You have full control over what text to display in Page component, by that I mean you can render roman number I, II, III...
localisation can be achieved easily.
- We can render Link component for routing with react-router, etc.

## v7 to v8

### 🎉 ADG styling

In v8 pagination styling has been updated.

### 🎉 No changes in the API

There are no changes in the Pagination API. 
Therefore, no code change will be required to consume this major version. 
However, you might need to update your styling.

### 🚨 Styles changes

There must be spacing a 24px ( \`3 * gridSize\` ) between pagination and anything above it.
Add this spacing to the element above the pagination component.

In v7 this spacing was not there either, but because in v8 the buttons have a dark background color the experience will appear broken if this spacing is not there.

Have your designers check that this change does not break the look within your app. Functionaly there no changes in the component.

Example:

${code`
import { gridSize } from '@atlaskit/theme';

<div>
    <div style={{marginBottom: (gridSize() * 3) + 'px'}}>
        <!-- Your awesome page -->
    </div>
    <Pagination
        defaultValue={5}
        total={10}
        onChange={e => console.log('page changed', e)}
    />
</div>
`}
`;
