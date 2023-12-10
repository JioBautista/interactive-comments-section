import React from "react";
import Replies from "./Replies";
import DeleteModal from "./deleteModal";
import styles from "../styles/comments.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  likeComment,
  dislikeComment,
  replyToComment,
  deleteComment,
  isDeleted
} from "../features/commentSlice";

function Comments() {
  const { data , display } = useSelector((store) => store.comments);
  const dispatch = useDispatch();
  const [Id, setId] = React.useState("");
  const [textValue, setTextValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };

  const toggle = (id) => {
    setId(id);
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      {data.comments.map((item) => (
        <React.Fragment key={item.id}>
          <div className={styles.wrapper}>
            <div className={styles.user}>
              <img src={item.user.image.png} />
              <h3>{item.user.username}</h3>
              {item.isCurrent && <div className={styles.currentUser}>you</div>}
              <p>{item.createdAt}</p>
            </div>

            <div className={styles.content}>
              <p>{item.content}</p>
            </div>

            <div className={styles.btn}>
              <button onClick={() => dispatch(likeComment(item.id))}>
                <img src="public/images/icon-plus.svg" />
              </button>
              <h4>{item.score}</h4>
              <button onClick={() => dispatch(dislikeComment(item.id))}>
                <img src="public/images/icon-minus.svg" />
              </button>
            </div>

            <div className={styles.replyBtn}>
              {item.isCurrent ? (
                <>
                  <p onClick={() => dispatch(deleteComment("block"))}>Delete</p>
                  <p>Edit</p>
                </>
              ) : (
                <>
                  <img src="public/images/icon-reply.svg" />
                  <p onClick={() => toggle(item.id)}>Reply</p>
                </>
              )}
            </div>
          </div>
          {item.id === Id && isOpen && (
            <div className={styles.replyTo}>
              <textarea onChange={handleChange} />
              <button
                onClick={() =>
                  dispatch(
                    replyToComment({ content: textValue, id: item.id }),
                    setIsOpen(!isOpen)
                  )
                }
              >
                REPLY
              </button>
            </div>
          )}
          <Replies data={item} commentId={item.id} />
          <div style={{ display: `${display}` }}>
            <div className={styles.overlay}></div>
            <div className={styles.wrapper}>
              <h1>Delete comment</h1>
              <p>
                Are you sure you want to delete this comment? This will remove
                the comment and can't be undone.
              </p>
              <div className={styles.btns}>
                <button onClick={() => dispatch(deleteComment("none"))}>
                  NO,CANCEL
                </button>
                <button onClick={() => dispatch(isDeleted(item.id))}>
                  YES, DELETE
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Comments;
