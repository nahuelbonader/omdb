import React, { Component } from "react";
import { connect } from "react-redux";
import Movie from "../components/Movie";
import { fetchMovie } from "../store/actions/movies";

class MovieContainer extends Component {
  componentDidMount() {
    this.props.fetchMovie();
  }

  render() {
    return <Movie movie={this.props.movie} />;
  }
}

const mapStateToProps = (state) => ({
  movie: state.moviesReducer.movie,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const idMovie = ownProps.match.params.idMovie;
  return {
    fetchMovie: () => {
      dispatch(fetchMovie(idMovie));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieContainer);
