import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const anecdote = state.find((a) => a.id === action.payload);
      anecdote.votes += 1;
    },
  },
});

const { setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const { createAnecdote, voteAnecdote } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
