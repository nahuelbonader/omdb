import { SET_USER, REMOVE_USER, SET_USERS } from "../constants";

const initialUsersState = {
  users: [],
  user: {},
};

export default (state = initialUsersState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: {} };
    case SET_USERS:
      return { ...state, users: action.users };
    default:
      return state;
  }
};
