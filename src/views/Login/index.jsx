import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { loginUser } from "../../store/actions/users";
import { fetchUserMovies } from "../../store/actions/movies";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import style from "./style.module.scss";

function LoginContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const emailValidator = (email) => email.includes("@") && email.includes(".");
  const passwordValidator = (password) => password.length >= 8;

  const { email, ...dataEmail } = useInput(
    "email",
    emailValidator,
    "Please enter a valid email"
  );
  const { password, ...dataPassword } = useInput(
    "password",
    passwordValidator,
    "Password must contain at least 8 characters"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email: email.value,
        password: password.value,
      })
    )
      .then((user) => dispatch(fetchUserMovies(user._id)))
      .then(() => history.push("/movies"))
      .catch((e) => console.log(e));
  };

  return (
    <div className={style.container}>
      <div className={style.subcontainer}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.dataContainer}> 
            <input
              placeholder={"email"}
              value={email.value}
              {...dataEmail}
              className={style.data}
            />
            {email.error && <p className={style.error}>{email.error}</p>}
          </div>

          <div className={style.dataContainer}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={"password"}
              value={password.value}
              {...dataPassword}
              className={style.data}
            />
            {password.error && <p className={style.error}>{password.error}</p>}
          </div>

          <button className={style.btn} type="submit">
            Login
          </button>

          <div onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <BsEye className={style.icon} />
            ) : (
              <BsEyeSlash className={style.icon} />
            )}
          </div>
        </form>

        <div className={style.invitation}>
          <span> Do you want an account? </span>
          <Link to="/register" className={style.link}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginContainer;
