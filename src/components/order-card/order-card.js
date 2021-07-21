import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import IngredientPreview from '../ingredient-preview/ingredient-preview';
import Price from '../price/price';

import getId from '../../utils/getId';

import styles from './order-card.module.css';

const statuses = {
  done: 'Выполнен',
};

const OrderCard = ( { orderData } ) => {
  const { number, createdAt, name, status, ingredients } = orderData;

  const allBurgerIngredients = useSelector( ( state ) => state.burgerIngredients.items );

  const ingredientsData = useMemo( () => {
    return allBurgerIngredients.filter( ( ingredient ) => ingredients.includes( ingredient._id ) );
  }, [ allBurgerIngredients, ingredients ] );

  const price = useMemo( () => {
    return ingredientsData.reduce( ( acc, current ) => acc + current.price, 0 );
  }, [ ingredientsData ] );

  return (
    <article className={ styles.card }>
      <header className={ styles.header }>
        <span className={ styles.id }>#{ number }</span>
        <time dateTime={ createdAt } className={ styles.time }>Сегодня, 16:20 i-GMT+3</time>
      </header>
      <h2 className={ styles.title }>{ name }</h2>
      <p className={
        `${ styles.status } ${ status === 'done' ? styles.status_done : '' }` }
      >
        { statuses[ status ] }
      </p>
      <div className={ styles.main }>
        <ul className={ styles.ingredients }>
          {
            renderPreviews( ingredientsData )
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
    number: PropTypes.number,
    createdAt: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    ingredients: PropTypes.arrayOf( PropTypes.string ),
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
