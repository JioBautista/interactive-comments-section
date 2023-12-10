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
  isDeleted,
} from "../features/commentSlice";

function Comments() {
  const { data } = useSelector((store) => store.comments);
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
                  <p onClick={() => dispatch(deleteComment(item.id))}>Delete</p>
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
          <DeleteModal />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Comments;
