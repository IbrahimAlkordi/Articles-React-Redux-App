import { useEffect, useState, Fragment } from "react";
import classes from "./Login.module.css";
import useInput from "../hooks/use-input";
import Dashboard from "./Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { post } from "../store/api-actions";
import { authActions } from "../store/login-slice";
import { uiActions } from "../store/ui-slice";

const Login = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [loading, setloading] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const {
    value: enteredUsername,
    // isValid: usernameIsValid,
    hasError: usernameInputHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
  } = useInput((value) => value.trim() === "candidate");

  const {
    value: enteredPassword,
    //isValid: passwordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() === "P@ssw0rd");

  useEffect(() => {
    if (enteredUsername.length === 0 || enteredPassword.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [enteredUsername, enteredPassword]);

  const loginHandler = async (event) => {
    event.preventDefault();
    setloading(true);
    setDisabled(true);
    dispatch(
      authActions.login({
        username: enteredUsername,
        password: enteredPassword,
      })
    );
    dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "pending!",
          message: " sending your data!",
        })
      );
    let resp = await post("http://34.245.213.76:3000/auth/signin", {
      username: enteredUsername,
      password: enteredPassword,
    });

    try {
      
      if (resp.error === false) {
        if (resp.message.error === "Unauthorized") {
          dispatch(
            uiActions.showNotification({
              status: "error",
              title: "Error!",
              message: " user Unauthorized!",
            })
          );
          setloading(false);
          setDisabled(false);
        } else {
          dispatch(
            uiActions.showNotification({
              status: "success",
              title: "success!",
              message: " user loggedIn successfuly!",
            })
          );
          setloading(false);
          setShowDashboard(true);
          console.log(resp);
          console.log(resp.message);
          console.log(resp.message.accessToken);
          dispatch(authActions.AccessToken(resp.message.accessToken));
          dispatch(authActions.isloggedin(true));
        }
      } else {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: " Sending user data failed!",
          })
        );
        setloading(false);
        setDisabled(false);
      }
    } catch (e) {
      console.log(e);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending user data failed!",
        })
      );
      setloading(false);
      setDisabled(false);
    }
  };

  const usernameInputClasses = usernameInputHasError
    ? classes.invalid
    : classes.control;

  const passwrdInputClasses = passwordInputHasError
    ? classes.invalid
    : classes.control;

  const form = (
    <main className={classes.auth}>
      <section>
        <form onSubmit={loginHandler}>
          <div className={usernameInputClasses}>
            <label htmlFor="username">Username</label>
            <input
              onChange={usernameChangeHandler}
              onBlur={usernameBlurHandler}
              type="username"
              id="username"
            />
          </div>
          {usernameInputHasError && (
            <p className={classes["error-text"]}>
              please enter a valid username
            </p>
          )}
          <div className={passwrdInputClasses}>
            <label htmlFor="password">Password</label>
            <input
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              type="password"
              id="password"
            />
            {passwordInputHasError && (
              <p className={classes["error-text"]}>
                please enter a valid password
              </p>
            )}
          </div>
          <div className={classes.control}>
            <button type="submit" disabled={disabled}>
              Login
            </button>
          </div>
        </form>
      </section>
    </main>
  );

  return (
    <Fragment>
      {!loading && !showDashboard && form}
      {loading && (
        <main className={classes.auth}>
          <p className={classes.loading}>loading...</p>
        </main>
      )}

      {!loading && showDashboard && <Dashboard></Dashboard>}
    </Fragment>
  );
};

export default Login;
