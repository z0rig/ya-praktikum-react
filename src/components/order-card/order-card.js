import React from 'react';
import PropTypes from 'prop-types';

import IngredientPreview from '../ingredient-preview/ingredient-preview';
import Price from '../price/price';

import getId from '../../utils/getId';

import styles from './order-card.module.css';

const OrderCard = ( { orderData } ) => {
  const { id, datetime, name, status, price, ingredients } = orderData;
  return (
    <article className={ styles.card }>
      <header className={ styles.header }>
        <span className={ styles.id }>#{ id }</span>
        <time dateTime={ datetime } className={ styles.time }>Сегодня, 16:20 i-GMT+3</time>
      </header>
      <h2 className={ styles.title }>{ name }</h2>
      <p className={ styles.status }>{ status }</p>
      <div className={ styles.main }>
        <ul className={ styles.ingredients }>
          {
              renderPreviews( ingredients )
            }
        </ul>
        <Price>{ price }</Price>
      </div>
    </article>
  );
};

export default OrderCard;

OrderCard.propTypes = {
  orderData: PropTypes.shape( {
    id: PropTypes.string,
    datetime: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf( PropTypes.object ),
  } ).isRequired
};

const renderPreviews = ( ingredients ) => {
  const previews = [];

  for ( let index = 0; index < ingredients.length; index++ ) {
    const ingredient = ingredients[ index ];
    let more = null;
    if ( index === 5 ) {
      more = ingredients.length - 5;
    }

    const key = getId();
    previews.push(
      <li key={ key } style={ { zIndex: ingredients.length - index } }>
        <IngredientPreview more={ more } ingredient={ ingredient } />
      </li>
    );

    if ( more !== null ) break;
  }

  return previews;
};
