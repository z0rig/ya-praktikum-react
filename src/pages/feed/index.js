import React from 'react';

import ScrolledContainer from '../../components/scrolled-container/scrolled-container';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersStats from '../../components/orders-stats/orders-stats';

import styles from './feed.module.css';

const FeedPage = () => {
  return (
    <>
      <h1 className={ styles.title }>Лента заказов</h1>
      <div className={ styles.flex }>
        <div className={ styles.column }>
          <ScrolledContainer maxHeight='100%'>
            <OrdersFeed/>
          </ScrolledContainer>
        </div>
        <div className={ styles.column }>
          <OrdersStats/>
        </div>
      </div>
    </>
  );
};

export default FeedPage;
