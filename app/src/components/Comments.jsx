import React from "react";
import styles from "../styles/comments.module.scss";
import { useSelector } from "react-redux";

function Comments() {
  const { data } = useSelector((store) => store.comments);

  console.log(data.comments);
  return (
    <div className={styles.container}>
      {data.comments.map((item) => (
        <React.Fragment>
          <div className={styles.wrapper}>
            <div className={styles.user}>
              <img src={item.user.image.png} />
              <h3>{item.user.username}</h3>
              <h3>{item.createdAt}</h3>
            </div>

            <div className={styles.content}>
              <p>{item.content}</p>
            </div>

            <div className={styles.btn}>
              <img src="public/images/icon-plus.svg" />
              <span>{item.score}</span>
              <img src="public/images/icon-minus.svg" />
            </div>

            <div className={styles.replyBtn}>
              <img src="public/images/icon-reply.svg" />
              <p>Reply</p>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Comments;
