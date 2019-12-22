import { createStore as createReduxStore, Store, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Conversation, User } from '../model';

import { reducers } from './reducers';

export interface State {
  conversations: Conversation[];
  user?: User;
  highlighted?: string;
}

export interface Action {
  type: string;
  payload?: any;
}

export type Handler = (state: State | undefined) => void;

export default function createStore(
  initialState?: State,
): Store<State | undefined> {
  return createReduxStore(reducers, initialState, applyMiddleware(thunk));
}
