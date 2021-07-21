import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';

import ScrolledContainer from '../scrolled-container/scrolled-container';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import Price from '../price/price';

import styles from './order-info.module.css';

const statuses = {
  done: 'Выполнен',
};

const OrderInfo = ( ) => {
  const { id } = useParams();
  const { orders } = useSelector( ( state ) => state.allOrdersFeed );
  const allBurgerIngredients = useSelector( ( state ) => state.burgerIngredients.items );

  const order = orders.find( ( order ) => order._id === id );
  const { number ,name, createdAt, status, ingredients } = order;

  const ingredientsData = useMemo( () => {
    return allBurgerIngredients.filter( ( ingredient ) => ingredients.includes( ingredient._id ) );
  }, [ allBurgerIngredients, ingredients ] );

  const price = useMemo( () => {
    return ingredientsData.reduce( ( acc, current ) => acc + current.price, 0 );
  }, [ ingredientsData ] );

  return (
    <article className={ styles.card }>
      <header className={ styles.header }>
        <p className={ styles.id }>#{ number }</p>
        <h1 className={ styles.title }>{ name }</h1>
        <p className={ styles.status }>{ statuses[status] }</p>
      </header>
      <h2 className={ styles['structure-title'] }>Состав:</h2>
      <ScrolledContainer maxHeight='314px'>
        <ul className={ styles.list }>
          {
            ingredientsData.map( ( ingredient ) => {
              return (
                <li className={ styles.item }>
                  <article className={ styles.ingredient }>
                    <IngredientPreview ingredient={ ingredient } />
                    <h3 className={ styles['ingredient-name'] }>{ ingredient.name }</h3>
                    <Price>{ 2 } x { ingredient.price }</Price>
                  </article>
                </li>
              );
            } )
          }
        </ul>
      </ScrolledContainer>
      <footer className={ styles.footer }>
        <p className={ styles['time-wrapper'] }>
          <time dateTime={ createdAt } className={ styles.time }>Вчера, 13:50 i-GMT+3</time>
        </p>
        <Price>{ price }</Price>
      </footer>
    </article>
 );
};

export default OrderInfo;
