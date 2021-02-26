import React from "react";
import { BsX } from "react-icons/bs";
import style from "./style.module.scss";

export default ({ placeholder, handleChange, value, cleanValue }) => (
  <div className={style.container}>
    <input placeholder={placeholder} onChange={handleChange} value={value} />
    <BsX onClick={cleanValue} className={style.cross} />
  </div>
);
