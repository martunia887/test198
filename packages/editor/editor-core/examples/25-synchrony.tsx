import { default as FullPageExample } from './5-full-page';
import { exampleDocument } from '../example-helpers/example-document';
import { createCollabEditProvider } from '@atlaskit/synchrony-test-helpers';
import { EditorProps } from 'src/types/editor-props';

export const SynchronyExample = (props: EditorProps) => {
  const collabProvider = createCollabEditProvider();
  return FullPageExample({
    ...props,
    collabEditProvider: collabProvider,
  });
};

const Example = () =>
  SynchronyExample({
    defaultValue: exampleDocument,
  });

export default Example;
