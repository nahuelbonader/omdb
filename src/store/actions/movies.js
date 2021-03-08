import axios from "axios";
import {
  SET_MOVIES,
  ADD_MOVIES,
  SET_FAVOURITE_MOVIES,
  RESET_FAVS,
  IMDB,
} from "../constants";

const setMovies = (payload) => ({ type: SET_MOVIES, payload });

const addMovies = (payload) => ({ type: ADD_MOVIES, payload });

const setFavMovies = (payload) => ({ type: SET_FAVOURITE_MOVIES, payload });

const resetFavMovies = () => ({ type: RESET_FAVS });

const fetchMovies = (search, page, newSearch) => (dispatch) => {
  axios
    .get(`${IMDB}&s=${search}&page=${page}`)
    .then((res) => res.data.Search) // Chequear si es posible utilizar el resto de info
    .then((movies) => {
      newSearch ? dispatch(setMovies(movies)) : dispatch(addMovies(movies));
    })
    .catch((err) => console.log(err));
};

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
  deleteFavMovie,
  addFavMovie,
  fetchUserMovies,
  resetFavMovies,
};
