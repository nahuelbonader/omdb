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

export default (state = initialSearchState, action) => {
  switch (action.type) {
    case SET_SEARCH_MOVIES:
      return { ...state, moviesSearch: action.payload };
    case SET_SEARCH_FAVOURITES:
      return { ...state, favouritesSearch: action.payload };
    case SET_SEARCH_USERS:
      return { ...state, usersSearch: action.payload };
    default:
      return state;
  }
};
