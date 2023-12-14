import React from "react";
import styles from "../styles/comments.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  replyToAReply,
  likeReply,
  dislikeReply,
  deleteReply,
  isReplyDeleted,
} from "../features/commentSlice";

function Replies({ data, commentId }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [Id, setId] = React.useState("");
  const [textValue, setTextvalue] = React.useState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTextvalue(e.target.value);
  };

  const toggle = (id) => {
    setId(id);
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.repliesContainer}>
        {data.replies.map((item) => (
          <React.Fragment key={item.id}>
            <div className={styles.wrapper}>
              {/* USER DIV */}
              <div className={styles.user}>
                <img src={item.user.image.png} />
                <h3>{item.user.username}</h3>
                {item.isCurrent && (
                  <div className={styles.currentUser}>you</div>
                )}
                <p>{item.createdAt}</p>
              </div>

              {/* CONTENT DIV */}
              <div className={styles.content}>
                <p>
                  <span>@{item.replyingTo}</span> {item.content}
                </p>
              </div>

              {/* LIKE AND DISLIKE BUTTONS DIV */}
              <div className={styles.btn}>
                <button
                  onClick={() =>
                    dispatch(likeReply({ id: commentId, id2: item.id }))
                  }
                >
                  <img src="public/images/icon-plus.svg" />
                </button>

                <h4>{item.score}</h4>
                <button
                  onClick={() =>
                    dispatch(dislikeReply({ id: commentId, id2: item.id }))
                  }
                >
                  <img src="public/images/icon-minus.svg" />
                </button>
              </div>

              {/* REPLY BUTTON. IF IT IS CURRENT USER DISPLAY DELETE AND EDIT BUTTONS. */}
              <div className={styles.replyBtn}>
                {item.isCurrent ? (
                  <>
                    <img src="public/images/icon-delete.svg" />
                    <p
                      onClick={() =>
                        dispatch(deleteReply({ id: commentId, id2: item.id }))
                      }
                      className={styles.replyDelete}
                    >
                      Delete
                    </p>
                    <img src="public/images/icon-edit.svg" />
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

            {/* REPLY TEXT AREA DIV */}
            {item.id === Id && isOpen && (
              <div className={styles.replyTo}>
                <textarea onChange={handleChange} />
                <button
                  onClick={() =>
                    dispatch(
                      replyToAReply({
                        content: textValue,
                        id: commentId,
                        id2: item.id,
                      }),
                      setIsOpen(!isOpen)
                    )
                  }
                >
                  REPLY
                </button>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Replies;
