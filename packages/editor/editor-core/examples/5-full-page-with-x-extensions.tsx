import { getXProductExtensionProvider } from '../example-helpers/fake-x-product-extensions';
import { default as FullPageExample } from './5-full-page';

export default function Example() {
  return FullPageExample({
    extensionProviders: [getXProductExtensionProvider()],
  });
}
