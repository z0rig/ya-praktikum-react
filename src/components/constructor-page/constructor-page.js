import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

import styles from './constructor-page.module.css';

function ConstructorPage () {
  return (
    <div className='container pl-5 pr-5'>
      <h1 className='text text_type_main-large mb-5'>Соберите бургер</h1>
      <DndProvider backend={ HTML5Backend }>
        <div className={ styles.flex }>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </DndProvider>
    </div>
  );
}

export default ConstructorPage;
