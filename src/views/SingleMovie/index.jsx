import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { OMDB } from "../../store/constants";
import { BsStarFill, BsStar } from "react-icons/bs";
import checkFavMovie from "../../customFunctions/checkFavMovie";
import s from "./style.module.scss";

const fetchMovie = (idMovie) =>
  axios
    .get(`${OMDB}&i=${idMovie}&plot=full`)
    .then((res) => res.data)
    .catch((err) => err);

const filmLogo = "./film.png";

const SingleMovie = ({ match }) => {
  const { idMovie } = match.params;
  const [movie, setMovie] = useState({});
  const { favourites } = useSelector((state) => state.moviesReducer);
  const isFav = checkFavMovie(movie.imdbID, favourites);

  useEffect(() => {
    fetchMovie(idMovie)
      .then((movie) => setMovie(movie))
      .catch((err) => console.error(err));
  }, []);

  console.log("MOVIE", movie);

  return (
    <div className={s.container}>
      {movie && (
        <>
          <div className={s.titleBar}>
            {/* <button className={s.btn_fav}>
              {/* onClick={() => (isFav ? deleteMovie(movie) : addMovie(movie))}
              {isFav ? <BsStarFill /> : <BsStar />}
            </button> */}

            <div className={s.titleContainer}>
              <div className={s.titleSubcontainer}>
                <h4 className={s.title}>{movie.Title}</h4>
                <h4 className={s.year}>({movie.Year})</h4>
              </div>
              <div className={s.ratingContainer}>
                <div>
                  <BsStarFill />
                  {"  "}
                  <span className={s.rate}>{movie.imdbRating}</span>
                  <span>/10</span>
                </div>
                <span>{movie.imdbVotes} votes</span>
              </div>
            </div>

            <div className={s.dataContainer}>
              <span>{movie.Runtime}</span>
              {" | "}
              <span>{movie.Genre}</span>
              {" | "}
              <span>{movie.Released}</span>
            </div>
          </div>

          <div className={s.bodyContainer}>
            <div className={s.imgContainer}>
              <img src={movie.Poster !== "N/A" ? movie.Poster : filmLogo} />
            </div>
            <span className={s.plot}>{movie.Plot}</span>
          </div>

          <div className={s.authors}>
            <span>Director: {movie.Director}</span>
            <span>Writers: {movie.Writer}</span>
            <span>Actors: {movie.Actors}</span>
          </div>

          {/* <div className={s.informationContainer}>
            <span>Language: {movie.Language}</span>
            <span>Country: {movie.Country}</span>
            <span>Awards: {movie.Awards}</span>
            <span>Production: {movie.Production}</span>
          </div>

          {movie.Ratings && (
            <div className={s.externalRatings}>
              <h4>Other Ratings</h4>
              {movie.Ratings.map((raiting) => (
                <>
                  <span key={raiting.Source}>
                    {raiting.Source}: {raiting.Value}
                  </span>
                  <br />
                </>
              ))}
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default SingleMovie;
