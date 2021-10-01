import React, { useCallback, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/Login/Login';
import { logout, setUserData } from './store/slices/Login/authSlice';

import './App.css';

function App() {
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
  const authDispatch = useDispatch();
  const history = useHistory();

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
      <Switch>
        <Route path="/login">
          {isLogedIn ? <Redirect to="/" /> : <Login isLogin />}
        </Route>
        <Route path="/sign-up">
          {isLogedIn ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/">
          {isLogedIn ? (
            <>
              <h1>Welcome</h1>
              <button type="button" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
