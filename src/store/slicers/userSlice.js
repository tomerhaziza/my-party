import { createSlice } from '@reduxjs/toolkit';

// User initial state
const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserAuth(state, action) {
      state.user = action.payload;
    },
  },

  // Reducers for async actions
  extraReducers: {},
});

// Export actions under reducers
export const { updateUserAuth } = userSlice.actions;
export default userSlice.reducer;
