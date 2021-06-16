import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { postOrder } from '../../store/slices/order-details';

import Spinner from '../spinner/spinner';
import Error from '../error/error';

import styles from './order-details.module.css';

const OrderDetails = ( { ingredientsIds } ) => {
  const dispatch = useDispatch();

  useEffect( () => {
    dispatch( postOrder( ingredientsIds ) );
  }, [dispatch, ingredientsIds] );

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

OrderDetails.propTypes = {
  ingredientsIds: PropTypes.arrayOf( PropTypes.string )
};
