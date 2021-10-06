import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import MobileNavbar from '../components/UI/MobileNavbar/MobileNavbar';
import Navbar from '../components/UI/Navbar/Navbar';
import Home from './Home/Home';
import Search from './Search/Search';

const Main = (props) => {
  const { isLogedIn } = props;

  const currentWindowWidth = useMediaQuery();
  const navbar =
    currentWindowWidth < 768 ? (
      <MobileNavbar isLogedIn={isLogedIn} />
    ) : (
      <Navbar isLogedIn={isLogedIn} />
    );

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
        <Route>
          <Redirect to="/home" />
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
