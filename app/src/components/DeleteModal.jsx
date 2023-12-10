import React from "react";
import styles from "../styles/deleteModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, isDeleted } from "../features/commentSlice";

function DeleteModal({ commentId }) {
  const { display, data } = useSelector((store) => store.comments);
  const dispatch = useDispatch();

  return (
    <>
      <div style={{ display: `${display}` }}>
        <div className={styles.overlay}></div>
        <div className={styles.wrapper}>
          <h1>Delete comment</h1>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className={styles.btns}>
            <button onClick={() => dispatch(deleteComment("none"))}>
              NO,CANCEL
            </button>
            <button onClick={() => dispatch(isDeleted(commentId))}>
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
