import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngredientCard from '../ingredient-card/ingredient-card'
import TabsList from '../tabs-list/tabs-list';
import ScrolledContainer from '../scrolled-container/scrolled-container';

import styles from './burger-ingredients.module.css';

import getAdaptedIngredientsData from './utils'

function BurgerIngredients ( { ingredients } ) {
  const [activeTab, setActiveTab] = useState( 'Булки' );

  const toggleActiveTab = ( activeTab ) => {
    setActiveTab( activeTab );
  };

  return (
    <section className={ styles.section }>
      <h2 className='visually-hidden'>Ингредиенты</h2>

      <TabsList activeTab={ activeTab } onClick={ toggleActiveTab } />

      <ScrolledContainer maxHeight={ '716px' }>
        {
          Object.values( getAdaptedIngredientsData( ingredients ) )
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
            ) )
        }
      </ScrolledContainer>
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
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
};