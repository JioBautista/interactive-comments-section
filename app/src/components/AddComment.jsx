import React from "react";
import styles from "../styles/addComment.module.scss";
import { addComment } from "../features/commentSlice";
import { useDispatch } from "react-redux";

function AddComment() {
  const [textValue, setTextValue] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTextValue(e.target.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <textarea placeholder="Add a comment..." onChange={handleChange} />

        <div className={styles.send}>
          <img src="public/images/avatars/image-juliusomo.png" />
          <button onClick={() => dispatch(addComment(textValue))}>SEND</button>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
