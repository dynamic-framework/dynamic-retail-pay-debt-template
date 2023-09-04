import { combineReducers, configureStore } from '@reduxjs/toolkit';

import widgetReducer from '../src/store/slice';

const rootReducer = combineReducers({
  widget: widgetReducer,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default (preloadedState = undefined) => configureStore({
  reducer: rootReducer,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  preloadedState,
});
