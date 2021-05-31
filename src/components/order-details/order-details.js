import React from 'react';

import styles from './order-details.module.css';

const OrderDetails = () => {
  return (
    <div className={ styles.details }>
      <p className={ styles.id }>034536</p>
      <h3 className={ styles.title }>идентификатор заказа</h3>
      <p className={ styles.status }>Ваш заказ начали готовить</p>
      <p className={ styles.note }>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails;