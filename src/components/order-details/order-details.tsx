import React, { useEffect, useMemo } from 'react';
import { Redirect } from 'react-router-dom';

import { useSelector, useDispatch } from '../../hooks';
import { postOrder } from '../../store/slices/posted-order-details';

import Spinner from '../spinner/spinner';
import Error from '../error/error';

import styles from './order-details.module.css';

const OrderDetails = () => {
  const { bun, items } = useSelector( ( state ) => state.burgerConstructor );
  const dispatch = useDispatch();

  const ingredientsIds = useMemo( () => {
    if ( !bun || !items.length ) {
      return [];
    }

    return [...items.map( ( ingredient ) => ingredient._id ), bun._id];
  }, [bun, items] );

  const isUserLogin = useSelector( ( state ) => state.profile.user.isLogin );

  const {
    orderDetails,
    loading,
    error
  } = useSelector( ( state ) => state.postedOrderDetails );

  useEffect( () => {
    if( isUserLogin ){
      dispatch( postOrder( ingredientsIds ) );
    }
    // eslint-disable-next-line
  }, [] );

  if ( !isUserLogin ) {
    return <Redirect to='/login'/>;
  }

  return (
    <>
      { loading && ( <Spinner /> ) }
      { error && ( <Error error={ error } /> ) }
      {
        orderDetails && !loading ? (
          <div className={ styles.details }>
            <p className={ styles.id }>{ orderDetails.order.number }</p>
            <h3 className={ styles.title }>идентификатор заказа</h3>
            <p className={ styles.status }>Ваш заказ начали готовить</p>
            <p className={ styles.note }>Дождитесь готовности на орбитальной станции</p>
          </div>
        ) : null
      }
    </>
  );
};

export default OrderDetails;
