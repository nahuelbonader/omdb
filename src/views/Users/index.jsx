import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/actions/users";
import Movie from "./partials/Movie";
import style from "./style.module.scss";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

// https://github.com/gajus/react-css-modules#allowmultiple

const UsersContainer = () => {
  const dispatch = useDispatch();

  const { users, user } = useSelector((state) => state.usersReducer);
  const { usersSearch } = useSelector((state) => state.searchesReducer);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().match(usersSearch.toLowerCase())
  );

  return (
    <div className={style.container}>
      {filteredUsers &&
        filteredUsers.map(
          (u) =>
            u._id !== user._id && (
              <div className={style.userContainer}>
                <div className={style.dataContainer}>
                  <div className={style.icon}>{u.firstName.charAt(0)}</div>
                  <div className={style.data}>
                    <h1 className={style.name}>
                      {u.firstName} {u.lastName}
                    </h1>
                    <h2 className={style.favourites}>
                      Favourites films: {u.movies.length}{" "}
                    </h2>
                  </div>
                </div>
                {u.movies.length > 0 && (
                  <div className={style.movies}>
                    <BsArrowBarLeft className={style.arrow} />
                    {u.movies.map((movie) => (
                      <Movie movie={movie} key={movie._id} />
                    ))}
                    <BsArrowBarRight className={style.arrow} />
                  </div>
                )}
              </div>
            )
        )}
    </div>
  );
};

export default UsersContainer;
