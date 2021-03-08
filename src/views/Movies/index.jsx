import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import {
  fetchMovies,
  addFavMovie,
  deleteFavMovie,
} from "../../store/actions/movies";
import Movie from "../../components/MovieCard";
import TopButton from "../../components/TopButton";
import scrollFunction from "../../components/TopButton/scrollFunction";
import style from "./style.module.scss";

const Movies = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { favourites, movies } = useSelector((state) => state.moviesReducer);
  const { moviesSearch } = useSelector((state) => state.searchesReducer);
  const [page, setPage] = useState(1);
  const prevPage = usePrevious(page);
  const prevMovieSearch = usePrevious(moviesSearch);

  useEffect(() => {
    const newSearch = prevPage == page;
    if (prevMovieSearch !== moviesSearch) setPage(1);
    if (moviesSearch) dispatch(fetchMovies(moviesSearch, page, newSearch));
  }, [moviesSearch, page]);

  useEffect(() => {
    const words = [
      "car",
      "run",
      "face",
      "paris",
      "rich",
      "path",
      "bottom",
      "light",
      "black",
      "guitar",
    ];
    const random = words[Math.floor(Math.random() * words.length)];
    const newSearch = prevPage == page;
    dispatch(fetchMovies(random, page, newSearch));
  }, [page]);

  const addMovie = (movie) => dispatch(addFavMovie(movie));
  const deleteMovie = (movie) => dispatch(deleteFavMovie(movie));
  const checkFavMovie = (imdbID) => {
    let isFav = false;
    favourites.forEach((favMovie) => {
      if (favMovie.imdbID == imdbID) isFav = true;
    });
    return isFav;
  };

  const addPage = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 50) {
      setPage(page + 1);
    }
  };

  window.onscroll = () => {
    addPage();
    scrollFunction();
  };

  return (
    <div className={style.container} id="movies">
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
      <TopButton />
    </div>
  );
};

export default Movies;
