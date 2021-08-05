import React, { ReactNode } from 'react';
import { useSelector } from '../../hooks';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ( { children, ...rest }: { children: ReactNode; path: string} ) => {
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
