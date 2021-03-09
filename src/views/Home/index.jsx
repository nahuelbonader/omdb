import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import { fetchMovies, resetMovies } from "../../store/actions/movies";
import topFunction from "../../components/ScrollWraperContainer/topFunction";
import ScrollWraperContainer from "../../components/ScrollWraperContainer";
import Movie from "../../components/MovieCard";
import style from "./style.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.moviesReducer);
  const { moviesSearch } = useSelector((state) => state.searchesReducer);
  const [page, setPage] = useState(1);
  const prevPage = usePrevious(page);

  useEffect(() => {
    if (moviesSearch) {
      dispatch(resetMovies());
      setPage(2);
      topFunction();
      dispatch(fetchMovies(moviesSearch, 1));
    }
  }, [moviesSearch]);

  useEffect(() => {
    if (moviesSearch && page > 1) dispatch(fetchMovies(moviesSearch, page));
    else {
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
      const random = words[Math.floor(Math.random() * words.length)];
      dispatch(fetchMovies(random, page));
    }
  }, [page]);

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
