import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';

import {
  HomePage,
  LoginPage,
  FeedPage,
  ForgotPasswordPage,
  IngredientPage,
  NotFound404,
  ProfilePage,
  RegistrationPage,
  ResetPasswordPage
} from '../../pages';

import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import AppHeader from '../app-header/app-header';

import Error from '../error/error';
import Spinner from '../spinner/spinner';

import { fetchIngredients } from '../../store/slices/burger-ingredients';

const App = () => {
  const location = useLocation();
  const history = useHistory();

  const isPoP = history.action === 'POP';

  const ingredientLocation = !isPoP ? location.state?.ingredientLocation : null;

  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( fetchIngredients() );
  }, [ dispatch ] );

  const { loading, error, items } = useSelector(
    ( state ) => state.burgerIngredients
  );

  return (
    <>
      <AppHeader />
      <main className='pt-10'>
        { loading && ( <Spinner /> ) }
        { error && ( <Error /> ) }
        { ( !loading && !error && !!items.length ) && (
          <>
            <Switch location={ ingredientLocation || location }>
              <Route path='/' exact={ true } >
                <HomePage/>
              </Route>
              <Route path='/ingredients/:id'>
                <IngredientPage/>
              </Route>
              <Route path='/login'>
                <LoginPage/>
              </Route>
              <Route path='/register'>
                <RegistrationPage/>
              </Route>
              <Route path='/forgot-password'>
                <ForgotPasswordPage/>
              </Route>
              <Route path='/reset-password'>
                <ResetPasswordPage/>
              </Route>
              <Route path='/feed'>
                <FeedPage/>
              </Route>
              <ProtectedRoute path='/profile'>
                <ProfilePage/>
              </ProtectedRoute>
              <Route>
                <NotFound404/>
              </Route>
            </Switch>
            { ingredientLocation && (
              <Route path='/ingredients/:id' >
                <Modal title='Детали ингредиента'>
                  <IngredientDetails/>
                </Modal>
              </Route>
            ) }
          </>
        ) }
      </main>
    </>
  );
};

export default App;
