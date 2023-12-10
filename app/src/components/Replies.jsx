import React from "react";
import styles from "../styles/comments.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  replyToAReply,
  likeReply,
  dislikeReply,
  deleteComment,
  isDeleted,
} from "../features/commentSlice";
import DeleteModal from "./deleteModal";

function Replies({ data, commentId }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [Id, setId] = React.useState("");
  const [textValue, setTextvalue] = React.useState();
  const dispatch = useDispatch();
  const { display } = useSelector((store) => store.comments);
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
              <div className={styles.user}>
                <img src={item.user.image.png} />
                <h3>{item.user.username}</h3>
                {item.isCurrent && (
                  <div className={styles.currentUser}>you</div>
                )}
                <p>{item.createdAt}</p>
              </div>

              <div className={styles.content}>
                <p>
                  <span>@{item.replyingTo}</span> {item.content}
                </p>
              </div>

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

              <div className={styles.replyBtn}>
                {item.isCurrent ? (
                  <>
                    <p onClick={() => dispatch(deleteComment("block"))}>
                      Delete
                    </p>
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
