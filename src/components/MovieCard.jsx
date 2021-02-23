import React from "react";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsStarFill, BsStar } from "react-icons/bs";

export default ({ movie, handleClick, isFav, user }) => (
  <div key={movie.imdbID} className="movie">
    {document.documentElement.style.setProperty("--isFav", isFav)}
    <div className="image">
      <Link to={`/movies/${movie.imdbID}`}>
        <img src={movie.Poster} alt="poster" />
      </Link>
      {user && user._id ? (
        <button className="btn_movies" onClick={() => handleClick(movie)}>
          <IconContext.Provider value={{ className: "icons" }}>
            {isFav ? <BsStarFill /> : <BsStar />}
          </IconContext.Provider>
        </button>
      ) : null}
    </div>
    <div className="data">
      <h1 className="title">{movie.Title}</h1>
      <h2 className="year">{movie.Year}</h2>
    </div>
  </div>
);
