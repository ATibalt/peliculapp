import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import MobileNavbar from '../components/UI/MobileNavbar/MobileNavbar';
import Navbar from '../components/UI/Navbar/Navbar';
import Home from './Home/Home';
import Search from './Search/Search';
import ContentDescription from './ContentDescription/ContentDescription';
import PersonDescription from './PersonDescription/PersonDescription';

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
        <Route path="/person/:id">
          <PersonDescription />
        </Route>
        <Route path="/:type/:id">
          <ContentDescription />
        </Route>
        <Route path="/">
          <Home />
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
