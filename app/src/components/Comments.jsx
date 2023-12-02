import React from "react";
import Replies from "./Replies";
import styles from "../styles/comments.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { likeComment, dislikeComment } from "../features/commentSlice";

function Comments() {
  const { data } = useSelector((store) => store.comments);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {data.comments.map((item) => (
        <React.Fragment key={item.id}>
          <div className={styles.wrapper}>
            <div className={styles.user}>
              <img src={item.user.image.png} />
              <h3>{item.user.username}</h3>
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
              <img src="public/images/icon-reply.svg" />
              <p>Reply</p>
            </div>
          </div>
          <Replies data={item} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default Comments;
