import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/actions/users";
import { resetFavMovies } from "../../store/actions/movies";
import {
  setSearchMovies,
  setSearchUsers,
  setSearchFavourites,
} from "../../store/actions/searches";
import { BsList, BsPeopleCircle } from "react-icons/bs";
import Input from "../Input";
import Logo from "../Logo/index";
import style from "./style.module.scss";

const HeaderContainer = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.usersReducer);
  const { moviesSearch, favouritesSearch, usersSearch } = useSelector(
    (state) => state.searchesReducer
  );

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
    handleResponsive();
  };

  const selectInput = (pathname) => {
    switch (pathname) {
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

  const handleResponsive = () => {
    const x = document.getElementById("btnsNavbar");
    console.log(x);

    x.className = x.className === style.btns ? style.responsive : style.btns;
  };

  useEffect(() => {
    const closeResponsive = () => {
      const x = document.getElementById("btnsNavbar");
      x.className = style.btns;
    };

    const content = document.getElementById("content");

    content.addEventListener("click", closeResponsive);
  }, []);

  return (
    <div className={style.container}>
      <BsList className={style.navBar_toggle} onClick={handleResponsive} />
      <Logo />
      {selectInput(pathname)}

      <Link to={user._id ? "/user" : "/login"} className={style.user_icon}>
        <BsPeopleCircle className={style.icon} />
      </Link>

      {user._id ? (
        <div className={style.user_name}>{user.firstName}</div>
      ) : null}

      <div className={style.btns} id="btnsNavbar">
        {user._id ? (
          <Link className={style.btn} to="/movies" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link className={style.btn} to="/login">
            Login
          </Link>
        )}

        <Link className={style.btn} to={`/`}>
          Home
        </Link>

        <Link className={style.btn} to={`/users`}>
          Users
        </Link>

        <Link className={style.btn} to={user._id ? `/favourites` : "/login"}>
          Favs
        </Link>
      </div>
    </div>
  );
};

export default HeaderContainer;
