import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    setTweets: (state, action) => {
      state.value = action.payload;
    },
    addTweet: (state, action) => {
      state.value.unshift(action.payload);
    },
    updateTweet: (state, action) => {
      const index = state.value.findIndex(
        (tweet) => tweet.id === action.payload.id,
      );
      if (index !== -1) {
        state.value[index] = action.payload;
      }
    },
    deleteTweet: (state, action) => {
      state.value = state.value.filter((tweet) => tweet.id !== action.payload);
    },
  },
});

export const { setTweets, addTweet, updateTweet, deleteTweet } =
  tweetsSlice.actions;
export default tweetsSlice.reducer;
