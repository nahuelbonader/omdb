import React from "react";
import { Link } from "react-router-dom";

export default ({ value, handleChange, path, user, logout }) => (
  <div className="headerContainer">
    <div className="top">
      <Link className="logo" to="/">
        <div>OMDB</div>
      </Link>

      <input
        placeholder={
          path === "/favourites"
            ? "Find your favourite movie"
            : path === "/users"
            ? "Who are you looking for?"
            : "What movie do you want?"
        }
        onChange={handleChange}
        value={value}
      />

      {user._id ? (
        <div>
          <div className="btn">{user.firstName}</div>
          <Link className="btn" to="/movies">
            <div onClick={logout}>Logout</div>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <div className="btn">Login</div>
        </Link>
      )}
    </div>

    <div className="btns">
      <Link className="btn" to={`/users`}>
        <div>Users</div>
      </Link>

      <Link className="btn" to={user._id ? `/favourites` : "/login"}>
        <div>Favs</div>
      </Link>
    </div>
  </div>
);
