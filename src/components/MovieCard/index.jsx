import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavMovie, deleteFavMovie } from "../../store/actions/movies";
import { BsStarFill, BsStar } from "react-icons/bs";
import style from "./style.module.scss";

export default ({ movie }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { favourites } = useSelector((state) => state.moviesReducer);
  const checkFavMovie = (imdbID) => {
    let isFav = false;
    favourites.forEach((favMovie) => {
      if (favMovie.imdbID == imdbID) isFav = true;
    });
    return isFav;
  };
  const addMovie = (movie) => dispatch(addFavMovie(movie));
  const deleteMovie = (movie) => dispatch(deleteFavMovie(movie));
  const isFav = checkFavMovie(movie.imdbID);

  return (
    <div key={movie.imdbID} className={style.movie}>
      <div className={style.image}>
        <Link to={`/movies/${movie.imdbID}`}>
          <img src={movie.Poster} alt="poster" />
        </Link>
        {user && user._id && (
          <button
            className={style.btn_movies}
            onClick={() => (isFav ? deleteMovie(movie) : addMovie(movie))}
          >
            {isFav ? <BsStarFill /> : <BsStar />}
          </button>
        )}
      </div>
      <div className={style.data}>
        <h1 className={style.title}>{movie.Title}</h1>
        <h2 className={style.year}>{movie.Year}</h2>
      </div>
    </div>
  );
};
