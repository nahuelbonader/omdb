import {
  SET_SEARCH_MOVIES,
  SET_SEARCH_FAVOURITES,
  SET_SEARCH_USERS,
} from "../constants";

const initialSearchState = {
  moviesSearch: "",
  favouritesSearch: "",
  usersSearch: "",
};

export default (state = initialSearchState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH_MOVIES:
      return { ...state, moviesSearch: payload };
    case SET_SEARCH_FAVOURITES:
      return { ...state, favouritesSearch: payload };
    case SET_SEARCH_USERS:
      return { ...state, usersSearch: payload };
    default:
      return state;
  }
};
