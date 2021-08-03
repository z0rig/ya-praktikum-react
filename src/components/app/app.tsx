import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../hooks';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import { TLocationState } from '../../types';

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
  const location = useLocation<TLocationState>();
  const history = useHistory();
  const dispatch = useDispatch();

  const isPoP = history.action === 'POP';
  const ingredientLocation = !isPoP ? location.state?.ingredientLocation : null;
  const orderLocation = !isPoP ? location.state?.orderLocation : null;

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
          <Switch location={ ingredientLocation || orderLocation || location }>
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
            <Route path={ ['/feed/:id', '/profile/orders/:id'] }>
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
          { orderLocation && (
            <Route path={ ['/feed/:id', '/profile/orders/:id'] } >
              <Modal onClose={ closeModal }>
                <OrderInfo/>
              </Modal>
            </Route>
          ) }
        </>
      ) }
    </Layout>
  );
};

export default App;
