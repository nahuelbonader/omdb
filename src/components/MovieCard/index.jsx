import React from "react";
import { Link } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs";
import style from "./style.module.scss";

export default ({ movie, handleClick, isFav, user }) => (
  <div key={movie.imdbID} className={style.movie}>
    <div className={style.image}>
      <Link to={`/movies/${movie.imdbID}`}>
        <img src={movie.Poster} alt="poster" />
      </Link>
      {user && user._id ? (
        <button className={style.btn_movies} onClick={() => handleClick(movie)}>
          {isFav ? <BsStarFill /> : <BsStar />}
        </button>
      ) : null}
    </div>
    <div className={style.data}>
      <h1 className={style.title}>{movie.Title}</h1>
      <h2 className={style.year}>{movie.Year}</h2>
    </div>
  </div>
);
