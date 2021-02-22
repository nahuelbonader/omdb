import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteFavMovie, fetchUserMovies } from "../store/actions/movies";
import Movies from "../components/Movies";
import HeaderContainer from "./HeaderContainer";

class FavouritesContainer extends Component {
  componentDidMount() {
    if (!this.props.favMovies.length && this.props.user._id)
      this.props.fetchUserMovies(this.props.user._id);
  }

  render() {
    const { favMovies, deleteFavMovie } = this.props;
    const path = this.props.location.pathname;
    const movies = favMovies.filter((movie) =>
      movie.Title.toLowerCase().match(this.props.search.toLowerCase())
    );

    return (
      <div>
        <Movies
          movies={movies}
          isFav={true}
          deleteFavMovie={deleteFavMovie}
          path={path}
        />
        ;
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.usersReducer.user,
  favMovies: state.moviesReducer.favourites,
  search: state.searchesReducer.search,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFavMovie: (movie) => dispatch(deleteFavMovie(movie)),
  fetchUserMovies: () => dispatch(fetchUserMovies()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouritesContainer);
