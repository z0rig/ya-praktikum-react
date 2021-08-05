import React from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';

import styles from './home.module.css';

const HomePage = () => (
  <>
    <h1 className='visually-hidden'>Бургерная 'Stellar burgers'</h1>
    <p className='text text_type_main-large mb-5'>Соберите бургер</p>
    <DndProvider backend={ HTML5Backend }>
      <div className={ styles.flex }>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </DndProvider>
  </>
);

export default HomePage;
