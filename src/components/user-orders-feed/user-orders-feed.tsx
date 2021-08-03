import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OrdersFeed from '../orders-feed/orders-feed.js';
import ScrolledContainer from '../scrolled-container/scrolled-container.js';
import Spinner from '../../components/spinner/spinner.js';
import Error from '../../components/error/error.js';

import wsActions from '../../store/ws-actions.js';

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
      { error && <Error /> }
      { wsConnected && !error && (
        <ScrolledContainer maxHeight='70vh'>
          <OrdersFeed ordersData={ orders } />
        </ScrolledContainer>
      ) }
    </>

  );
};

export default UserOrdersFeed;
