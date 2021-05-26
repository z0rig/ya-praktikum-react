import React from 'react';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingridient-card.module.css';

const IngridientCard = ({ name, price, image }) => {
  return (
    <article className={ styles.card }>
      <picture>
        <img src={image} alt={name} className='mb-2'/>
      </picture>
      <p className={ `${styles.price} text_type_digits-default text mb-2` }>{price} <CurrencyIcon type="primary" /></p>
      <h4 className='text_type_main-default text'>{name}</h4>
    </article>
  )
};

export default IngridientCard;
