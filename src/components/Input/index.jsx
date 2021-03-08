import React from "react";
import { BsX } from "react-icons/bs";
import style from "./style.module.scss";

export default ({ placeholder, handleChange, value, cleanValue, styles }) => (
  <div className={style.container} style={styles}>
    <input placeholder={placeholder} onChange={handleChange} value={value} />
    <BsX onClick={cleanValue} className={style.cross} />
  </div>
);
