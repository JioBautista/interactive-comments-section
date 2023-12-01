import React from "react";
import Comments from "./Comments";
import AddComment from "./AddComment";
import "../index.css";

function Content() {
  return (
    <div className="wrapper">
      <Comments />
      <AddComment />
    </div>
  );
}

export default Content;
