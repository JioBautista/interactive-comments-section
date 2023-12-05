import React from "react";
import styles from "../styles/comments.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { replyToAReply } from "../features/commentSlice";

function Replies({ data, commentId }) {
  const [id, setId] = React.useState("");
  const dispatch = useDispatch();
  const [textValue, setTextvalue] = React.useState();

  const handleChange = (e) => {
    setTextvalue(e.target.value);
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
                <p>{item.createdAt}</p>
              </div>

              <div className={styles.content}>
                <p>
                  <span>@{item.replyingTo}</span> {item.content}
                </p>
              </div>

              <div className={styles.btn}>
                <img src="public/images/icon-plus.svg" />
                <h4>{item.score}</h4>
                <img src="public/images/icon-minus.svg" />
              </div>

              <div className={styles.replyBtn}>
                <img src="public/images/icon-reply.svg" />
                <p onClick={() => setId(item.id)}>Reply</p>
              </div>
            </div>
            {id === item.id && (
              <div className={styles.replyTo}>
                <textarea onChange={handleChange} />
                <button
                  onClick={() =>
                    dispatch(
                      replyToAReply({
                        content: textValue,
                        id: commentId,
                        id2: item.id,
                      })
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
