import React from "react";
import { Link } from "react-router-dom";

export default ({ users, userState, addFavMovie }) => (
  <div className="users">
    {users &&
      users.map((user) =>
        user._id === userState._id ? null : (
          <div className="userContainer">
            <div key={user._id} className="movie">
              <img src="/user.png" className="image" />
              <div className="data">
                <h1 className="title">
                  {user.firstName} {user.lastName}
                </h1>
                <h2 className="year">Films: {user.movies.length} </h2>
              </div>
            </div>

            {user.movies.map((movie) => (
              <div key={movie.imdbID} className="movie">
                <div className="image">
                  <Link to={`/movies/${movie.imdbID}`}>
                    <img src={movie.Poster} alt="poster" />
                  </Link>
                  {userState && userState._id ? (
                    <button
                      className="btn_movies"
                      onClick={() => addFavMovie(movie)}
                    >
                      AddToFav
                    </button>
                  ) : null}
                </div>
                <div className="data">
                  <h1 className="title">{movie.Title}</h1>
                  <h2 className="year">{movie.Year}</h2>
                </div>
              </div>
            ))}
          </div>
        )
      )}
  </div>
);
