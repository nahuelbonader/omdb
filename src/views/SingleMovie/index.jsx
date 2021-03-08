import React, { useEffect, useState } from "react";
import axios from "axios";
import { IMDB } from "../../store/constants";

const SingleMovie = ({ match }) => {
  const { idMovie } = match.params;
  const [movie, setMovie] = useState({});

  const fetchMovie = (idMovie) =>
    axios
      .get(`${IMDB}&i=${idMovie}&plot=full`)
      .then((res) => res.data)
      .catch((err) => err);

  useEffect(() => {
    fetchMovie(idMovie)
      .then((movie) => {
        console.log("MOVIE2", movie);
        setMovie(movie);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movieContainer">
      {movie ? (
        <>
          <img src={movie.Poster} />
          <div className="info">
            <h4>Title: {movie.Title}</h4>
            <h4>Year: {movie.Year}</h4>
            <h4>Released: {movie.Released}</h4>
            <h4>Runtime: {movie.Runtime}</h4>
            <h4>Genre: {movie.Genre}</h4>
            <h4>Director: {movie.Director}</h4>
            <h4>Writer: {movie.Writer}</h4>
            <h4>Actors: {movie.Actors}</h4>
            <h4>Plot: {movie.Plot}</h4>
            <h4>Language: {movie.Language}</h4>
            <h4>Country: {movie.Country}</h4>
            <h4>Awards: {movie.Awards}</h4>
            <h4>Production: {movie.Production}</h4>
            <h4>imdbRating: {movie.imdbRating}</h4>
            <h4>imdbVotes: {movie.imdbVotes}</h4>
            <h3>Others Ratings:</h3>
            {movie.Ratings
              ? movie.Ratings.map((raiting) => (
                  <h4 key={raiting.Source}>
                    {raiting.Source}: {raiting.Value}
                  </h4>
                ))
              : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SingleMovie;
