import {
  SET_SEARCH_MOVIES,
  SET_SEARCH_FAVOURITES,
  SET_SEARCH_USERS,
} from "../constants";

const setSearchMovies = (payload) => ({ type: SET_SEARCH_MOVIES, payload });

const setSearchFavourites = (payload) => ({
  type: SET_SEARCH_FAVOURITES,
  payload,
});

const setSearchUsers = (payload) => ({ type: SET_SEARCH_USERS, payload });

export { setSearchMovies, setSearchFavourites, setSearchUsers };
