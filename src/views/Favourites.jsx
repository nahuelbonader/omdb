import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavMovie, fetchUserMovies } from "../store/actions/movies";
import Movie from "../components/MovieCard";

const FavouritesContainer = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { favourites } = useSelector((state) => state.moviesReducer);
  const { search } = useSelector((state) => state.searchesReducer);

  useEffect(() => {
    if (!favourites.length && user._id) dispatch(fetchUserMovies(user._id));
  }, []);

  const deleteMovie = (movie) => dispatch(deleteFavMovie(movie));

  const movies = favourites.filter((movie) =>
    movie.Title.toLowerCase().match(search.toLowerCase())
  );

  return (
    <div className="moviesContainer">
      {movies.map((movie) => (
        // <div key={movie._id}>
        <Movie
          key={movie._id}
          movie={movie}
          handleClick={deleteMovie}
          isFav={true}
          user={user}
        />
        // </div>
      ))}
    </div>
  );
};

export default FavouritesContainer;
