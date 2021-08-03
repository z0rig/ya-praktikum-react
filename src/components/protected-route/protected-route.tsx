import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ( { children, ...rest } ) => {
  const isLogin = useSelector( ( state ) => state.profile.user.isLogin );

  return (
    <Route
      { ...rest }
      render={ ( { location } ) =>{
       return isLogin ? (
          children
        ) : (
          <Redirect to={ {
            pathname: '/login',
            state: { from: location }
          } } />
        );}
      }
    />
  );
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired
};