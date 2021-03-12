import axios from "axios";
import {
  RESET_MOVIES,
  ADD_MOVIES,
  SET_FAVOURITE_MOVIES,
  RESET_FAVS,
  OMDB,
} from "../constants";

const filterMovies = (movies) => {
  const filteredMovies = [];
  movies &&
    movies.forEach((m) => {
      if (!filteredMovies.filter((movie) => m.imdbID == movie.imdbID).length)
        filteredMovies.push(m);
    });
  return filteredMovies;
};

const resetMovies = (payload) => ({ type: RESET_MOVIES, payload });

const addMovies = (payload) => ({ type: ADD_MOVIES, payload });

const setFavMovies = (payload) => ({ type: SET_FAVOURITE_MOVIES, payload });

const resetFavMovies = () => ({ type: RESET_FAVS });

const fetchMovies = (search, page) => (dispatch) =>
  axios
    .get(`${OMDB}&s=${search}&page=${page}`)
    .then((res) => res.data.Search) // Chequear si es posible utilizar el resto de info
    .then((movies) => {
      const filteredMovies = filterMovies(movies);
      dispatch(addMovies(filteredMovies));
    })
    .catch((err) => console.log(err));

const fetchUserMovies = () => (dispatch) =>
  axios
    .get(`/api/users/user/movies`)
    .then((res) => res.data)
    .then((movies) => dispatch(setFavMovies(movies)));

const addFavMovie = (movie) => (dispatch) =>
  axios
    .post(`/api/users/user/movies`, movie)
    .then((res) => res.data)
    .then((movies) => dispatch(setFavMovies(movies)));

const deleteFavMovie = (movie) => (dispatch) =>
  axios
    .delete("/api/users/user/movies", { data: movie })
    .then((res) => res.data)
    .then((movies) => dispatch(setFavMovies(movies)));

export {
  fetchMovies,
  resetMovies,
  deleteFavMovie,
  addFavMovie,
  fetchUserMovies,
  resetFavMovies,
};
