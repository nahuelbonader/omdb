import React from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import style from "./style.module.scss";

export default ({ placeholder, handleChange, value, cleanValue }) => (
  <div className={style.container}>
    <input placeholder={placeholder} onChange={handleChange} value={value} />
    <BsFillXCircleFill onClick={cleanValue} />
  </div>
);
