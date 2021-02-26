import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";

export default () => (
  <Link className={style.logo} to="/">
    OMDb
  </Link>
);
