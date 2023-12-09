import { createSlice, nanoid } from "@reduxjs/toolkit";
import data from "../data/data.json";

const initialState = {
  data: data,
  display: "none",
};

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
        isCurrent: true,
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
        isCurrent: true,
      });
    },
    replyToAReply(state, action) {
      const { content, id, id2 } = action.payload;
      const currentUser = data.currentUser;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      const replies = state.data.comments.map((item) => item.replies);
      const replyingToUser = replies[index].find((obj) => obj.id === id2);

      replies[index].push({
        id: nanoid(),
        content: content,
        createdAt: "Just Now",
        replyingTo: replyingToUser.user.username,
        score: 0,
        user: currentUser,
        isCurrent: true,
      });
      console.log(index);
    },
    likeReply(state, action) {
      const { id, id2 } = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      const index2 = state.data.comments[index].replies.findIndex(
        (obj) => obj.id === id2
      );

      state.data.comments[index].replies[index2].score += 1;
    },
    dislikeReply(state, action) {
      const { id, id2 } = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      const index2 = state.data.comments[index].replies.findIndex(
        (obj) => obj.id === id2
      );

      state.data.comments[index].replies[index2].score -= 1;
    },
    deleteComment(state, action) {
      state.display = action.payload;
    },
    isDeleted(state, action) {
      const { id } = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      if (id === id) {
        state.data.comments.splice(index, 1);
      }

      state.display = "none";
      console.log(id);
    },
  },
});

export const {
  addComment,
  likeComment,
  dislikeComment,
  replyToComment,
  replyToAReply,
  likeReply,
  dislikeReply,
  deleteComment,
  isDeleted,
} = commentSlice.actions;

export default commentSlice.reducer;
