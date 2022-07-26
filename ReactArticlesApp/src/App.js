import { Fragment } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Layout/Header";
import Notification from "./components/Layout/Notification";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login";

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Header></Header>
      {!isAuth && <Login></Login>}
      {isAuth && <Dashboard></Dashboard>}
    </Fragment>
  );
}

export default App;
