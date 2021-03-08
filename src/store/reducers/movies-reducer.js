import {
  SET_MOVIES,
  ADD_MOVIES,
  SET_FAVOURITE_MOVIES,
  RESET_FAVS,
} from "../constants";

const initialMoviesState = {
  movies: [],
  favourites: [],
};

export default (state = initialMoviesState, { type, payload }) => {
  const newState = { ...state };
  switch (type) {
    case SET_MOVIES:
      newState.movies = payload;
      break;
    case ADD_MOVIES:
      newState.movies = [...newState.movies, ...payload];
      break;
    case SET_FAVOURITE_MOVIES:
      newState.favourites = payload;
      break;
    case RESET_FAVS:
      newState.favourites = [];
      break;
    default:
      return state;
  }
  return newState;
};
