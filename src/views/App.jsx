import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "../components/Main";
import { fetchUser } from "../store/actions/users";
import { fetchUserMovies } from "../store/actions/movies";
import "../assets/stylesheets/app.scss";

class App extends Component {
  componentDidMount() {
    if (!this.props.user._id) {
      this.props.fetchUser();
      this.props.fetchUserMovies(this.props.user._id);
    }
  }

  render() {
    const path = this.props.location.pathname;
    return <Main path={path} />;
  }
}

const mapStateToProps = (state) => ({
  user: state.usersReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  fetchUserMovies: () => dispatch(fetchUserMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
