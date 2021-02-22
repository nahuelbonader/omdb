import React from "react";

export default ({ movie }) => (
  <div>
    {movie ? (
      <div className="movieContainer">
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
      </div>
    ) : null}
  </div>
);
