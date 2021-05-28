import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import IngridientCard from '../ingridient-card/ingridient-card'
import TabsList from '../tabs-list/tabs-list';
import ScrolledContainer from '../scrolled-container/scrolled-container';

import styles from './burger-ingredients.module.css';

import getAdaptedIngredientsData from './utils'

function BurgerIngredients({ ingredients }) {
  const [activeTab, setActiveTab] = useState('Булки');

  const toggleActiveTab = (activeTab) => {
    setActiveTab(activeTab);
  }

  return (
    <section className={ styles.section }>
      <h2 className="visually-hidden">Ингредиенты</h2>

      <TabsList activeTab={ activeTab } onClick={toggleActiveTab} />

      <ScrolledContainer maxHeight={ '716px' }>
        {
          Object.values(getAdaptedIngredientsData(ingredients))
            .map(({ title, items }) => (
              <section key={ title } className='pt-10'>
                <h3 className='text text_type_main-medium mb-6'>{title}</h3>

                <ul className={ `${ styles.list } pl-4 pr-1` }>
                  {items.map((ingridient) => (
                    <li className={ styles.item } key={ingridient._id}>
                      <Counter count={1} size="default" />
                      <IngridientCard {...ingridient} />
                    </li>
                  ))}
                </ul>
              </section>
          ))
        }
      </ScrolledContainer>
    </section>
  );
};

export default BurgerIngredients;

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object)
};