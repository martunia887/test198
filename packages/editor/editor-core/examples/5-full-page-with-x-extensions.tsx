import { default as FullPageExample } from './5-full-page';
import { getXProductExtensionProvider } from '../example-helpers/fake-x-product-extensions';

const script = document.createElement('script');
script.id = 'dropboxjs';
script.type = 'text/javascript';
script.src = 'https://www.dropbox.com/static/api/2/dropins.js';
script.dataset.appKey = 'm2kv7uo1541pq3w';
document.head.appendChild(script);

export default function Example() {
  return FullPageExample({
    extensionProviders: [getXProductExtensionProvider()],
  });
}
