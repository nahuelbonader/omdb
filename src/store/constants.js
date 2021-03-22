const { REACT_APP_OMDB_API_KEY, REACT_APP_OMDB_API } = process.env;

// Movies
export const ADD_MOVIES = "ADD_MOVIES";
export const RESET_MOVIES = "RESET_MOVIES";
export const SET_FAVOURITE_MOVIES = "SET_FAVOURITE_MOVIES";
export const RESET_FAVS = "RESET_FAVS";

// Users
export const SET_USERS = "SET_USERS";
export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

// Searches
export const SET_SEARCH_MOVIES = "SET_SEARCH_MOVIES";
export const SET_SEARCH_FAVOURITES = "SET_SEARCH_FAVOURITES";
export const SET_SEARCH_USERS = "SET_SEARCH_USERS";

// OMDB API
export const OMDB = `${REACT_APP_OMDB_API}?apikey=${REACT_APP_OMDB_API_KEY}`;
