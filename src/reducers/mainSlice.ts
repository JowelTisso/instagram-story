import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, User } from "../types";

const initialState: InitialState = {
  stories: [],
};

const mainSlice = createSlice({
  name: "stories",
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<User[]>) => {
      state.stories = action.payload;
    },
  },
});

export const { setStories } = mainSlice.actions;

export default mainSlice.reducer;
