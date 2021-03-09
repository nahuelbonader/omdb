import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { createUser } from "../../store/actions/users";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import style from "./style.module.scss";

function Register() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

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
    <div className={style.container}>
      <div className={style.subcontainer}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.nameContainer}>
            <input
              type="text"
              placeholder="first name"
              value={firstName.value}
              onChange={dataFirstName.onChange}
              className={style.name}
            />

            <input
              type="text"
              placeholder="last name"
              value={lastName.value}
              onChange={dataLastName.onChange}
              className={style.name}
            />
          </div>

          <div className={style.dataContainer}>
            <input
              type="email"
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
            Sign in
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
          <span> Already have an account? </span>
          <Link to="/login" className={style.link}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
