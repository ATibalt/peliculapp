/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import { logout, setUserData } from './store/slices/Login/authSlice';

import useMediaQuery from './hooks/useMediaQuery';

// Components
import MobileNavbar from './components/UI/MobileNavbar/MobileNavbar';
import Navbar from './components/UI/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Footer from './components/UI/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import UserContent from './pages/UserContent/UserContent';
import PersonDescription from './pages/PersonDescription/PersonDescription';
import ContentDescription from './pages/ContentDescription/ContentDescription';

import './App.css';

function App() {
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const authDispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    authDispatch(logout());
  }, [authDispatch]);

  const currentWindowWidth = useMediaQuery();
  const navbar =
    currentWindowWidth < 768 ? (
      <MobileNavbar isLogedIn={isLogedIn} logout={logoutHandler} />
    ) : (
      <Navbar isLogedIn={isLogedIn} logout={logoutHandler} />
    );

  useEffect(() => {
    const loginToken = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    const tokenHasExpired = new Date(expiryDate) <= new Date();

    if (!loginToken || !expiryDate) {
      return logoutHandler();
    }
    if (tokenHasExpired) {
      return logoutHandler();
    }

    authDispatch(
      setUserData({
        userId: localStorage.getItem('userId'),
        loginToken: localStorage.getItem('token')
      })
    );
    return () => {};
  }, [logoutHandler, authDispatch]);

  return (
    <div className="App">
      {navbar}
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/login">
          {isLogedIn ? <Redirect to="/home" /> : <Login isLogin />}
        </Route>
        <Route exact path="/sign-up">
          {isLogedIn ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/search">
          <Search />
        </Route>
        <ProtectedRoute path="/watchlist" isLogedIn={isLogedIn}>
          <UserContent isWatchlist title="Tu Lista" />
        </ProtectedRoute>
        <ProtectedRoute path="/likes" isLogedIn={isLogedIn}>
          <UserContent isLikes title="Tus Likes" />
        </ProtectedRoute>
        <ProtectedRoute path="/watched" isLogedIn={isLogedIn}>
          <UserContent isWatched title="Ya has visto" />
        </ProtectedRoute>
        <Route path="/person/:id">
          <PersonDescription />
        </Route>
        <Route path="/:type/:id">
          <ContentDescription />
        </Route>
        <ProtectedRoute path="/user" isLogedIn={isLogedIn}>
          <main style={{ padding: '100px' }}>
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          </main>
        </ProtectedRoute>
        <Route path="*">
          <main style={{ padding: '100px' }}>
            <span>404 page not found</span>
          </main>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
