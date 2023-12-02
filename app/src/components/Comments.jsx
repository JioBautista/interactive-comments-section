import React from "react";
import Replies from "./Replies";
import styles from "../styles/comments.module.scss";
import { useSelector } from "react-redux";

function Comments() {
  const { data } = useSelector((store) => store.comments);

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
              <img src="public/images/icon-plus.svg" />
              <h4>{item.score}</h4>
              <img src="public/images/icon-minus.svg" />
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
