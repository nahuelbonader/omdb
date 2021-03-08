import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/actions/users";
import { fetchUserMovies } from "../../store/actions/movies";
import Favourites from "../../views/Favourites";
import Layout from "../../components/Layout";
import Login from "../../views/Login";
import Home from "../../views/Home";
import Register from "../../views/Register";
import SingleMovie from "../../views/SingleMovie";
import Users from "../../views/Users";
import "./app.scss";

const App = () => {
  const { user } = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user._id) {
      dispatch(fetchUser());
      dispatch(fetchUserMovies(user._id));
    }
  }, []);

  return (
    <React.Fragment>
      <Layout>
        <Switch>
          <Route exact path="/movies" component={Home} />
          <Route path="/movies/:idMovie" component={SingleMovie} />
          <Route path="/favourites" component={Favourites} />
          <Route path="/users" component={Users} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Redirect from="/" to="/movies" />
        </Switch>
      </Layout>
    </React.Fragment>
  );
};

export default App;
