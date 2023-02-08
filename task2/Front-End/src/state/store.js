import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import { combinedReducers } from './reducers';

export const store = createStore(
  combinedReducers,
  {},
  applyMiddleware(reduxThunk)
);
