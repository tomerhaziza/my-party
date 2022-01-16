// Auto defualt redux dev tools,thunk middleware,development mistakes
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from 'store/slicers/userSlice';
import eventsSlice from 'store/slicers/eventsSlice';

const combinedReducer = combineReducers({
  userSlice,
  eventsSlice,
});

const rootReducer = (state, action) => {
  // After logout request fullfilled, clear app state
  if (action.type === 'user/logout/fulfilled') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
