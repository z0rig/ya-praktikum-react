import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import OrderCard from '../order-card/order-card';

import styles from './orders-feed.module.css';

const OrdersFeed = ( { ordersData } ) => {
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
              <Link to={ `feed/${ orderData._id }` } className={ styles.link }>
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

OrdersFeed.propTypes = {
  ordersData: PropTypes.arrayOf(
    PropTypes.shape( {
      number: PropTypes.number,
      createdAt: PropTypes.string,
      name: PropTypes.string,
      status: PropTypes.string,
      ingredients: PropTypes.arrayOf( PropTypes.string ),
    } )
  ).isRequired
};
