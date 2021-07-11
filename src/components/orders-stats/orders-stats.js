import React from 'react';
import PropTypes from 'prop-types';

import styles from './orders-stats.module.css';

const mockData = {
  complete: ['034533', '034532', '034530', '034527', '034525'],
  inWork: ['034538', '034541', '034542'],
  todaycomplete: 123,
  allTimecomplete: 1234
};

const OrdersStats = ( { ordersStat = mockData } ) => {
  const { complete, inWork, todaycomplete, allTimecomplete } = ordersStat;
  return (
    <table className={ styles.table }>
      <caption className={ styles.caption }>Статистика заказов</caption>
      <thead>
        <tr>
          <th className={ styles.th }>Готовы:</th>
          <th className={ styles.th }>В работе:</th>
        </tr>
      </thead>
      <tbody>
        { renderTbodyRows( complete, inWork ) }
      </tbody>
      <tfoot>
        <tr>
          <th className={ styles.th } colSpan='2'>Выполнено за все время:</th>
        </tr>
        <tr>
          <td className={ styles.td_large } colSpan='2'>{ allTimecomplete }</td>
        </tr>
        <tr>
          <th className={ styles.th } colSpan='2'>Выполнено за сегодня:</th>
        </tr>
        <tr>
          <td className={ styles.td_large } colSpan='2'>{ todaycomplete }</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default OrdersStats;

OrdersStats.propTypes = {
  complete: PropTypes.arrayOf( PropTypes.string ).isRequired,
  inWork: PropTypes.arrayOf( PropTypes.string ).isRequired,
  todaycomplete: PropTypes.number.isRequired,
  allTimecomplete: PropTypes.number.isRequired,
};

const renderTbodyRows = ( complete, inWork ) => {
  const tbodyRows = [];
  const arrForCycle = ( complete.length > inWork.length ) ? complete : inWork;

  for ( let index = 0; index < arrForCycle.length; index++ ) {
    const completeItem = complete[index] || '';
    const inWorkItem = inWork[index] || '';

    tbodyRows.push(
      <tr key={ index }>
        <td className={ styles.td }>{ completeItem }</td>
        <td className={ styles.td }>{ inWorkItem }</td>
      </tr>
    );
  }

  return tbodyRows;
};
