import classes from './Header.module.css';
import { useSelector,useDispatch } from "react-redux";
import { authActions } from '../../store/login-slice';
import {uiActions} from '../../store/ui-slice';

const Header = () => {

  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(uiActions.hideNotification());
  }


  const isAuth = useSelector((state) => state.auth.isLoggedIn);
  return (
    <header className={classes.header}>
      <h1>Articles App</h1>
      {isAuth&&(<nav>
        <ul>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>)}
    </header>
  );
};

export default Header;
