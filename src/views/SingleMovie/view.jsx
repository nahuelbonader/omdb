import React from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import s from "./style.module.scss";
const filmLogo = "./film.png";

export default ({ movie }) => (
  <>
    {movie && (
      <>
        <div className={s.container}>
          {console.log(movie)}
          <div className={s.titleBar}>
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
            {movie.Poster !== "N/A" && <>
            <img src={movie.Poster} />
            {/* <button className={s.btn_fav}>
    {/* onClick={() => (isFav ? deleteMovie(movie) : addMovie(movie))}
    {isFav ? <BsStarFill /> : <BsStar />}
  </button> */}
            </>}
            <div className={s.plot}>{movie.Plot}</div>
          </div>
        </div>

        <div className={s.information}>
          <h4>Information</h4>
          <p>
            <span className={s.key}>Director: </span>
            <span>{movie.Director}</span>
          </p>

          <p>
            <span className={s.key}>Writers: </span>
            <span> {movie.Writer}</span>
          </p>

          <p>
            <span className={s.key}> Actors: </span>
            <span>{movie.Actors}</span>
          </p>

          <p>
            <span className={s.key}>Language: </span>
            <span>{movie.Language}</span>
          </p>

          <p>
            <span className={s.key}>Country: </span>
            <span>{movie.Country}</span>
          </p>

          <p>
            <span className={s.key}>Awards: </span>
            <span>{movie.Awards}</span>
          </p>

          <p>
            <span className={s.key}>Production: </span>
            <span>{movie.Production}</span>
          </p>
        </div>

        {movie.Ratings && (
          <div className={s.information}>
            <h4>Other Ratings</h4>
            {movie.Ratings.map((raiting) => (
              <p key={raiting.Source}>
                <span className={s.key}>{raiting.Source}: </span>
                <span>{raiting.Value}</span>
              </p>
            ))}
          </div>
        )}
      </>
    )}
  </>
);
