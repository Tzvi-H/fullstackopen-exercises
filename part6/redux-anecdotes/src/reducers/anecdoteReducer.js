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
    replaceAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      return state.map((a) =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote,
      );
    },
  },
});

const { setAnecdotes, createAnecdote, replaceAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const returnedAnecdote = await anecdoteService.replace(updatedAnecdote);
    dispatch(replaceAnecdote(returnedAnecdote));
  };
};

export default anecdoteSlice.reducer;
