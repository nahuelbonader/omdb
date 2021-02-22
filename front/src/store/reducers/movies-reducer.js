import {
  RECEIVE_MOVIES,
  SET_MOVIE,
  FAVOURITE_MOVIES,
  RESET_FAVS,
} from "../constants";

const initialMoviesState = {
  movies: [],
  favourites: [],
  movie: {},
};

export default (state = initialMoviesState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_MOVIES:
      newState.movies = action.movies;
      break;
    case SET_MOVIE:
      newState.movie = action.movie;
      break;
    case FAVOURITE_MOVIES:
      newState.favourites = [...action.movies];
      break;
    case RESET_FAVS:
      newState.favourites = [];
      break;
    default:
      return state;
  }
  return newState;
};
