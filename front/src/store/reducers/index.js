import { combineReducers } from "redux";
import moviesReducer from "./movies-reducer";
import usersReducer from "./users-reducer";
import searchesReducer from "./searches-reducer";

export default combineReducers({
  moviesReducer,
  usersReducer,
  searchesReducer,
});
