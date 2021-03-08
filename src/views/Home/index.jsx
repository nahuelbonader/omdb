import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePrevious from "../../hooks/usePrevious";
import { fetchMovies } from "../../store/actions/movies";
import ScrollWraperContainer from "../../components/ScrollWraperContainer";
import Movie from "../../components/MovieCard";
import style from "./style.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.moviesReducer);
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
      "avengers",
      "bottom",
      "light",
      "black",
      "guitar",
    ];
    const random = words[Math.floor(Math.random() * words.length)];
    const newSearch = prevPage == page;
    dispatch(fetchMovies(random, page, newSearch));
  }, [page]);

  const addPage = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight > scrollHeight - 100) {
      console.log("cambio de pagina");
      setPage(page + 1);
    }
  };

  return (
    <ScrollWraperContainer onScroll={addPage}>
      <div className={style.container}>
        {movies &&
          movies.map((movie) => {
            return <Movie key={movie.imdbID} movie={movie} />;
          })}
      </div>
    </ScrollWraperContainer>
  );
};

export default Home;
