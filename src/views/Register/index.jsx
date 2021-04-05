import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useInput from "../../hooks/useInput";
import { createUser } from "../../store/actions/users";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import style from "./style.module.scss";

function Register() {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [errorResponse, setErrorResponse] = useState(false);

  const emailValidator = (email) => email.includes("@") && email.includes(".");
  const passwordValidator = (password) => password.length >= 8;
  const nameValidator = (name) => name.length > 0;

  const { firstName, ...dataFirstName } = useInput(
    "firstName",
    nameValidator,
    "Please enter your name"
  );
  const { lastName, ...dataLastName } = useInput(
    "lastName",
    nameValidator,
    "Please enter your last name"
  );
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
    })
      .then(() => history.push("/login"))
      .catch((err) => {
        setErrorResponse(err.message);
        setTimeout(() => setErrorResponse(false), 4000);
      });
  };

  useEffect(() => {
    if (
      !firstName.value ||
      !lastName.value ||
      !email.value ||
      !password.value
    ) {
      setDisabledBtn(true);
    } else setDisabledBtn(false);
  }, [firstName.value, lastName.value, email.value, password.value]);

  return (
    <div className={style.container}>
      <div className={style.subcontainer}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.dataContainer}>
            <div className={style.nameContainer}>
              <input
                type="text"
                placeholder="first name"
                value={firstName.value}
                {...dataFirstName}
                className={style.name}
              />

              <input
                type="text"
                placeholder="last name"
                value={lastName.value}
                {...dataLastName}
                className={style.name}
              />
            </div>

            {firstName.error && lastName.error ? (
              <p className={style.error}>{"Please enter your full name"}</p>
            ) : (
              <>
                {firstName.error && (
                  <p className={style.error}>{firstName.error}</p>
                )}
                {lastName.error && (
                  <p className={style.error}>{lastName.error}</p>
                )}
              </>
            )}
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
            {errorResponse && <p className={style.error}>{errorResponse}</p>}
          </div>

          <div
            onClick={() => setShowPassword(!showPassword)}
            className={style.iconContainer}
          >
            {showPassword ? (
              <BsEye className={style.icon} />
            ) : (
              <BsEyeSlash className={style.icon} />
            )}
          </div>

          <button className={style.btn} type="submit" disabled={disabledBtn}>
            Sign in
          </button>
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
