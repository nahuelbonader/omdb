import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { logoutUser } from "../../store/actions/users";
import { resetFavMovies } from "../../store/actions/movies";
import {
  setSearchMovies,
  setSearchUsers,
  setSearchFavourites,
} from "../../store/actions/searches";

const HeaderContainer = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { moviesSearch, favouritesSearch, usersSearch } = useSelector(
    (state) => state.searchesReducer
  );
  const { path } = props;

  const handleChangeMaker = (setterFn) => {
    return (e) => {
      const { value } = e.target;
      dispatch(setterFn(value));
    };
  };

  const cleanerMaker = (setterFn) => {
    return () => {
      dispatch(setterFn(""));
    };
  };

  const logout = () => {
    dispatch(resetFavMovies());
    dispatch(logoutUser());
  };

  const selectInput = (path) => {
    switch (path) {
      case "/favourites":
        return (
          <Input
            placeholder="Find your favourite movie"
            handleChange={handleChangeMaker(setSearchFavourites)}
            value={favouritesSearch}
            cleanValue={cleanerMaker(setSearchFavourites)}
          />
        );
      case "/movies":
        return (
          <Input
            placeholder="What movie do you want?"
            handleChange={handleChangeMaker(setSearchMovies)}
            value={moviesSearch}
            cleanValue={cleanerMaker(setSearchMovies)}
          />
        );
      case "/users":
        return (
          <Input
            placeholder="Who are you looking for?"
            handleChange={handleChangeMaker(setSearchUsers)}
            value={usersSearch}
            cleanValue={cleanerMaker(setSearchUsers)}
          />
        );
    }
  };

  return (
    <div className="headerContainer">
      <div className="top">
        <Link className="logo" to="/">
          <div className="logo">OMDB</div>
        </Link>

        {selectInput(path)}

        {user._id ? (
          <div>
            <div className="btn">{user.firstName}</div>
            <Link className="btn" to="/movies">
              <div onClick={logout}>Logout</div>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <div className="btn">Login</div>
          </Link>
        )}
      </div>

      <div className="btns">
        <Link className="btn" to={`/users`}>
          <div>Users</div>
        </Link>

        <Link className="btn" to={user._id ? `/favourites` : "/login"}>
          <div>Favs</div>
        </Link>
      </div>
    </div>
  );
};

export default HeaderContainer;
