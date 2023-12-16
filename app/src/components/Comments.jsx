import React from "react";
import Replies from "./Replies";
import DeleteModal from "./deleteModal";
import styles from "../styles/comments.module.scss";
import "animate.css"
import { useSelector, useDispatch } from "react-redux";
import {
  likeComment,
  dislikeComment,
  replyToComment,
  deleteComment,
  editCommentButton,
  updateComment,
} from "../features/commentSlice";

function Comments() {
  const { data, editComment, currentComment, commentID } = useSelector(
    (store) => store.comments
  );
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
          <div className={`className=" animate__animated animate__slideInRight animate__faster ${styles.wrapper}`}>
            {/* USER DIV */}
            <div className={styles.user}>
              <img src={item.user.image.png} />
              <h3>{item.user.username}</h3>
              {item.isCurrent && <div className={styles.currentUser}>you</div>}
              <p>{item.createdAt}</p>
            </div>

            {/* CONTENT DIV */}
            <div className={styles.content}>
              {editComment && item.id === commentID ? (
                <>
                  <textarea
                    defaultValue={item.content}
                    onChange={handleChange}
                  ></textarea>
                  <button
                    onClick={() =>
                      dispatch(
                        updateComment({
                          id: item.id,
                          updatedContent: textValue,
                        }),
                        setTextValue('')
                      )
                    }
                  >
                    UPDATE
                  </button>
                </>
              ) : (
                <p>{item.content}</p>
              )}
            </div>

            {/* LIKES AND DISLIKES BUTTON DIV */}
            <div className={styles.btn}>
              <button onClick={() => dispatch(likeComment(item.id))}>
                <img src="public/images/icon-plus.svg" />
              </button>
              <h4>{item.score}</h4>
              <button onClick={() => dispatch(dislikeComment(item.id))}>
                <img src="public/images/icon-minus.svg" />
              </button>
            </div>

            {/* REPLY BUTTON. IF ITS THE CURRENT USER DISPLAY DELETE AND REPLY BUTTONS */}
            <div className={styles.replyBtn}>
              {item.isCurrent ? (
                <>
                  <img src="public/images/icon-delete.svg" />
                  <p
                    onClick={() => dispatch(deleteComment(item.id))}
                    className={styles.replyDelete}
                  >
                    Delete
                  </p>
                  <img src="public/images/icon-edit.svg" />
                  <p onClick={() => dispatch(editCommentButton(item.id))}>
                    Edit
                  </p>
                </>
              ) : (
                <>
                  <img src="public/images/icon-reply.svg" />
                  <p onClick={() => toggle(item.id)}>Reply</p>
                </>
              )}
            </div>
          </div>

          {/* REPLY TEXT AREA */}
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

          {/* REPLIES COMPONENT */}
          <Replies data={item} commentId={item.id} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Comments;
