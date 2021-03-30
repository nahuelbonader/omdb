import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/actions/users";
import Movie from "./partials/Movie";
import s from "./style.module.scss";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";

const RIGHT = "right";
const LEFT = "left";

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

  const horizontalScroll = (id, direction) => {
    const container = document.getElementById(id);

    switch (direction) {
      case RIGHT:
        container.scrollLeft += 200;
        break;
      case LEFT:
        container.scrollLeft -= 200;
        break;
    }
  };

  return (
    <div className={s.container}>
      {filteredUsers &&
        filteredUsers.map(
          (u) =>
            u._id !== user._id && (
              <div className={s.userContainer} key={u._id}>
                <div className={s.dataContainer}>
                  <div className={s.icon}>{u.firstName.charAt(0)}</div>

                  <div className={s.data}>
                    <h1 className={s.name}>
                      {u.firstName} {u.lastName}
                    </h1>
                    <h2 className={s.favourites}>
                      Favourites films: {u.movies.length}{" "}
                    </h2>
                  </div>
                </div>

                {u.movies.length > 0 && (
                  <div className={s.movies} id={u._id}>
                    {u.movies.map((movie) => (
                      <Movie movie={movie} key={movie._id} />
                    ))}
                    {u.movies.length > 4 && (
                      <div className={s.arrow}>
                        <BsArrowBarLeft
                          className={s.left}
                          onClick={() => horizontalScroll(u._id, LEFT)}
                        />
                        <BsArrowBarRight
                          className={s.right}
                          onClick={() => horizontalScroll(u._id, RIGHT)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
        )}
    </div>
  );
};

export default UsersContainer;
