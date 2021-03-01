import axios from "axios";
import {
  RECEIVE_MOVIES,
  SET_MOVIE,
  FAVOURITE_MOVIES,
  RESET_FAVS,
  IMDB,
} from "../constants";

const setMovies = (movies) => ({ type: RECEIVE_MOVIES, movies });

const setMovie = (movie) => ({ type: SET_MOVIE, movie });

const setFavMovies = (movies) => ({ type: FAVOURITE_MOVIES, movies });

const resetFavMovies = () => ({ type: RESET_FAVS });

const fetchMovies = (search) => (dispatch) =>
  axios
    .get(`${IMDB}&s=${search}`)
    .then((res) => res.data.Search)
    .then((movies) => dispatch(setMovies(movies)))
    .catch((err) => console.log(err));

const fetchMovie = (idMovie) => (dispatch) =>
  axios
    .get(`${IMDB}&i=${idMovie}&plot=full`)
    .then((res) => res.data)
    .then((movie) => {
      console.log(movie);
      dispatch(setMovie(movie));
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
  fetchMovie,
  deleteFavMovie,
  addFavMovie,
  fetchUserMovies,
  resetFavMovies,
};
