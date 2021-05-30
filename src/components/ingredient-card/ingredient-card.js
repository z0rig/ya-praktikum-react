import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import IngredientsDetail from '../ingredient-details/ingredient-details';

import styles from './ingridient-card.module.css';

const IngredientCard = ( { ingredient } ) => {
  const { name, price, image, image_large, calories, proteins, fat, carbohydrates } = ingredient;
  const [isModalActive, setIsModalActive] = useState( false );

  const openModal = () => {
    setIsModalActive( true );
  };

  const closeModal = () => {
    setIsModalActive( false );
  };

  return (
    <>
      {
        isModalActive &&
        <Modal title='Детали ингридиента' closeModal={ closeModal }>
          <IngredientsDetail
            name={ name }
            price={ price }
            src={ image_large }
            calories={ calories }
            proteins={ proteins }
            fat={ fat }
            carbohydrates={ carbohydrates }
          />
        </Modal>
      }
      <article onClick={ openModal } className={ styles.card }>
        <picture>
          <img src={ image } alt={ name } className='mb-2' />
        </picture>
        <p className={ `${ styles.price } text_type_digits-default text mb-2` }>{ price } <CurrencyIcon type="primary" /></p>
        <h4 className='text_type_main-default text'>{ name }</h4>
      </article>
    </>
  )
};

export default IngredientCard;

IngredientCard.propTypes = {
  ingredients: PropTypes.arrayOf( PropTypes.shape( {
    title: PropTypes.string,
    items: PropTypes.arrayOf( PropTypes.shape( {
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    } ) )
  } ) )
}
