import axios from "axios";
import { SET_USER, REMOVE_USER, SET_USERS } from "../constants";

const setUser = (user) => ({ type: SET_USER, user });

const setUsers = (users) => ({ type: SET_USERS, users });

const removeUser = () => ({ type: REMOVE_USER });

const createUser = (user) =>
  axios
    .post("/api/users", user)
    .then((res) => console.log(res))
    .then((user) => console.log(user))
    .catch(({ response }) => {
      throw new Error(response.data.message);
    });

const fetchUsers = () => (dispatch) =>
  axios
    .get("/api/users")
    .then((res) => res.data)
    .then((users) => {
      console.log(users);
      dispatch(setUsers(users));
    });

const loginUser = (user) => (dispatch) =>
  axios
    .post("/api/auth/login", user)
    .then((res) => res.data)
    .then((user) => {
      dispatch(setUser(user));
      return user;
    })
    .catch(({ response }) => {
      throw new Error(response.data.message);
    });

const fetchUser = () => (dispatch) =>
  axios
    .get("/api/auth/me")
    .then((res) => res.data)
    .then((user) => {
      dispatch(setUser(user));
      return user;
    })
    .catch((err) => {
      throw new Error(err);
    });

const logoutUser = () => (dispatch) =>
  axios.post("/api/auth/logout").then(() => dispatch(removeUser()));

export { createUser, loginUser, logoutUser, fetchUser, fetchUsers };
