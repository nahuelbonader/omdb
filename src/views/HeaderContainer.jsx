import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/actions/users";
import { resetFavMovies } from "../store/actions/movies";
import { setSearch } from "../store/actions/searches";
import Header from "../components/Header";

const HeaderContainer = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { search } = useSelector((state) => state.searchesReducer);
  const { path } = props;

  console.log(path)

  // useEffect(() => {
  //   if(path == "/movies")
  //   dispatch(setSearch(""));
  // }, [path]);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setSearch(value));
  };

  const logout = () => {
    dispatch(resetFavMovies());
    dispatch(logoutUser());
  };

  return (
    <Header
      value={search}
      handleChange={handleChange}
      user={user}
      logout={logout}
      path={path}
    />
  );
};

export default HeaderContainer;
