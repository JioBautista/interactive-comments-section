import React from "react";
import styles from "../styles/deleteModal.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { cancelDelete, isReplyDeleted } from "../features/commentSlice";

function DeleteModal() {
  const { display, commentID, replyID } = useSelector(
    (store) => store.comments
  );
  const dispatch = useDispatch();
  return (
    <>
        <div className={styles.overlay} style={{ display: `${display}` }}></div>
        <div className={styles.wrapper} style={{ display: `${display}` }}>
          <h1>Delete comment</h1>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>
          <div className={styles.btns}>
            <button onClick={() => dispatch(cancelDelete())}>NO,CANCEL</button>
            <button
              onClick={() =>
                dispatch(isReplyDeleted({ id: commentID, id2: replyID }))
              }
            >
              YES, DELETE
            </button>
          </div>
        </div>
    </>
  );
}

export default DeleteModal;
