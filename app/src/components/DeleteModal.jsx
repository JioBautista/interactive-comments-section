import React from "react";
import styles from "../styles/deleteModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { isCommentDeleted } from "../features/commentSlice";

function DeleteModal() {
  const { display, commentID } = useSelector((store) => store.comments);
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
            <button>NO,CANCEL</button>
            <button onClick={() => dispatch(isCommentDeleted(commentID))}>
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteModal;
