import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { loginUser } from "../../store/actions/users";
import { fetchUserMovies } from "../../store/actions/movies";

function LoginContainer() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const emailValidator = (email) => email.includes("@") && email.includes(".");
  const passwordValidator = (password) => password.length >= 8;

  const { email, ...dataEmail } = useInput(
    "email",
    emailValidator,
    "Ingrese un email valido"
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
      .then(() => history.push("/movies"));
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder={"email"} value={email.value} {...dataEmail} />
          {email.error && <p>{email.error}</p>}
        </div>

        <div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={"password"}
            value={password.value}
            {...dataPassword}
          />
          <button onClick={() => setShowPassword(!showPassword)}>
            Show Password
          </button>
          {password.error && <p>{password.error}</p>}
        </div>

        <button className="btn_form" type="submit">
          Login
        </button>
        <Link to="/register">
          <div className="btn_form" type="submit">
            Sign in
          </div>
        </Link>
      </form>
    </div>
  );
}

export default LoginContainer;
