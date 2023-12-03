import { createSlice, nanoid } from "@reduxjs/toolkit";
import data from "../data/data.json";

const initialState = {
  data: data,
  toggle: false,
};

console.log(data);
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
    likeComment(state, action) {
      const id = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      state.data.comments[index].score += 1;
    },
    dislikeComment(state, action) {
      const id = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      state.data.comments[index].score -= 1;
    },
    toggleComment(state, action) {
      const id = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
    },
  },
});

export const { addComment, likeComment, dislikeComment, toggleComment } =
  commentSlice.actions;

export default commentSlice.reducer;
