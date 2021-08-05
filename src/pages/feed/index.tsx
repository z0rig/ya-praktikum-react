import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '../../hooks';

import wsActions from '../../store/ws-actions/index';

import ScrolledContainer from '../../components/scrolled-container/scrolled-container';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersStats from '../../components/orders-stats/orders-stats';
import Spinner from '../../components/spinner/spinner';
import Error from '../../components/error/error';

import styles from './feed.module.css';

const FeedPage = () => {
  const dispatch = useDispatch();
  const {
    orders,
    total,
    totalToday,
    wsConnected,
    error,
  } = useSelector( ( state ) => state.allOrdersFeed );

  useEffect( () => {
    dispatch( wsActions.common.wsConnectionInit( 'allOrders' ) );

    return () => {
      dispatch( wsActions.common.wsConnectionClose() );
    };
  }, [ dispatch ] );

  const groupedByType = useMemo( () => {
    const groups: {[k: string]: Array<number>} = {
      done: [],
      inWork: []
    };

    orders.forEach( ( order ) => {
      const { status } = order;
      groups[status].push( order.number );
    } );

    return groups;
  }, [ orders ] );

  return (
    <>
      { !wsConnected && !error && <Spinner/> }
      { error && <Error error={ { message: 'Соединение прервано' } } /> }
      { wsConnected && !error && total && (
        <>
          <h1 className={ styles.title }>Лента заказов</h1>
          <div className={ styles.flex }>
            <div className={ styles.column }>
              <ScrolledContainer maxHeight='70vh'>
                <OrdersFeed ordersData={ orders }/>
              </ScrolledContainer>
            </div>
            <div className={ `${ styles.column } ${ styles['table-wrapper'] }` }>
              <OrdersStats
                done={ groupedByType.done }
                inWork={ groupedByType.inWork }
                total={ total }
                totalToday={ totalToday }
              />
            </div>
          </div>
        </>
      ) }
    </>
  );
};

export default FeedPage;
