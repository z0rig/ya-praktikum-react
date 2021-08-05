import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../../hooks';

import OrdersFeed from '../orders-feed/orders-feed';
import ScrolledContainer from '../scrolled-container/scrolled-container';
import Spinner from '../../components/spinner/spinner';
import Error from '../../components/error/error';

import wsActions from '../../store/ws-actions';

const UserOrdersFeed = () => {
  const dispatch = useDispatch();

  const {
    orders,
    wsConnected,
    error,
  } = useSelector( ( state ) => state.userOrdersFeed );

  useEffect( () => {
    dispatch( wsActions.common.wsConnectionInit( 'userOrders' ) );

    return () => {
      dispatch( wsActions.common.wsConnectionClose() );
    };
  }, [ dispatch ] );

  return (
    <>
      { !wsConnected && !error && <Spinner/> }
      { error && <Error error={ { message: 'Соединение прервано' } } /> }
      { wsConnected && !error && (
        <ScrolledContainer maxHeight='70vh'>
          <OrdersFeed ordersData={ orders } />
        </ScrolledContainer>
      ) }
    </>

  );
};

export default UserOrdersFeed;
