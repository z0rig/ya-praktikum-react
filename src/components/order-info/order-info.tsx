import React, { useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from '../../hooks';

import ScrolledContainer from '../scrolled-container/scrolled-container';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import Price from '../price/price';

import Spinner from '../spinner/spinner';
import Error from '../error/error';

import { getOrderById } from '../../store/slices/user-order';

import getNormalizedDateTimeString from '../../utils/getNormalizedDateTimeString';

import styles from './order-info.module.css';

import { ORDER_STATUSES } from '../../utils/constants';
import { TIngredient } from '../../types';

const OrderInfo = () => {
  const { id } = useParams<{id: string}>();
  const dispatch = useDispatch();

  const allBurgerIngredients = useSelector( ( state ) => state.burgerIngredients.items );

  const { orderData, loading, error } = useSelector( ( state ) => state.userOrder );

  const order = orderData ? orderData.orders[ 0 ] : null;

  useEffect( () => {
    dispatch( getOrderById( id ) );
  }, [ dispatch, id ] );

  const ingredientsData = useMemo( () => {
    if ( !order ) {
      return;
    }

    const { ingredients } = order;

    const ingredientsData = allBurgerIngredients.filter( ( ingredient ) => ingredients.includes( ingredient._id ) );

    const normalizedData:
      {
        [k: string]: TIngredient & {
          amount: number
        }
      } = {};

    ingredientsData.forEach( ( ingredient ) => {
      normalizedData[ ingredient._id ] = { ...ingredient, amount: 1 };
    } );

    ingredients.forEach( ( ingredientId ) => {
      normalizedData[ ingredientId ].amount += 1;
    } );

    return Object.values( normalizedData );
  }, [ allBurgerIngredients, order ] );

  const price = useMemo( () => {
    if ( !ingredientsData ) {
      return;
    }

    return ingredientsData.reduce( ( acc, current ) => acc + current.price * current.amount, 0 );
  }, [ ingredientsData ] );

  const statusAddClassName =
    order?.status === 'done' ? 'success' :
    order?.status === 'cancel' ? 'error' :
    '';

  return (
    <>
      { loading && <Spinner /> }
      { error && <Error error={ error } /> }
      { !loading && !error && order &&
        (
          <article className={ styles.card }>
            <header className={ styles.header }>
              <p className={ styles.id }>#{ order.number }</p>
              <h1 className={ styles.title }>{ order.name }</h1>
              <p className={ `${ styles.status } ${ statusAddClassName }` }>{ ORDER_STATUSES[ order.status ] }</p>
            </header>
            <h2 className={ styles[ 'structure-title' ] }>Состав:</h2>
            <ScrolledContainer maxHeight='314px'>
              <ul className={ styles.list }>
                {
                  ingredientsData?.map( ( ingredient ) => {
                    return (
                      <li key={ ingredient._id } className={ styles.item }>
                        <article className={ styles.ingredient }>
                          <IngredientPreview ingredient={ ingredient } more={ null } />
                          <h3 className={ styles[ 'ingredient-name' ] }>{ ingredient.name }</h3>
                          <Price>{ ingredient.amount } x { ingredient.price }</Price>
                        </article>
                      </li>
                    );
                  } )
                }
              </ul>
            </ScrolledContainer>
            <footer className={ styles.footer }>
              <p className={ styles[ 'time-wrapper' ] }>
                <time dateTime={ order.createdAt } className={ styles.time }>{ getNormalizedDateTimeString( order.createdAt ) }</time>
              </p>
              <Price>{ price }</Price>
            </footer>
          </article>
        ) }
    </>
 );
};

export default OrderInfo;
