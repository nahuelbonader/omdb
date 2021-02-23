import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Favourites from "../views/Favourites";
import HeaderContainer from "../views/HeaderContainer";
import Login from "../views/Login";
import Movies from "../views/Movies";
import Register from "../views/Register";
import SingleMovie from "../views/SingleMovie";
import UsersContainer from "../views/UsersContainer";

export default ({ path }) => {
  return (
    <div>
      <HeaderContainer path={path} />
      <div>
        <Switch>
          <Route exact path="/movies" component={Movies} />
          <Route path="/movies/:idMovie" component={SingleMovie} />
          <Route path="/favourites" component={Favourites} />
          <Route path="/users" component={UsersContainer} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="/" to="/movies" />
        </Switch>
      </div>
    </div>
  );
};
