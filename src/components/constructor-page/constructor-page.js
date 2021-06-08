import React, { useContext } from 'react';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import { IngredientsContext } from '../../services/ingredients-context';

import styles from './constructor-page.module.css';

function ConstructorPage () {
  const { ingredients } = useContext( IngredientsContext );

  const bun = ingredients[0];
  const filteredData = ingredients.filter( ( ingredient ) => ( ingredient.type !== 'bun' ) );

  return (
    <div className='container pl-5 pr-5'>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
      <div className={ styles.flex }>
        <BurgerIngredients ingredients={ ingredients } />
        <BurgerConstructor ingredients={ filteredData } activeBun={ bun } />
      </div>
    </div>
  );
}

export default ConstructorPage;
