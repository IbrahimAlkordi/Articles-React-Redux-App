import { Fragment } from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import { useSelector } from "react-redux";
import Notification from "./components/Notification";
import Articles from "./components/articles/Articles";

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
      {!isAuth && <Auth></Auth>}
      {isAuth && <Articles></Articles>}
    </Fragment>
  );
}

export default App;
