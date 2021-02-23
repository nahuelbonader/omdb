import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { createUser } from "../store/actions/users";

function Register() {
  const history = useHistory();

  const emailValidator = (email) => email.includes("@") && email.includes(".");
  const passwordValidator = (password) => password.length >= 8;

  const { firstName, ...dataFirstName } = useInput("firstName");
  const { lastName, ...dataLastName } = useInput("lastName");
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
    createUser({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    }).then(() => history.push("/login"));
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="first name"
          value={firstName.value}
          onChange={dataFirstName.onChange}
        />

        <input
          type="text"
          placeholder="last name"
          value={lastName.value}
          onChange={dataLastName.onChange}
        />

        <div>
          <input
            type="email"
            placeholder={"email"}
            value={email.value}
            {...dataEmail}
          />
          {email.error && <p>{email.error}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder={"password"}
            value={password.value}
            {...dataPassword}
          />
          {password.error && <p>{password.error}</p>}
        </div>

        <button className="btn_form" type="submit">
          Sign in
        </button>

        <Link to="/login">
          <div className="btn_form" type="submit">
            Loginga
          </div>
        </Link>
      </form>
    </div>
  );
}

export default Register;
