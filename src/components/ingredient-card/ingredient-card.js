import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingridient-card.module.css';
import { useDrag } from 'react-dnd';

const IngredientCard = ( { ingredient } ) => {
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
        <p className={ styles.price }>{ price } <CurrencyIcon type='primary' /></p>
        <h4 className='text_type_main-default text'>{ name }</h4>
      </article>
    </Link>
  );
};

export default IngredientCard;

IngredientCard.propTypes = {
  ingredient: PropTypes.shape( {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    _id: PropTypes.string,
  } )
};
