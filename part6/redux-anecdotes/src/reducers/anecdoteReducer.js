import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      const anecdoteObject = asObject(action.payload);
      state.push(anecdoteObject);
    },
    voteAnecdote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload);
      anecdote.votes += 1;
    },
  },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
