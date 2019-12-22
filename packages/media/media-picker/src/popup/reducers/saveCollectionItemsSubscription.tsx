import {
  SAVE_COLLECTION_ITEMS_SUBSCRIPTION,
  SaveCollectionItemsSubscriptionAction,
} from '../actions/saveCollectionItemsSubscription';
import { State } from '../domain';

export default function saveCollectionItemsSubscription(
  state: State,
  action: SaveCollectionItemsSubscriptionAction,
): State {
  if (action.type === SAVE_COLLECTION_ITEMS_SUBSCRIPTION) {
    return { ...state, collectionItemsSubscription: action.subscription };
  } else {
    return state;
  }
}
