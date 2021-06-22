import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setIngredient, resetIngredient } from '../../store/slices/ingredient-details';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import IngredientsDetail from '../ingredient-details/ingredient-details';
import { useToggle } from '../../hooks/customHoocs';

import styles from './ingridient-card.module.css';
import { useDrag } from 'react-dnd';

const IngredientCard = ( { ingredient } ) => {
  const { name, price, image } = ingredient;
  const [, dragRef] = useDrag( {
    type: 'ingredients',
    item: ingredient
  } );
  const dispatch = useDispatch();
  const [isModalOpen, toggleModalOpen] = useToggle( false );
  const onCardClick = useCallback(
    () => {
      dispatch( setIngredient( ingredient ) );
      toggleModalOpen();
    },
    [dispatch, toggleModalOpen, ingredient],
  );

  const closeModal = useCallback(
    () => {
      toggleModalOpen();
      dispatch( resetIngredient( ingredient ) );
    },
    [dispatch, toggleModalOpen, ingredient],
  );

  return (
    <>
      {
        isModalOpen &&
        ( <Modal isOpen={ isModalOpen } title='Детали ингридиента' closeModal={ closeModal }>
          <IngredientsDetail />
        </Modal> )
      }
      <article ref={ dragRef } onClick={ onCardClick } className={ styles.card }>
        <picture className='mb-2'>
          <img src={ image } alt={ name } />
        </picture>
        <p className={ styles.price }>{ price } <CurrencyIcon type='primary' /></p>
        <h4 className='text_type_main-default text'>{ name }</h4>
      </article>
    </>
  );
};

export default IngredientCard;

IngredientCard.propTypes = {
  ingredient: PropTypes.shape( {
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  } )
};
