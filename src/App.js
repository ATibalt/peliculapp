import React, { useCallback, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import { logout, setUserData } from './store/slices/Login/authSlice';
import useMediaQuery from './hooks/useMediaQuery';

import './App.css';
// import Navbar from './components/UI/Navbar/Navbar';
import MobileNavbar from './components/UI/MobileNavbar/MobileNavbar';
import Navbar from './components/UI/Navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const authDispatch = useDispatch();
  const history = useHistory();

  const currentWindowWidth = useMediaQuery();
  const navbar = currentWindowWidth < 768 ? <MobileNavbar /> : <Navbar />;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    authDispatch(logout());
  }, [authDispatch]);

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
    return history.push('/');
  }, [logoutHandler, authDispatch, history]);

  return (
    <div className="App">
      {isLogedIn && navbar}
      <Switch>
        <Route path="/login">
          {isLogedIn ? <Redirect to="/" /> : <Login isLogin />}
        </Route>
        <Route path="/sign-up">
          {isLogedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/home">
          {isLogedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          {isLogedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
