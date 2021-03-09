import React, { useRef } from "react";
import { BsArrowUp } from "react-icons/bs";
import topFunction from "./topFunction";
import style from "./style.module.scss";

const ScrollWraper = ({ children, onScroll }) => {
  const btn = useRef(null);

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
    <button onClick={topFunction} className={style.hide} ref={btn}>
      <BsArrowUp className={style.icon} />
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
