import React from "react";
import styles from "../styles/comments.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { replyToComment } from "../features/commentSlice";

function ReplyTo({ }) {
  const dispatch = useDispatch();
  const { data } = useSelector((store) => store.comments);
  const [textValue, setTextvalue] = React.useState();

  const handleChange = (e) => {
    setTextvalue(e.target.value);
  };

  return (
    <div className={styles.replyTo}>
      <img src={data.currentUser.image.png} />
      <textarea onChange={handleChange} />
      <button
        onClick={() => dispatch(replyToComment({ content: textValue, id: id }))}
      >
        REPLY
      </button>
    </div>
  );
}

export default ReplyTo;
