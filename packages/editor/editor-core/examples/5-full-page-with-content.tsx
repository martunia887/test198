import { exampleDocument } from '../example-helpers/example-document';
import { default as FullPageExample } from './5-full-page';

export default function Example() {
  return FullPageExample({ defaultValue: exampleDocument });
}
