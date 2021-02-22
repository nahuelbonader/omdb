import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MoviesContainer from "../views/MoviesContainer";
import MovieContainer from "../views/MovieContainer";
import FavouritesContainer from "../views/FavouritesContainer";
import HeaderContainer from "../views/HeaderContainer";
import UsersContainer from "../views/UsersContainer";
import Login from "../views/Login";
import Register from "../views/Register";

export default ({ path }) => {
  return (
    <div>
      <HeaderContainer path={path} />
      <div>
        <Switch>
          <Route exact path="/movies" component={MoviesContainer} />
          <Route path="/movies/:idMovie" component={MovieContainer} />
          <Route path="/favourites" component={FavouritesContainer} />
          <Route path="/users" component={UsersContainer} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect to="/movies" />
        </Switch>
      </div>
    </div>
  );
};
