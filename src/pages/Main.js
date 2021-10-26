import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useMediaQuery from '../hooks/useMediaQuery';
import MobileNavbar from '../components/UI/MobileNavbar/MobileNavbar';
import Navbar from '../components/UI/Navbar/Navbar';
import Home from './Home/Home';
import Search from './Search/Search';
import ContentDescription from './ContentDescription/ContentDescription';
import PersonDescription from './PersonDescription/PersonDescription';
import UserContent from './UserContent/UserContent';
import { logout } from '../store/slices/Login/authSlice';

const Main = (props) => {
  const { isLogedIn } = props;
  const authDispatch = useDispatch();
  const history = useHistory();

  const currentWindowWidth = useMediaQuery();
  const navbar =
    currentWindowWidth < 768 ? (
      <MobileNavbar isLogedIn={isLogedIn} />
    ) : (
      <Navbar isLogedIn={isLogedIn} />
    );

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    authDispatch(logout());
  };

  return (
    <>
      {navbar}
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="/watchlist">
          {isLogedIn ? (
            <UserContent isWatchlist title="Tu Lista" />
          ) : (
            history.push('/login')
          )}
        </Route>
        <Route path="/liked">
          {isLogedIn ? (
            <UserContent isLikes title="Tus Likes" />
          ) : (
            history.push('/login')
          )}
        </Route>
        <Route path="/watched">
          {isLogedIn ? (
            <UserContent isWatched title="Ya has visto" />
          ) : (
            history.push('/login')
          )}
        </Route>
        <Route path="/user">
          {isLogedIn ? (
            <main style={{ padding: '100px' }}>
              <button type="button" onClick={logoutHandler}>
                Logout
              </button>
            </main>
          ) : (
            history.push('/login')
          )}
        </Route>
        <Route path="/person/:id">
          <PersonDescription />
        </Route>
        <Route path="/:type/:id">
          <ContentDescription />
        </Route>
      </Switch>
    </>
  );
};

Main.propTypes = {
  isLogedIn: PropTypes.bool
};

Main.defaultProps = {
  isLogedIn: false
};

export default Main;
