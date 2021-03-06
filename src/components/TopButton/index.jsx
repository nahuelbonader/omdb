import React from "react";
import style from "./style.module.scss";
import { BsArrowUp } from "react-icons/bs";

const topFunction = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

export default () => (
  <button
    onClick={topFunction}
    id="topBtn"
    title="Go to top"
    className={style.button}
  >
    <BsArrowUp className={style.icon} onClick={topFunction} id="topBtn" />
  </button>
);
