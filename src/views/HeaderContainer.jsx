import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/users";
import { resetFavMovies } from "../store/actions/movies";
import { setSearch } from "../store/actions/searches";
import Header from "../components/Header";

class HeaderContainer extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.path !== this.props.path) this.props.setSearch("");
  }

  handleChange(e) {
    const value = e.target.value;
    this.props.setSearch(value);
  }

  logout() {
    this.props.resetFavMovies();
    this.props.logoutUser();
  }

  render() {
    const { user, path, search } = this.props;

    return (
      <Header
        value={search}
        handleChange={this.handleChange}
        user={user}
        logout={this.logout}
        path={path}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.usersReducer.user,
  searchMovies: state.searchesReducer.searchMovies,
  searchFavourites: state.searchesReducer.searchFavourites,
  search: state.searchesReducer.search,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  resetFavMovies: () => dispatch(resetFavMovies()),
  setSearch: (search) => dispatch(setSearch(search)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
