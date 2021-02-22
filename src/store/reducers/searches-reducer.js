import { SET_SEARCH } from "../constants";

const initialSearchState = { search: "" };

export default (state = initialSearchState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.search };
    default:
      return state;
  }
};
