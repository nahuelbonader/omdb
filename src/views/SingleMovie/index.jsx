import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { OMDB } from "../../store/constants";
import checkFavMovie from "../../customFunctions/checkFavMovie";
import Loader from "../../components/Loader";
import View from "./view";

const fetchMovie = (idMovie) =>
  axios
    .get(`${OMDB}&i=${idMovie}&plot=full`)
    .then((res) => res.data)
    .catch((err) => err);

const SingleMovie = ({ match }) => {
  const { idMovie } = match.params;
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  const { favourites } = useSelector((state) => state.moviesReducer);
  const isFav = checkFavMovie(movie.imdbID, favourites);

  useEffect(() => {
    fetchMovie(idMovie)
      .then((movie) => {
        setMovie(movie);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return <>{loading ? <Loader /> : <View movie={movie} isFav={isFav} />}</>;
};

export default SingleMovie;
