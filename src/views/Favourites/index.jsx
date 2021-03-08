import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMovies } from "../../store/actions/movies";
import ScrollWraperContainer from "../../components/ScrollWraperContainer";
import Movie from "../../components/MovieCard";
import style from "./style.module.scss";

const FavouritesContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { favourites } = useSelector((state) => state.moviesReducer);
  const { favouritesSearch } = useSelector((state) => state.searchesReducer);

  useEffect(() => {
    if (!favourites.length && user._id) dispatch(fetchUserMovies(user._id));
  }, []);

  const movies = favourites.filter((movie) =>
    movie.Title.toLowerCase().match(favouritesSearch.toLowerCase())
  );

  return (
    <ScrollWraperContainer>
      <div className={style.container}>
        {movies &&
          movies.map((movie) => {
            return <Movie key={movie.imdbID} movie={movie} />;
          })}
      </div>
    </ScrollWraperContainer>
  );
};

export default FavouritesContainer;
