import classes from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store/auth";
import useInput from "../hooks/use-input";
import { useEffect, useState } from "react";
import { uiActions } from "../store/ui-slice";
import Articles from "../components/articles/Articles";
import { Fragment } from "react";

const Auth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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
    let response = await fetch("http://34.245.213.76:3000/auth/signin", {
      method: "POST",
      body: JSON.stringify({
        username: 'candidate',
        password: 'P@ssw0rd',
      }),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    });
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "pending!",
        message: " sending your data!",
      })
    );
    const json = await response.json();
    let resp = { error: false, message: json };
  try{
    if(resp.error== false){
      if(resp.message.error == 'Unauthorized'){
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: " user Unauthorized!",
          })
        );
        setloading(false)
        setDisabled(false)
      }
      else{
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "success!",
            message: " user loggedIn successfuly!",
          })
        );
      setloading(false);
      setShowDashboard(true);
      console.log(response);
      console.log(resp.message);
      console.log(resp.message.accessToken);
      dispatch(authActions.AccessToken(resp.message.accessToken));
      dispatch(authActions.isloggedin(true));
      }
    }
    else{
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: " user Unauthorized!",
        })
      );
      setloading(false)
      setDisabled(false)
    }
    if (!response.ok) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: " user Unauthorized!",
        })
      );
      throw new Error("Sending user data failed.");
    }
} catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending user data failed!",
        })
      );
    }
  };

  const usernameInputClasses = usernameInputHasError
    ? classes.invalid
    : classes.control;

  const passwrdInputClasses = passwordInputHasError
    ? classes.invalid
    : classes.control;

  return (
    <Fragment>
      {!loading && !showDashboard && (
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
      )}
      {loading && (
        <main className={classes.auth}>
          <p className={classes.loading}>loading...</p>
        </main>
      )}

      {!loading && showDashboard && <Articles></Articles>}
    </Fragment>
  );
};

export default Auth;
