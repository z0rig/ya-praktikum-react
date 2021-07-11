import React from 'react';
import PropTypes from 'prop-types';

import ScrolledContainer from '../scrolled-container/scrolled-container';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import Price from '../price/price';

import styles from './order-info.module.css';

const mockData = {
  id: '034345',
  datetime: new Date( new Date().setDate( new Date().getDate() - 3 ) ),
  name: 'Death Star Starship Main бургер',
  status: 'готовится',
  price: 2230,
  ingredients: [
    {
      name: 'Соус фирменный Space Sauce',
      image: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      price: 3,
      quontity: 5
    },
    {
      name: 'Мясо бессмертных моллюсков Protostomia',
      image: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      price: 215,
      quontity: 1
    },
    {
      name: 'Хрустящие минеральные кольца',
      image: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      price: 2,
      quontity: 999
    },
    {
      name: 'Плоды Фалленианского дерева',
      image: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      price: 22,
      quontity: 3
    },
    {
      name: 'Мясо бессмертных моллюсков Protostomia',
      image: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      price: 22,
      quontity: 3
    },
    {
      name: 'Краторная булка N-200i',
      image: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      price: 22,
      quontity: 3
    },
    {
      name: 'Соус Spicy-X',
      image: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
      price: 22,
      quontity: 3
    }
  ]
};

const OrderInfo = ( { orderData = mockData } ) => {
  const { id, name, datetime, status, price, ingredients } = orderData;

  return (
    <article className={ styles.card }>
      <header className={ styles.header }>
        <p className={ styles.id }>#{ id }</p>
        <h1 className={ styles.title }>{ name }</h1>
        <p className={ styles.status }>{ status }</p>
      </header>
      <h2 className={ styles['structure-title'] }>Состав:</h2>
      <ScrolledContainer maxHeight='314px'>
        <ul className={ styles.list }>
          <li className={ styles.item }>
            <article className={ styles.ingredient }>
              <IngredientPreview ingredient={ ingredients[0] } />
              <h3 className={ styles['ingredient-name'] }>имя ингредиента</h3>
              <Price>{ 2 } x { 20 }</Price>
            </article>
          </li>
          <li className={ styles.item }>
            <article className={ styles.ingredient }>
              <IngredientPreview ingredient={ ingredients[1] } />
              <h3 className={ styles['ingredient-name'] }>имя ингредиента</h3>
              <Price>{ 2 } x { 20 }</Price>
            </article>
          </li>
        </ul>
      </ScrolledContainer>
      <footer className={ styles.footer }>
        <p className={ styles['time-wrapper'] }>
          <time dateTime={ datetime } className={ styles.time }>Вчера, 13:50 i-GMT+3</time>
        </p>
        <Price>{ price }</Price>
      </footer>
    </article>
 );
};

export default OrderInfo;

OrderInfo.propTypes = {
  orderData: PropTypes.shape( {
    id: PropTypes.string,
    name: PropTypes.string,
    datetime: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.arrayOf( PropTypes.shape( {
      name: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
      quontity: PropTypes.number,
    } ) ),
  } ).isRequired
};
