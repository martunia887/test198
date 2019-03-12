import { ssr_hydrate } from '@atlaskit/elements-test-helpers';

const ExamplesPath = '../../../../examples';

describe('server side rendering and hydration', async () => {
  beforeEach(() => {
    jest.spyOn(global.console, 'error');
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  test.each([['00-single.tsx']])('ssr("%s")', async (fileName: string) => {
    await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });

  // TODO: https://product-fabric.atlassian.net/browse/FS-3667
  test.skip.each([
    ['01-multi.tsx'], // Warning: Prop `id` did not match. Server: "react-select-2-input" Client: "react-select-3-input"
    ['02-async-options-loading.tsx'], //  Warning: Prop `id` did not match. Server: "react-select-2-input" Client: "react-select-3-input"
    ['03-single-compact.tsx'], // Warning: Prop `id` did not match. Server: "react-select-2-input" Client: "react-select-3-input"
    ['04-single-subtle.tsx'], // Warning: Prop `id` did not match. Server: "react-select-2-input" Client: "react-select-3-input"
    ['05-single-subtle-and-compact.tsx'], // Warning: Prop `id` did not match. Server: "react-select-2-input" Client: "react-select-3-input"
    ['06-multi-with-default-values.tsx'], // Warning: Prop `className` did not match. Server: "sc-ckVGcZ kGBTUE" Client: "sc-iAyFgw fHzyvb"
    ['07-multi-with-fixed-values.tsx'], // Warning: Prop `className` did not match. Server: "sc-ckVGcZ kGBTUE" Client: "sc-iAyFgw fHzyvb"
    ['08-single-disabled.tsx'],
    ['09-watchers.tsx'], // Warning: Prop `className` did not match. Server: "sc-VigVT eTidvx" Client: "sc-chPdSV bugEci"
    ['11-creatable.tsx'], // Warning: Prop `id` did not match. Server: "react-select-2-input" Client: "react-select-3-input"
    ['10-in-a-table-cell.tsx'], // depends on document (DOM)
  ])('ssr("%s")', async (fileName: string) => {
    await ssr_hydrate(__dirname, `${ExamplesPath}/${fileName}`);

    // tslint:disable-next-line:no-console
    expect(console.error).not.toBeCalled();
  });
});
