import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';

var Store = (initialState = {}) => {
  const store = createStore(
    Reducers,
    initialState,
    applyMiddleware(ReduxThunk)
  );
  return store;
};

export {
  Store
};
