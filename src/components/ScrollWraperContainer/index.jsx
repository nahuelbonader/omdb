import React, { useRef } from "react";
import Movie from "../MovieCard";
import { BsArrowUp } from "react-icons/bs";
import style from "./style.module.scss";

const ScrollWraper = ({ children, onScroll }) => {
  const btn = useRef(null);

  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  const scrollBtn = () => {
    const topLimit = 100;

    document.body.scrollTop > topLimit ||
    document.documentElement.scrollTop > topLimit
      ? (btn.current.className = style.button)
      : (btn.current.className = style.hide);
  };

  window.onscroll = () => {
    scrollBtn();
    onScroll && onScroll();
  };

  const TopButton = () => (
    <button onClick={topFunction} id="topBtn" className={style.hide} ref={btn}>
      <BsArrowUp className={style.icon} id="topBtn" />
    </button>
  );

  return (
    <React.Fragment>
      {children}
      <TopButton />
    </React.Fragment>
  );
};

export default ScrollWraper;
