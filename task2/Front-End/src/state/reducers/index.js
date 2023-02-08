import { combineReducers } from 'redux';

import { activePageReducer, productReducer } from './productReducer';

export const combinedReducers = combineReducers({
  product: productReducer,
  activePage:activePageReducer
});

// export type State = ReturnType<typeof combinedReducers>;