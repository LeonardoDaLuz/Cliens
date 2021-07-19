import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { ClientsState } from './types/clients.types';
import { UserState } from './types/user.types';

declare global {
  interface Window {
    devToolsExtension?: typeof compose;
  }
}

export interface ApplicationState {
  clients: ClientsState;
  user: UserState;
}

const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : (f: any) => f));

export type DispatchType = typeof store.dispatch;

export default store;



