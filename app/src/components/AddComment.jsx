import React from "react";
import styles from "../styles/addComment.module.scss";

function AddComment() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <textarea placeholder="Add a comment..."/>

        <div className={styles.send}>
          <img src="public/images/avatars/image-juliusomo.png" />
          <button>SEND</button>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
