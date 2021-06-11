import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner';
import Error from '../error/error';

import { ORDERS_URL } from '../../utils/constants';

import styles from './order-details.module.css';

const OrderDetails = ( { ingredientsIds } ) => {
  const [state, setstate] = useState( {
    isLoading: true,
    hasError: false,
    orderData: null
  } );

  useEffect( () => {
    const fetchOrder = async () => {
      try {
        const res = await fetch( ORDERS_URL, {
          'method': 'POST',
          'headers': {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify( { 'ingredients': ingredientsIds } )
        } );

        if ( res.ok ) {
          const orderData = await res.json();

          setstate( {
            isLoading: false,
            hasError: false,
            orderData
          } );
        } else {
          throw new Error( 'Something went wrong ...' );
        }
      } catch ( error ) {
        setstate( {
          isLoading: false,
          hasError: true,
          orderData: null
        } );
      }

    };

    fetchOrder();
  }, [ingredientsIds] );

  const { orderData, isLoading, hasError } = state;
  return (
    <>
      { isLoading && (<Spinner />) }
      { hasError && (<Error />) }
      {
        orderData ? (<div className={ styles.details }>
          <p className={ styles.id }>{ orderData.order.number }</p>
          <h3 className={ styles.title }>идентификатор заказа</h3>
          <p className={ styles.status }>Ваш заказ начали готовить</p>
          <p className={ styles.note }>Дождитесь готовности на орбитальной станции</p>
        </div>) : null
      }
    </>
  );
};

export default OrderDetails;

OrderDetails.propTypes = {
  ingredientsIds: PropTypes.arrayOf( PropTypes.string )
};