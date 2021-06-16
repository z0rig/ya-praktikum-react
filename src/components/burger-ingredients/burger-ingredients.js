import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientCard from '../ingredient-card/ingredient-card';
import TabsList from '../tabs-list/tabs-list';
import ScrolledContainer from '../scrolled-container/scrolled-container';

import styles from './burger-ingredients.module.css';

import getAdaptedIngredientsData from './utils';

function BurgerIngredients () {
  const ingredientsData = useSelector( state => state.burgerIngredients.items );
  const [activeTab, setActiveTab] = useState( 'Булки' );

  const ingredientsSections = useMemo( () => {
    return Object.values( getAdaptedIngredientsData( ingredientsData ) )
      .map( ( { title, items } ) => (
        <section key={ title } className='pt-10'>
          <h3 className='text text_type_main-medium mb-6'>{ title }</h3>

          <ul className={ styles.list }>
            { items.map( ( ingredient, idx ) => (
              <li className={ styles.item } key={ idx }>
                <Counter count={ 1 } size='default' />
                <IngredientCard ingredient={ ingredient } />
              </li>
            ) ) }
          </ul>
        </section>
      ) );
  }, [ingredientsData] );

  return (
    <section className={ styles.section }>
      <h2 className='visually-hidden'>Ингредиенты</h2>

      <TabsList activeTab={ activeTab } onClick={ setActiveTab } />

      <ScrolledContainer maxHeight={ '716px' }>
        { ingredientsSections }
      </ScrolledContainer>
    </section>
  );
};

export default BurgerIngredients;
