import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, User } from "../types";

const initialState: InitialState = {
  users: [],
  openStory: false,
  currentStoryIndex: 0,
};

const mainSlice = createSlice({
  name: "user_stories",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setOpenStory: (state, action: PayloadAction<boolean>) => {
      state.openStory = action.payload;
    },
    setCurrentActiveStoryIndex: (state, action: PayloadAction<number>) => {
      state.currentStoryIndex = action.payload;
    },
  },
});

export const { setUsers, setOpenStory, setCurrentActiveStoryIndex } =
  mainSlice.actions;

export default mainSlice.reducer;
