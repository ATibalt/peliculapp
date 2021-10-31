/* eslint-disable react/prop-types */
import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { children, path, isLogedIn } = props;

  return (
    <Route path={path}>
      {isLogedIn ? { ...children } : <Redirect to="/login" />}
    </Route>
  );
};

export default ProtectedRoute;
