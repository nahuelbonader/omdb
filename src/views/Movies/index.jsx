import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  addFavMovie,
  deleteFavMovie,
} from "../../store/actions/movies";
import Movie from "../../components/MovieCard";

const Movies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { favourites, movies } = useSelector((state) => state.moviesReducer);
  const { moviesSearch } = useSelector((state) => state.searchesReducer);

  useEffect(() => {
    if (moviesSearch.length) dispatch(fetchMovies(moviesSearch));
  }, [moviesSearch]);

  useEffect(() => {
    const words = [
      "car",
      "run",
      "face",
      "red",
      "rich",
      "path",
      "bottom",
      "light",
      "black",
      "guitar",
    ];
    const random = words[Math.floor(Math.random() * words.length)];
    dispatch(fetchMovies(random));
  }, []);

  const addMovie = (movie) => dispatch(addFavMovie(movie));
  const deleteMovie = (movie) => dispatch(deleteFavMovie(movie));
  const checkFavMovie = (imdbID) => {
    let isFav = false;
    favourites.forEach((favMovie) => {
      if (favMovie.imdbID == imdbID) isFav = true;
    });
    return isFav;
  };

  return (
    <div className="moviesContainer">
      {movies
        ? movies.map((movie) => {
            const isFav = checkFavMovie(movie.imdbID);
            return (
              <Movie
                key={movie.imdbID}
                movie={movie}
                handleClick={isFav ? deleteMovie : addMovie}
                isFav={isFav}
                user={user}
              />
            );
          })
        : null}
    </div>
  );
};

export default Movies;
