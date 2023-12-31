import { createSlice, nanoid } from "@reduxjs/toolkit";
import data from "../data/data.json";

const initialState = {
  data: data,
  display: "none",
  commentID: "",
  replyID: "",
  comments: false,
  replies: false,
  editComment: false,
  editReply: false,
};
console.log(initialState.content);
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
      state.commentID = action.payload;
      state.comments = true;
      state.display = "block";
    },
    deleteReply(state, action) {
      const { id, id2 } = action.payload;
      state.commentID = id;
      state.replyID = id2;
      state.replies = true;
      state.display = "block";
    },
    cancelDelete(state, action) {
      state.display = "none"
    },
    isReplyDeleted(state, action) {
      const { id, id2 } = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);

      if (state.comments === true) {
        state.data.comments = state.data.comments.filter(
          (item) => item.id !== id
        );
      } else if (state.replies === true && id2) {
        state.data.comments[index].replies = state.data.comments[
          index
        ].replies.filter((item) => item.id !== id2);
      }
      state.comments = false;
      state.replies = false;
      state.display = "none";
    },
    editCommentButton(state, action) {
      state.commentID = action.payload;
      state.comments = true;
      state.editComment = !state.editComment;
    },
    editReplyButton(state,action) {
      const {id, id2} = action.payload;
      state.replyID = id2;
      state.replies = true;
      state.editReply = !state.editReply
    },
    updateComment(state, action) {
      const { id, id2, updatedContent } = action.payload;
      const index = state.data.comments.findIndex((obj) => obj.id === id);
      const index2 = state.data.comments[index].replies.findIndex(obj => obj.id === id2)

      if (state.comments === true) {
        state.data.comments[index].content = state.data.comments[
          index
        ].content = updatedContent;
      } else if(state.replies === true && id2) {
        state.data.comments[index].replies[index2].content =
          state.data.comments[index].replies[index2].content = updatedContent;
      }
      state.editComment = false;
      state.editReply = false;
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
  deleteReply,
  cancelDelete,
  isReplyDeleted,
  editCommentButton,
  editReplyButton,
  updateComment,
} = commentSlice.actions;

export default commentSlice.reducer;
