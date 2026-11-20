import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
  restored: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = null;
    },
    restoreUser: (state, action) => {
      state.value = action.payload;
      state.restored = true;
    },
  },
});

export const { login, logout, restoreUser } = userSlice.actions;
export default userSlice.reducer;
