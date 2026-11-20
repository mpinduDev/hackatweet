import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    {
      id: 3,
      author: { firstname: 'John', username: 'JohnCena' },
      content: "YOU CAN'T SEE ME ! #cenation",
      createdAt: Date.now() - 10 * 1000,
      likes: ['JohnCena'],
    },
    {
      id: 2,
      author: { firstname: 'Antoine', username: 'AntoineLeProf' },
      content: 'Welcome to #hackatweet guys 😎',
      createdAt: Date.now() - 5 * 60 * 60 * 1000,
      likes: [],
    },
    {
      id: 1,
      author: { firstname: 'Antoine', username: 'AntoineLeProf' },
      content: 'First! #hackatweet #first',
      createdAt: Date.now() - 5 * 60 * 60 * 1000 - 60 * 1000,
      likes: ['AntoineLeProf'],
    },
  ],
};

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    addTweet: (state, action) => {
      state.value.unshift(action.payload);
    },
    toggleLike: (state, action) => {
      const { id, username } = action.payload;
      const tweet = state.value.find((tweet) => tweet.id === id);
      if (!tweet) return;

      if (tweet.likes.includes(username)) {
        tweet.likes = tweet.likes.filter((name) => name !== username);
      } else {
        tweet.likes.push(username);
      }
    },
    deleteTweet: (state, action) => {
      state.value = state.value.filter((tweet) => tweet.id !== action.payload);
    },
  },
});

export const { addTweet, toggleLike, deleteTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
