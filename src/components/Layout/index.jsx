import React from "react";
import Header from "../Header";
import style from "./style.module.scss";

export default ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <div className={style.contents} id="content">
        {children}
      </div>
    </React.Fragment>
  );
};
