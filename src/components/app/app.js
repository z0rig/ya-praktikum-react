import React, { useEffect, useCallback } from 'react';
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
import OrderInfo from '../order-info/order-info';

import Layout from '../layout/layout';

import Error from '../error/error';
import Spinner from '../spinner/spinner';

import { fetchIngredients } from '../../store/slices/burger-ingredients';

const App = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const isPoP = history.action === 'POP';
  const ingredientLocation = !isPoP ? location.state?.ingredientLocation : null;

  useEffect( () => {
    dispatch( fetchIngredients() );
  }, [dispatch] );

  const closeModal = useCallback( () => {
    history.goBack();
  },[history] );

  const { loading, error, items } = useSelector(
    ( state ) => state.burgerIngredients
  );

  return (
    <Layout>
      { loading && ( <Spinner /> ) }
      { error && ( <Error error={ error } /> ) }
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
            <Route path='/feed' exact={ true }>
              <FeedPage/>
            </Route>
            <Route path='/feed/:id' exact={ true }>
              <OrderInfo/>
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
              <Modal title='Детали ингредиента' onClose={ closeModal }>
                <IngredientDetails/>
              </Modal>
            </Route>
          ) }
        </>
      ) }
    </Layout>
  );
};

export default App;
