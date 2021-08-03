import React, { useMemo } from 'react';
import { useSelector } from '../../hooks';

import IngredientPreview from '../ingredient-preview/ingredient-preview';
import Price from '../price/price';

import getId from '../../utils/getId';
import getNormalizedDateTimeString from '../../utils/getNormalizedDateTimeString';

import styles from './order-card.module.css';

import { ORDER_STATUSES } from '../../utils/constants';

import { TOrderData, TIngredient } from '../../types';

const OrderCard = ( { orderData }: { orderData: TOrderData } ) => {
  const { number, createdAt, name, status, ingredients } = orderData;

  const allBurgerIngredients = useSelector( ( state ) => state.burgerIngredients.items );

  const ingredientsData = useMemo( () => {
    return allBurgerIngredients.filter( ( ingredient ) => ingredients.includes( ingredient._id ) );
  }, [ allBurgerIngredients, ingredients ] );

  const price = useMemo( () => {
    return ingredientsData.reduce( ( acc, current ) => acc + current.price, 0 );
  }, [ ingredientsData ] );

  const statusAddClassName =
    status === 'done' ? 'success' :
    status === 'cancel' ? 'error' :
        '';

  const statusText = ORDER_STATUSES[ status ];

  return (
    <article className={ styles.card }>
      <header className={ styles.header }>
        <span className={ styles.id }>#{ number }</span>
        <time dateTime={ createdAt } className={ styles.time }>{ getNormalizedDateTimeString( createdAt ) }</time>
      </header>
      <h2 className={ styles.title }>{ name }</h2>
      <p className={
        `${ styles.status } ${ statusAddClassName }` }
      >
        { statusText }
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

const renderPreviews = ( ingredients: TIngredient[] ) => {
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
