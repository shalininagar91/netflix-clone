import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  },
  reducers: {
    addMovie: (state, action) => {
      const { payload } = action;
      state[payload.type] = payload.movies;
    },
  },
});

export const { addMovie } = moviesSlice.actions;

export default moviesSlice.reducer;
