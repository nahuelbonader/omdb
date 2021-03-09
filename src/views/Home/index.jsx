import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDidUpdate from "../../hooks/useDidUpdate";
import { fetchMovies, resetMovies } from "../../store/actions/movies";
import topFunction from "../../components/ScrollWraperContainer/topFunction";
import ScrollWraperContainer from "../../components/ScrollWraperContainer";
import Movie from "../../components/MovieCard";
import style from "./style.module.scss";

const words = [
  "car",
  "run",
  "face",
  "paris",
  "rich",
  "avengers",
  "bottom",
  "light",
  "black",
  "guitar",
];

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.moviesReducer);
  const { moviesSearch } = useSelector((state) => state.searchesReducer);
  const [page, setPage] = useState(1);
  const random = words[Math.floor(Math.random() * words.length)];

  useEffect(() => {
    dispatch(resetMovies());
  }, []);

  useEffect(() => {
    moviesSearch
      ? dispatch(fetchMovies(moviesSearch, page))
      : dispatch(fetchMovies(random, page));
  }, [page]);

  useDidUpdate(() => {
    dispatch(resetMovies());
    if (page > 1) {
      topFunction();
      setPage(1);
    } else {
      dispatch(fetchMovies(moviesSearch, page));
    }
  }, [moviesSearch]);

  const addPage = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 100) {
      setPage(page + 1);
    }
  };

  return (
    <ScrollWraperContainer onScroll={addPage}>
      <div className={style.container}>
        {movies &&
          movies.map((movie) => <Movie key={movie.imdbID} movie={movie} />)}
      </div>
    </ScrollWraperContainer>
  );
};

export default Home;
