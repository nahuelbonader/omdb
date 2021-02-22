import axios from "axios";
import { API } from "../../api";
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
    .get(`${IMDB}&i=${idMovie}`)
    .then((res) => res.data)
    .then((movie) => dispatch(setMovie(movie)))
    .catch((err) => console.log(err));

const fetchUserMovies = () => (dispatch) =>
  API.get(`/api/users/user/movies`)
    .then((res) => res.data)
    .then((movies) => dispatch(setFavMovies(movies)));

const addFavMovie = (movie) => (dispatch) =>
  API.post(`/api/users/user/movies`, movie)
    .then((res) => res.data)
    .then((movies) => dispatch(setFavMovies(movies)));

const deleteFavMovie = (movie) => (dispatch) =>
  API.delete("/api/users/user/movies", { data: movie })
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
