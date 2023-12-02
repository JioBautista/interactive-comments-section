import React from "react";
import styles from "../styles/comments.module.scss";

function Replies({ data }) {
  console.log(data);
  return (
    <div>
      <div className={styles.repliesContainer}>
        {data.replies.map((item) => (
          <React.Fragment>
            <div className={styles.wrapper}>
              <div className={styles.user}>
                <img src={item.user.image.png} />
                <h3>{item.user.username}</h3>
                <p>{item.createdAt}</p>
              </div>

              <div className={styles.content}>
                <p><span>@{item.replyingTo}</span> {item.content}</p>
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
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Replies;
