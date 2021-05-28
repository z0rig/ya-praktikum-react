import React from 'react';

import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';

import styles from './constructor-page.module.css';

import data from '../utils/data';

export default function ConstructorPage() {
  return (
    <div className={`container pl-5 pr-5`}>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
      <div className={ styles.flex }>
        <BurgerIngredients ingredients={ data } />
        <BurgerConstructor />
      </div>
    </div>
  )
}
