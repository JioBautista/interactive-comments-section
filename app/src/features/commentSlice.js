import { createSlice, nanoid } from "@reduxjs/toolkit";
import data from "../data/data.json";

const initialState = {
  data: data,
};

console.log(data.comments);
export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment(state, action) {
      const currentUser = data.currentUser;
      state.data.comments.push({
        id: nanoid(),
        content: action.payload,
        createdAt: "Just Now",
        replies: [],
        score: 0,
        user: currentUser,
      });
    },
  },
});

export const { addComment } = commentSlice.actions;

export default commentSlice.reducer;
