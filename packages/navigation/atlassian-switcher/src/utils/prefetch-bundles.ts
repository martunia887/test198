import {
  loadAtlassianSwitcher,
  loadJiraSwitcher,
  loadConfluenceSwitcher,
  loadGenericSwitcher,
} from '../components/loaders';
import { Product } from '../types';

export default (product?: string) => {
  loadAtlassianSwitcher();

  if (product === Product.JIRA) {
    return loadJiraSwitcher();
  }

  if (product === Product.CONFLUENCE) {
    return loadConfluenceSwitcher();
  }

  return loadGenericSwitcher();
};
