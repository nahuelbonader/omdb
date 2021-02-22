import React from "react";
import { Link } from "react-router-dom";

export default ({ movies, addFavMovie, deleteFavMovie, path, user }) => (
  <div className="moviesContainer">
    {movies
      ? movies.map((movie) => (
          <div key={movie.imdbID} className="movie">
            <div className="image">
              <Link to={`/movies/${movie.imdbID}`}>
                <img src={movie.Poster} alt="poster" />
              </Link>
              {path === "/favourites" ? (
                <button
                  className="btn_movies"
                  onClick={() => deleteFavMovie(movie)}
                >
                  Delete
                </button>
              ) : user && user._id ? (
                <button
                  className="btn_movies"
                  onClick={() => addFavMovie(movie)}
                >
                  AddToFav
                </button>
              ) : null}
            </div>
            <div className="data">
              <h1 className="title">{movie.Title}</h1>
              <h2 className="year">{movie.Year}</h2>
            </div>
          </div>
        ))
      : null}
  </div>
);
