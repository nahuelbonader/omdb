import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/actions/users";
import { addFavMovie } from "../store/actions/movies";
import Users from "../components/Users";

const UsersContainer = () => {
  const dispatch = useDispatch();

  const { users, user } = useSelector((state) => state.usersReducer);
  const { search } = useSelector((state) => state.searchesReducer);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().match(search.toLowerCase())
  );

  return (
    <Users
      users={filteredUsers}
      userState={user}
      addFavMovie={(movie) => dispatch(addFavMovie(movie))}
    />
  );
};

export default UsersContainer;
