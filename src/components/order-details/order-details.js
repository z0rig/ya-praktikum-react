import React, { useEffect, useMemo } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../store/slices/order-details';

import Spinner from '../spinner/spinner';
import Error from '../error/error';

import styles from './order-details.module.css';

const OrderDetails = () => {
  const { bun, items } = useSelector( state => state.burgerConstructor );
  const dispatch = useDispatch();

  const ingredientsIds = useMemo( () => {
    if ( !bun || !items.length ) {
      return [];
    }

    return [...items.map( ( ingredient ) => ingredient._id ), bun._id];
  }, [bun, items] );

  useEffect( () => {
    dispatch( postOrder( ingredientsIds ) );
    // eslint-disable-next-line
  }, [] );

  const {
    orderDetails,
    loading,
    error } = useSelector( state => state.orderDetails );
  return (
    <>
      { loading && ( <Spinner /> ) }
      { error && ( <Error /> ) }
      {
        orderDetails && !loading ? ( <div className={ styles.details }>
          <p className={ styles.id }>{ orderDetails.order.number }</p>
          <h3 className={ styles.title }>идентификатор заказа</h3>
          <p className={ styles.status }>Ваш заказ начали готовить</p>
          <p className={ styles.note }>Дождитесь готовности на орбитальной станции</p>
        </div> ) : null
      }
    </>
  );
};

export default OrderDetails;
