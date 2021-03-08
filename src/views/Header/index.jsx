import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/actions/users";
import { resetFavMovies } from "../../store/actions/movies";
import {
  setSearchMovies,
  setSearchUsers,
  setSearchFavourites,
} from "../../store/actions/searches";
import { BsList, BsPeopleCircle, BsPersonPlusFill } from "react-icons/bs";
import { IoEnterOutline } from "react-icons/io5";
import Input from "../../components/Input";
import Logo from "../../components/Logo/index";
import style from "./style.module.scss";

const HeaderContainer = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.usersReducer);
  const hasUser = Object.keys(user).length > 0;
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
    history.push("/movies");
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
      default:
        return <Input styles={{ visibility: "hidden" }} />;
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

      {hasUser ? (
        <div className={style.dropdown}>
          <div className={style.iconContainer}>
            <BsPeopleCircle className={style.icon} />
          </div>
          <div class={style.dropdown_content}>
            <div className={style.user_name}>{user.firstName}</div>
            <Link to="/perfil" className={style.dropdown_item}>
              Perfil
            </Link>
            <Link className={style.dropdown_item} to="/movies" onClick={logout}>
              Logout
            </Link>
          </div>
        </div>
      ) : (
        <>
          <IoEnterOutline
            onClick={() => history.push("/login")}
            className={style.login_icon}
          />
          <Link className={style.login_btn} to="/login">
            Login
          </Link>
        </>
      )}

      <div className={style.btns} id="btnsNavbar">
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
