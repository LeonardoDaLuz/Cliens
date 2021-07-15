import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

declare global {
    interface Window {
        devToolsExtension?: typeof compose;
    }
  }

const store = createStore(rootReducer, {} , compose(applyMiddleware(thunk),  window.devToolsExtension ? window.devToolsExtension() : (f: any) => f));

export default store;

