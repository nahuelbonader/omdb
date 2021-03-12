import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

export default () => (
  <Link className={style.container} to="/">
    <img src={`/logo.png`} alt="image" className={style.logo} />
  </Link>
);
