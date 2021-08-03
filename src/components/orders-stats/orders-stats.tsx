import React from 'react';

import styles from './orders-stats.module.css';

interface IOrdersStats {
  done: Array<number>,
  inWork: Array<number>,
  total: number,
  totalToday: number;
}

const OrdersStats = ( { done, inWork, total, totalToday }: IOrdersStats ) => {
  return (
    <table className={ styles.table }>
      <caption className='visually-hidden'>Статистика заказов</caption>
      <thead>
        <tr>
          <th className={ styles.th }>Готовы:</th>
          <th className={ styles.th }>В работе:</th>
        </tr>
      </thead>
      <tbody>
        { renderTbodyRows( done, inWork ) }
      </tbody>
      <tfoot>
        <tr>
          <th className={ styles.th } colSpan={ 2 }>Выполнено за все время:</th>
        </tr>
        <tr>
          <td className={ styles.td_large } colSpan={ 2 }>{ total }</td>
        </tr>
        <tr>
          <th className={ styles.th } colSpan={ 2 }>Выполнено за сегодня:</th>
        </tr>
        <tr>
          <td className={ styles.td_large } colSpan={ 2 }>{ totalToday }</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default OrdersStats;

const renderTbodyRows = ( done:Array<number>, inWork:Array<number> ) => {
  const tbodyRows = [];
  const arrForCycle = ( done.length > inWork.length ) ? done : inWork;

  if ( arrForCycle.length >= 10 ) {
    for ( let index = 0; index < arrForCycle.length; index += 2 ) {
      if ( index >= 20 ) {
        break;
      }

      const completeItem = done[index] || '';
      const inWorkItem = inWork[ index ] || '';

      const completeItemNext = done[index + 1] || '';
      const inWorkItemNext = inWork[index + 1] || '';

      tbodyRows.push(
        <tr key={ index }>
          <td
            className={ `${ styles.td } ${ styles.quarter } ${ styles.done }` }
          >
            { completeItem }
          </td>
          <td
            className={ `${ styles.td } ${ styles.quarter } ${ styles.done }` }
          >
            { completeItemNext }
          </td>
          <td
            className={ `${ styles.td } ${ styles.quarter }` }>
            { inWorkItem }
          </td>
          <td
            className={ `${ styles.td } ${ styles.quarter }` }>
            { inWorkItemNext }
          </td>
        </tr>
      );
    }

    return tbodyRows;
  }

  for ( let index = 0; index < arrForCycle.length; index++ ) {
    if ( index >= 20 ) {
      break;
    }

    const completeItem = done[index] || '';
    const inWorkItem = inWork[index] || '';

    tbodyRows.push(
      <tr key={ index }>
        <td
          className={ `${ styles.td } ${ styles.done }` }>
          { completeItem }
        </td>
        <td
          className={ `${ styles.td } ${ styles.done }` }>
          { inWorkItem }
        </td>
      </tr>
    );
  }

  return tbodyRows;
};
