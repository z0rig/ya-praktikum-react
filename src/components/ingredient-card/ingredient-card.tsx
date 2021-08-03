import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import Price from '../price/price';

import styles from './ingredient-card.module.css';
import { useDrag } from 'react-dnd';

import { TIngredient } from '../../types';

const IngredientCard = ( { ingredient }: {ingredient: TIngredient} ) => {
  const location = useLocation();

  const { name, price, image, _id } = ingredient;
  const [, dragRef] = useDrag( {
    type: 'ingredients',
    item: ingredient
  } );

  return (
    <Link to={ {
      pathname: `/ingredients/${ _id }`,
      state: { from: location.pathname, ingredientLocation: location }
    } }>
      <article ref={ dragRef } className={ styles.card }>
        <picture className='mb-2'>
          <img src={ image } alt={ name } />
        </picture>
        <Price>{ price }</Price>
        <h4 className='text_type_main-default text mt-1'>{ name }</h4>
      </article>
    </Link>
  );
};

export default IngredientCard;
