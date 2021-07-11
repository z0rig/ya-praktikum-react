import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import OrderCard from '../order-card/order-card';

import styles from './orders-feed.module.css';

const mockData = [
  {
    id: '034535',
    datetime: '2021-07-10T12:12:22.908Z',
    name: 'Interstellar бургер',
    status: 'создан',
    price: 144,
    ingredients: [
      {
        name: 'Краторная булка N-200i',
        image: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      },
      {
        name: 'Соус Spicy-X',
        image: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
      },
      {
        name: 'Соус фирменный Space Sauce',
        image: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png'
      },
      {
        name: 'Хрустящие минеральные кольца',
        image: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
      },
      {
        name: 'Плоды Фалленианского дерева',
        image: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
      },
      {
        name: 'Мясо бессмертных моллюсков Protostomia',
        image: 'https://code.s3.yandex.net/react/code/salad-mobile.png'
      },
    ]
  },
  {
    id: '034345',
    datetime: '2021-03-10T12:12:22.908Z',
    name: 'Death Star Starship Main бургер',
    status: 'готовится',
    price: 2230,
    ingredients: [
      {
        name: 'Соус фирменный Space Sauce',
        image: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png'
      },
      {
        name: 'Мясо бессмертных моллюсков Protostomia',
        image: 'https://code.s3.yandex.net/react/code/salad-mobile.png'
      },
      {
        name: 'Хрустящие минеральные кольца',
        image: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
      },
      {
        name: 'Плоды Фалленианского дерева',
        image: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
      },
      {
        name: 'Мясо бессмертных моллюсков Protostomia',
        image: 'https://code.s3.yandex.net/react/code/salad-mobile.png'
      },
      {
        name: 'Краторная булка N-200i',
        image: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      },
      {
        name: 'Соус Spicy-X',
        image: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
      }
    ]
  },
  {
    id: '034533',
    datetime: '2021-06-10T12:12:22.908Z',
    name: 'Black Hole Singularity острый бургер',
    status: 'Выполнен',
    price: 14004,
    ingredients: [
      {
        name: 'Краторная булка N-200i',
        image: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      },
      {
        name: 'Хрустящие минеральные кольца',
        image: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
      },
      {
        name: 'Плоды Фалленианского дерева',
        image: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
      },
       {
        name: 'Соус Spicy-X',
        image: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
      },
      {
        name: 'Соус фирменный Space Sauce',
        image: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png'
      },
      {
        name: 'Мясо бессмертных моллюсков Protostomia',
        image: 'https://code.s3.yandex.net/react/code/salad-mobile.png'
      },
       {
        name: 'Краторная булка N-200i',
        image: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
      },
      {
        name: 'Хрустящие минеральные кольца',
        image: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
      },
      {
        name: 'Плоды Фалленианского дерева',
        image: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
      },
    ]
  },
  {
    id: '034532',
    datetime: '2021-05-10T12:12:22.908Z',
    name: 'Supernova Infinity бургер',
    status: 'Выполнен',
    price: 14,
    ingredients: [
      {
        name: 'Соус Spicy-X',
        image: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png'
      },
      {
        name: 'Хрустящие минеральные кольца',
        image: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png'
      },
      {
        name: 'Плоды Фалленианского дерева',
        image: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
      },
      {
        name: 'Мясо бессмертных моллюсков Protostomia',
        image: 'https://code.s3.yandex.net/react/code/salad-mobile.png'
      },
    ]
  }
];

const OrdersFeed = ( { ordersData = mockData } ) => {
  let { url } = useRouteMatch();
  return (
    <>
      <h1 className='visually-hidden'>История заказов</h1>
      <ul className={ styles.list }>
        {
        ordersData.map( ( orderData ) => (
          <li key={ orderData.id } className={ styles.item }>
            <Link to={ `${ url }/${ orderData.id }` } className={ styles.link }>
              <OrderCard orderData={ orderData } />
            </Link>
          </li>
        ) )
      }
      </ul>
    </>
  );
};

export default OrdersFeed;

OrdersFeed.propTypes = {
  ordersData: PropTypes.arrayOf( PropTypes.shape( {
    id: PropTypes.string,
    datetime: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
    ingredients: PropTypes.shape( {
      name: PropTypes.string,
      image: PropTypes.string
    } ),
  } ) ).isRequired
};
