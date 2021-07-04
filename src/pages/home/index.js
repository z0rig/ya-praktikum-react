import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

import styles from './home.module.css';

const HomePage = () => (
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

export default HomePage;
