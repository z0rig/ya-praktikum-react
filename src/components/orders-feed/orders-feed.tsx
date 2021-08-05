import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import OrderCard from '../order-card/order-card';

import styles from './orders-feed.module.css';
import { TUserOrderData } from '../../types';

const OrdersFeed = ( { ordersData }: {ordersData: Array<TUserOrderData>} ) => {
  const location = useLocation();
  if ( !ordersData.length ) {
    return <p className={ styles.text }>Заказов нет</p>;
  }
  return (
    <>
      <h1 className='visually-hidden'>История заказов</h1>
      <ul className={ styles.list }>
        {
          ordersData.map( ( orderData ) => (
            <li key={ orderData._id } className={ styles.item }>
              <Link to={ {
                pathname: `${ location.pathname }/${ orderData.number }`,
                state: { from: location.pathname, orderLocation: location }
              } } className={ styles.link }>
                <OrderCard orderData={ orderData } />
              </Link>
            </li>
          ) )
        }
      </ul>
    </>
  );
};

export default OrdersFeed;
