import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovies, addFavMovie } from "../store/actions/movies";
import Movies from "../components/Movies";

class MoviesContainer extends Component {
  componentDidMount() {
    const words = [
      "car",
      "run",
      "face",
      "red",
      "rich",
      "path",
      "bottom",
      "light",
      "black",
      "guitar",
    ];
    const search = words[Math.floor(Math.random() * words.length)];
    this.props.fetchMovies(search);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.search !== this.props.search)
      this.props.fetchMovies(this.props.search);
  }

  render() {
    const { movies, user, addFavMovie } = this.props;
    const path = this.props.location.pathname;

    return (
      <div>
        <Movies
          movies={movies}
          addFavMovie={addFavMovie}
          user={user}
          path={path}
        />
        ;
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.moviesReducer.movies,
  user: state.usersReducer.user,
  favMovies: state.moviesReducer.favourites,
  search: state.searchesReducer.search,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (search) => dispatch(fetchMovies(search)),
  addFavMovie: (movie) => dispatch(addFavMovie(movie)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
