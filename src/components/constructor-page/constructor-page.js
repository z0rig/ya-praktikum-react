import React from 'react';
import PropTypes from 'prop-types';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './constructor-page.module.css';

function ConstructorPage ( { ingredients } ) {
  return (
    <div className='container pl-5 pr-5'>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
      <div className={ styles.flex }>
        <BurgerIngredients ingredients={ ingredients } />
        <BurgerConstructor ingredients={ ingredients } />
      </div>
    </div>
  )
}

export default ConstructorPage;

ConstructorPage.propTypes = {
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
