import { createSlice, nanoid } from "@reduxjs/toolkit";
import data from "../data/data.json";

const initialState = {
  data: data,
  replies: data.comments.map((item) => item.replies),
};
console.log(data);
console.log(initialState.replies);
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
    replyToComment(state, action) {
      const { content, id } = action.payload;
      const currentUser = data.currentUser;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      const replyingToUser = state.data.comments[index].user.username;
      const comment = state.data.comments[index];

      comment.replies.push({
        content: content,
        createdAt: "Just Now",
        id: nanoid(),
        replyingTo: replyingToUser,
        score: 0,
        user: currentUser,
      });
    },
    replyToAReply(state, action) {
      const { content, id, id2 } = action.payload;
      const currentUser = data.currentUser;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      const replies = state.data.comments.map((item) => item.replies);
      const replyingToUser = replies[index].find(obj => obj.id === id2);
      
      replies[index].push({
        id: nanoid(),
        content: content,
        createdAt: "Just Now",
        replyingTo: replyingToUser.user.username,
        score: 0,
        user: currentUser,
      });
    },
  },
});

export const {
  addComment,
  likeComment,
  dislikeComment,
  replyToComment,
  replyToAReply,
} = commentSlice.actions;

export default commentSlice.reducer;
