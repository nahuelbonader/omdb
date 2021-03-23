import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavMovie, deleteFavMovie } from "../../store/actions/movies";
import { BsStarFill, BsStar } from "react-icons/bs";
import originStyle from "./style.module.scss";
import checkFavMovie from "../../customFunctions/checkFavMovie";

const filmLogo = "./film.png";

export default ({ movie, externalStyle }) => {
  const style = externalStyle ? externalStyle : originStyle;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { favourites } = useSelector((state) => state.moviesReducer);

  const addMovie = (movie) => dispatch(addFavMovie(movie));
  const deleteMovie = (movie) => dispatch(deleteFavMovie(movie));
  const isFav = checkFavMovie(movie.imdbID, favourites);

  return (
    <div key={movie.imdbID} className={style.movie}>
      <div className={style.image}>
        <Link to={`/movies/${movie.imdbID}`}>
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : filmLogo}
            alt="poster"
          />
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
