import { createCollabEditProvider } from '@atlaskit/synchrony-test-helpers';
import { exampleDocument } from '../example-helpers/example-document';
import { default as FullPageExample } from './5-full-page';

export default function Example() {
  const collabProvider = createCollabEditProvider();

  return FullPageExample({
    defaultValue: exampleDocument,
    collabEditProvider: collabProvider,
  });
}
