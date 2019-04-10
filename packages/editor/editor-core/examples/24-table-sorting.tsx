import { default as FullPageExample } from './5-full-page';
import * as adf from '../example-helpers/table-sorting-adf.json';

export default function Example() {
  return FullPageExample({ defaultValue: adf });
}
